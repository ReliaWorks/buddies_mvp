import _ from 'lodash';
import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';
import { currentUserFetch, connectWithUser, imageLoaded, potentialsFetch, checkNotifications, connectionHelperSeen, recordView, scrolled, resetCurrentIndex } from '../actions';
import { NoMoreCards, Spinner, GlowLoader } from '../components/common';
import { DEFAULT_PROFILE_PHOTO, ACTIVE } from '../constants';

class BrowseContainer extends Component {
  swiper:Object;

  constructor(props) {
    super(props);

    this.state = {
      viewedAllPotentials: false,
      numPotentials: 0,
      alreadySeenFirstItem: true,
    };
  }

  componentWillMount() {
    if (this.props.currentUser.firstName === '') {
        this.props.currentUserFetch();
    }

    if(this.props.connection.currentIndex === 0 && this.props.connection.potentials.length === 0) {
        this.props.potentialsFetch(this.props.currentUser);
    }

    if (!this.props.connection.listeningForNotifications) {
      this.props.checkNotifications();
    }
  }

  componentDidMount() {
    if(this.swiper)
      this.swiper.scrollBy(this.props.connection.currentIndex);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.connection.potentials !== nextProps.connection.potentials)
      return true;
    if(this.props.connection.loadingPotentials !== nextProps.connection.loadingPotentials)
      return true;
    if(this.props.connection.loadingCurrentUser !== nextProps.connection.loadingCurrentUser)
      return true;
    if(this.props.connection.listeningForNotifications !== nextProps.connection.listeningForNotifications)
      return true;
    if(this.props.connection.loadingConnectionHelper !== nextProps.connection.loadingConnectionHelper)
      return true;
    return false;
  }

  _onMomentumScrollEnd(e, state, context) {
    this.props.scrolled(this.swiper.state.index);
    console.log(`swiper index = ${this.swiper.state.index}`);
    const otherUserIndex = (this.swiper.state.index === 0) ? this.swiper.state.total - 1 : this.swiper.state.index - 1;
    this.props.recordView(this.props.currentUser.uid, this.props.connection.potentials[otherUserIndex].uid);
    if(this.swiper.state.index === 0 && this.state.alreadySeenFirstItem) //this is the last item in the list
      this.props.potentialsFetch(); //what if we get there by scrolling to the left instead of scrolling right ?????
    else if(this.swiper.state.index === 0)
      this.setState({alreadySeenFirstItem: true});
  }

  swipe() {
    const targetIndex = this.swiper.state.index;
    if(this.props.connection.currentIndex === this.swiper.state.total) {
      this.setState({viewedAllPotentials: true});
      this.props.resetCurrentIndex();
    } else {
      this.swiper.scrollBy(1);
      this.props.scrolled(this.swiper.state.index + 1);
    }
  }

  convertProfileImagesObjectToArray(profileImages) {
    const images = [];
    if(profileImages) {
      _.map(profileImages, (img, key) => {
        if(img.status === ACTIVE) {
          images.push({url: img.url, key: key});
        }
      });
    }
    return images;
  }

//  componentWillReceiveProps(nextProps) {
//    if(nextProps.connection.currentIndex != this.props.connection.currentIndex)
//      this.swiper.scrollBy(nextProps.connection.currentIndex);
//  }
  renderMatches() {
    const { potentials, numTimesConnected, numTimesMatched, seenConnectionHelper } = this.props.connection;

    if(this.props.connection.loadingCurrentUser) return <Spinner size="large" />;
    else if(!potentials || potentials.length === 0) {
      return <NoMoreCards />;
    }
    return (
      <View>
      <Swiper
        ref={(component) => {
          this.swiper = component;
        }}
        onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
        showPagination
        loadMinimal
      >
        {potentials.map((buddy, key) => {
          let profileImage = {url: DEFAULT_PROFILE_PHOTO, key: null};
          const images = this.convertProfileImagesObjectToArray(buddy.profileImages);
          if(images && images[0]) profileImage = images[0];
          let imageLoadedCallback = null;
          if(key === 0) {
            imageLoadedCallback = this.props.imageLoaded;
          }
          console.log(`Buddy name = ${buddy.first_name}`);
          this.buddyId = buddy.uid;
          return (
            <View key={key} style={styles.cardStyle}>
              <BuddyCard
                value={{
                  firstName: buddy.first_name,
                  age: "",
                  profileImages: images,
                  activities: buddy.activities,
                  affiliations: buddy.affiliations,
                  location: buddy.location,
                  description: buddy.description,
                  likeable: true,
                  editable: false,
                  uid: buddy.uid,
                  madeFirstConnection: this.props.currentUser.madeFirstConnection,
                  imageLoaded: imageLoadedCallback,
                  seenConnectionHelper,
                  numTimesConnected,
                  numTimesMatched,
                }}
                onConnect={() => {
                  Promise.resolve(this.props.connectWithUser(this.props.currentUser, {uid: buddy.uid, name: buddy.first_name, pic: profileImage, index: key}, true))
                    .then((response) => {
                      this.swipe();
                    })
                    .catch((error) => {
                      console.log("In BrowseContainer. connectWithUser returned an error");
                    });
                }}
              />
            </View>
          );
        })}
      </Swiper>
      </View>
    );
  }

  animationRef(animation) {
    this.animation = animation;
    if(this.animation)
      this.animation.play();
  }

  render() {
    if(this.props.connection.loadingPotentials || this.props.connection.loadingCurrentUser)
      return <GlowLoader animationRef={this.animationRef} />;
    else return this.renderMatches();
  }
}

const styles = {
  cardStyle: {
    flex: 1,
  },
};

const mapStateToProps = ({ currentUser, connection }) => {
  return { currentUser, connection };
};

export default connect(mapStateToProps, { currentUserFetch, connectWithUser, imageLoaded, potentialsFetch, checkNotifications, connectionHelperSeen, recordView, scrolled, resetCurrentIndex })(BrowseContainer);
