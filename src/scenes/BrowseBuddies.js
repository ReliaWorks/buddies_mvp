import React, { Component } from 'react';
import axios from 'axios';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import firebase from 'firebase';
import BuddyCard from '../components/buddycard/BuddyCard';
import { currentUserFetch, connectWithUser } from '../actions';
import { Spinner } from '../components/common';

class BrowseBuddies extends Component {
  constructor(props) {
    super(props);

    this.props.currentUserFetch();
    this.state = {
      matches: [],
    };
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();
    axios.get(`https://matching-api.appspot.com/match/${currentUser.uid}`)
      .then(response => {
        const keys = Object.keys(response.data);
        const arr = [];

        keys.forEach((key) => {
          const dataWithId = {...response.data[key], uid: key};
          arr.push(dataWithId);
        });
        this.setState({ matches: arr });
      }, (error) => {
        console.log(`API not responding.  Error = ${error}`);
      });
  }

  render() {
    if(this.state.matches.length === 0) {
      return (
        <Spinner size="large" />
      );
    } else {
      return (
      <Swiper>
        {this.state.matches.map((buddy, key) => {
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
                onConnect={() => this.props.connectWithUser(this.props.currentUser.uid, buddy.uid, buddy.first_name, buddy.profileImages[0])}
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

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};

export default connect(mapStateToProps, { currentUserFetch, connectWithUser })(BrowseBuddies);
