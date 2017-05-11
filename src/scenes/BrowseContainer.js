import _ from 'lodash';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';
import { currentUserFetch, connectWithUser, potentialsFetch, checkNotifications } from '../actions';
import { Deck, NoMoreCards, Spinner } from '../components/common';
import { DEFAULT_PROFILE_PHOTO, ACTIVE } from '../constants';

class BrowseContainer extends Component {
  swiper:Object;

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      viewedAllPotentials: false,
      numPotentials: 0,
    };
  }
  componentWillMount() {
    this.props.currentUserFetch();
    this.props.potentialsFetch();
    this.props.checkNotifications();
    this.setState({currentIndex: 0, numPotentials: this.props.connection.potentials});
  }
/*  componentWillReceiveProps(nextProps) {
    if(this.state.currentIndex > 0) {
      this.swiper.scrollBy(this.state.currentIndex * -1);
    }
  }
*/

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
//  location: { city: 'San Francisco, CA', distance: "4 miles" },
  renderMatches() {
    if(this.props.connection.potentials.length === 0 ||
        this.state.viewedAllPotentials) {
      return <NoMoreCards />;
    }
    return (
      <Swiper
        ref={(component) => {
          this.swiper = component;
        }}
        onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
        showPagination
      >
        {this.props.connection.potentials.map((buddy, key) => {
          let profileImage = {url: DEFAULT_PROFILE_PHOTO, key: null};
          const images = this.convertProfileImagesObjectToArray(buddy.profileImages);
          if(images && images[0]) profileImage = images[0];
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
                }}
                onConnect={() => {
                  this.props.connectWithUser({uid: buddy.uid, name: buddy.first_name, pic: profileImage, index: key}, true);
                  //console.log("On Connect");
                  this.swipe();
                }}
                onPass={() => {
                  this.props.connectWithUser({uid: buddy.uid, name: buddy.first_name, pic: profileImage, index: key}, false);
                  //console.log("On Pass");
                  this.swipe();
                }}
              />
            </View>
          );
        })}
      </Swiper>
    );
  }
//
  render() {
    if(this.props.connection.loadingPotentials) return <Spinner size="large" />;
    else return this.renderMatches();
/*      return (
        <Deck
          data={this.props.connection.potentials}
          onSwipeRight={(buddy) => {
            this.props.connectWithUser({uid: buddy.uid, name: buddy.first_name, pic: buddy.profileImages[0] });
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
    elevation: 1
  },
};

const mapStateToProps = ({ currentUser, connection }) => {
  return { currentUser, connection };
};

export default connect(mapStateToProps, { currentUserFetch, connectWithUser, potentialsFetch, checkNotifications })(BrowseContainer);
