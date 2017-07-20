import _ from 'lodash';
import React, { Component } from 'react';
import { Image, Modal, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import firebase from 'firebase';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';
import { currentUserFetch, connectWithUser, imageLoaded, potentialsFetch, checkNotifications, recordView, scrolled, resetCurrentIndex, matchesFetch, loadMorePotentials } from '../actions';
import { NoMoreCards, Spinner, GlowLoader } from '../components/common';
import { DEFAULT_PROFILE_PHOTO, ACTIVE, SERVER_DOWN_ROBOT, POTENTIALS_LOAD_BEFORE } from '../constants';

class BrowseContainer extends Component {
  swiper:Object;

  componentWillMount() {
    if (this.props.currentUser.firstName === '') {
      this.props.currentUserFetch();
    }
    if(!this.props.connection.potentialsLoaded)
      this.props.potentialsFetch();
    if (!this.props.connection.listeningForNotifications)
      this.props.checkNotifications();
  }

  componentDidMount() {
    if (!this.props.messageCenter.loaded) {
      this.props.matchesFetch();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.connection.potentials !== nextProps.connection.potentials)
      return true;
    if(this.props.connection.loadingPotentials !== nextProps.connection.loadingPotentials)
      return true;
    if(this.props.connection.potentialsFetchStatus !== nextProps.connection.potentialsFetchStatus)
      return true;
    if(this.props.connection.loadingCurrentUser !== nextProps.connection.loadingCurrentUser)
      return true;
    if(this.props.connection.listeningForNotifications !== nextProps.connection.listeningForNotifications)
      return true;
    if(this.props.connection.loadingConnectionHelper !== nextProps.connection.loadingConnectionHelper)
      return true;
    if(this.props.connection.morePotentialsLoading !== nextProps.connection.morePotentialsLoading)
      return true;
    return false;
  }

  _onMomentumScrollEnd(e, state, context) {
    const { potentials, currentIndex, shouldLoadMorePotentials } = this.props.connection;

    this.props.scrolled(this.swiper.state.index);
    const otherUserIndex = (this.swiper.state.index === 0) ? this.swiper.state.total - 1 : this.swiper.state.index - 1;
    this.props.recordView(this.props.currentUser.uid, potentials[otherUserIndex].uid);

    if(currentIndex === potentials.length - POTENTIALS_LOAD_BEFORE && shouldLoadMorePotentials) {
      this.props.loadMorePotentials(potentials.length);
    }
  }

  swipe() {
    console.log(`this.swiper.state.index = ${this.swiper.state.index}`);
    console.log(`this.swiper.state.total = ${this.swiper.state.total}`);
    console.log(`currentIndex = ${this.props.connection.currentIndex}`);

    const targetIndex = this.swiper.state.index;
    if(this.props.connection.currentIndex === this.swiper.state.total) {
      this.props.resetCurrentIndex();
    } else {
//      this.props.scrolled(this.swiper.state.index + 1);
    }
  }

  convertProfileImagesObjectToArray(profileImages) {
    const images = [];
    if(profileImages) {
      _.map(profileImages, (img, key) => {
        images.push({url: img.url, key: key});
      });
    }
    return images;
  }

  renderMatches() {
    const { currentIndex, potentials, numTimesConnected, numTimesMatched, seenConnectionHelper, morePotentialsLoading } = this.props.connection;

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
        key={1}
        onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
        showPagination
        loadMinimal
        bounces={false}
        removeClippedSubviews
        index={currentIndex}
        scrollEnabled={!morePotentialsLoading}
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
            <View key={key} style={{flex: 1}}>
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

  renderServerError() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={SERVER_DOWN_ROBOT} style={{width: 200, height: 200}} />
        <Text style={{fontFamily: 'Source Sans Pro', fontSize: 18, margin: 30, textAlign: 'center'}}>
          Having trouble. Try logging out and logging back in or check back later.
        </Text>
      </View>
    );
  }
  render() {
    if(this.props.connection.loadingPotentials || this.props.connection.loadingCurrentUser)
      return <GlowLoader animationRef={this.animationRef} />;
    else if(!this.props.connection.potentialsFetchStatus || !this.props.connection.currentUserFetchStatus)
      return this.renderServerError();
    else return this.renderMatches();
  }
}

const mapStateToProps = ({ currentUser, connection, messageCenter }) => {
  return { currentUser, connection, messageCenter };
};

export default connect(mapStateToProps, { currentUserFetch, connectWithUser, imageLoaded, potentialsFetch, checkNotifications, recordView, scrolled, resetCurrentIndex, matchesFetch, loadMorePotentials })(BrowseContainer);
