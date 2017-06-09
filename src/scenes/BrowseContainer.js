import _ from 'lodash';
import React, { Component } from 'react';
import { Modal, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';
import { currentUserFetch, connectWithUser, imageLoaded, potentialsFetch, checkNotifications, connectionHelperSeen } from '../actions';
import { NoMoreCards, Spinner, GlowLoader } from '../components/common';
import { DEFAULT_PROFILE_PHOTO, ACTIVE } from '../constants';

class BrowseContainer extends Component {
  swiper:Object;

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      viewedAllPotentials: false,
      numPotentials: 0,
      firstPotentialLoaded: false,
    };
  }
  componentWillMount() {
    // firstName is assigned only after currentUserFetch, so if it is not empty no need to fetch again.
    if (this.props.currentUser.firstName === '') {
      this.props.currentUserFetch();
    }
    if (!this.props.connection.loadingCurrentUser)
      this.props.potentialsFetch();
    if (!this.props.connection.listeningForNotifications) {
      this.props.checkNotifications();
    }
    this.setState({currentIndex: 0, numPotentials: this.props.connection.potentials, firstPotentialLoaded: (this.props.connection.numImagesOnScreen < 1)});
  }
/*  componentWillReceiveProps(nextProps) {
    if(this.state.currentIndex > 0) {
      this.swiper.scrollBy(this.state.currentIndex * -1);
    }
  }
*/

/*  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.connection.potentials !== nextProps.connection.potentials)
      return true;
    if(this.props.connection.loadingPotentials !== nextProps.connection.loadingPotentials)
      return true;
    if(this.props.connection.loadingCurrentUser !== nextProps.connection.loadingCurrentUser)
      return true;
    if(this.props.connection.listeningForNotifications !== nextProps.connection.listeningForNotifications)
      return true;
    return false;
  }*/

  _onMomentumScrollEnd(e, state, context) {
    this.setState({currentIndex: this.state.currentIndex + 1});
  }

  swipe() {
    const targetIndex = this.swiper.state.index;
    if(this.state.currentIndex === this.swiper.state.total - 1)
      this.setState({viewedAllPotentials: true, currentIndex: 0});
    else {
      this.swiper.scrollBy(1);
      this.setState({currentIndex: targetIndex});
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

  renderMatches() {
    console.log("In renderMatches");
    const { potentials, numTimesConnected, numTimesMatched, doneCheckingConnectionStatus } = this.props.connection;

    if(this.props.connection.loadingCurrentUser) return <Spinner size="large" />;
    else if(this.state.viewedAllPotentials) {
      return <NoMoreCards />;
    } else if(potentials && potentials.length === 0) return <NoMoreCards />;
    return (
      <View>
      <Swiper
        ref={(component) => {
          this.swiper = component;
        }}
        onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
        showPagination
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
                  doneCheckingConnectionStatus: this.props.connection.doneCheckingConnectionStatus,
                  seenConnectionHelper: this.props.connection.seenConnectionHelper,
                  numTimesConnected,
                  numTimesMatched,
                }}
                connectionHelperSeen={() => this.props.connectionHelperSeen()}
                onConnect={() => {
                  this.props.connectWithUser(this.props.currentUser, {uid: buddy.uid, name: buddy.first_name, pic: profileImage, index: key}, true);
                  this.swipe();
                }}
                onPass={() => {
                  this.props.connectWithUser(this.props.currentUser, {uid: buddy.uid, name: buddy.first_name, pic: profileImage, index: key}, false);
                  this.swipe();
                }}
              />
            </View>
          );
        })}
      </Swiper>
      </View>
    );
  }
/*  <Modal
    visible={!this.state.firstPotentialLoaded}
    transparent={false}
    animationType="none"
  />
*/
//
  animationRef(animation) {
    this.animation = animation;
    if(this.animation)
      this.animation.play();
  }

  render() {
    if(this.props.connection.loadingPotentials || this.props.connection.loadingCurrentUser)
      return <GlowLoader animationRef={this.animationRef} />;
    else return this.renderMatches();
/*      return (
        <Deck
          data={this.props.connection.potentials}
          onSwipeRight={(buddy) => {
            this.props.connectWithUser(this.props.currentUser, {uid: buddy.uid, name: buddy.first_name, pic: buddy.profileImages[0] });
          }}
          renderNoMoreCards={() => {
            return (
              <NoMoreCards />
            );
          }}
          renderCard={(buddy) => {
            return (
                <BuddyCard
                value={{
                  firstName: buddy.first_name,
                  age: "36",
                  location: { city: 'San Francisco, CA', distance: "4 miles" },
                  profileImages: buddy.profileImages,
                  activities: buddy.activities,
                  affiliations: buddy.affiliations,
                  description: buddy.description,
                  likeable: true,
                  editable: false,
                  uid: buddy.uid,
                  id: buddy.uid,
                }}
                />
            );
          }}
        />
      );
      */
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

export default connect(mapStateToProps, { currentUserFetch, connectWithUser, imageLoaded, potentialsFetch, checkNotifications, connectionHelperSeen })(BrowseContainer);
