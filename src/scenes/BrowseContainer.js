import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';
import { currentUserFetch, connectWithUser, potentialsFetch } from '../actions';
import { Deck, NoMoreCards, Spinner } from '../components/common';

class BrowseContainer extends Component {
  swiper:Object;

  constructor(props) {
    super(props);
    this.props.currentUserFetch();
    this.props.potentialsFetch();

    this.state = {
      currentIndex: 0,
      viewedAllPotentials: false,
      numPotentials: 0,
    };
  }
  componentWillMount() {
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
//    console.log(`targetIndex = ${targetIndex}`);
//    console.log(`this.state.currentIndex = ${this.state.currentIndex}`);
//    console.log(`total = ${this.swiper.state.total}`);
    if(this.state.currentIndex === this.swiper.state.total - 1)
      this.setState({viewedAllPotentials: true, currentIndex: 0});
    else {
      this.swiper.scrollBy(1);
      this.setState({currentIndex: targetIndex});
    }
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
          return (
            <View key={key} style={styles.cardStyle}>
              <BuddyCard
                value={{
                  firstName: buddy.first_name,
                  age: "",
                  profileImages: buddy.profileImages,
                  activities: buddy.activities,
                  affiliations: buddy.affiliations,
                  description: buddy.description,
                  likeable: true,
                  editable: false,
                  uid: buddy.uid,
                }}
                onConnect={() => {
                  this.props.connectWithUser({uid: buddy.uid, name: buddy.first_name, pic: buddy.profileImages[0], index: key}, true);
                  console.log("On Connect");
                  this.swipe();
                }}
                onPass={() => {
                  this.props.connectWithUser({uid: buddy.uid, name: buddy.first_name, pic: buddy.profileImages[0], index: key}, false);
                  console.log("On Pass");
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

export default connect(mapStateToProps, { currentUserFetch, connectWithUser, potentialsFetch })(BrowseContainer);