import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import BuddyCard from '../components/buddycard/BuddyCard';
import { currentUserFetch, connectWithUser, potentialsFetch } from '../actions';
import { Deck, NoMoreCards, Spinner } from '../components/common';

class BrowseBuddies extends Component {
  constructor(props) {
    super(props);
    this.props.currentUserFetch();
    this.props.potentialsFetch();
  }

  render() {
    if(this.props.connection.potentials.length === 0) {
      return (
          <Spinner size="large" />
      );
    } else {
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
      return (
        <Swiper>
          {this.props.connection.potentials.map((buddy, key) => {
            return (
              <View key={key} style={styles.cardStyle}>
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
                  }}
                  onConnect={() => {
                    this.props.connectWithUser({uid: buddy.uid, name: buddy.first_name, pic: buddy.profileImages[0], index: key});
                  }}
                />
              </View>
            );
          })}
        </Swiper>
    );
  }
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

export default connect(mapStateToProps, { currentUserFetch, connectWithUser, potentialsFetch })(BrowseBuddies);
