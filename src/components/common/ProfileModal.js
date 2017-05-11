import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import BuddyCard from '../buddycard/BuddyCard';
import { chatProfileFetch } from '../../actions';
import { Spinner } from '../common';

class ProfileModal extends Component {
  componentWillMount() {
    this.props.chatProfileFetch(this.props.connection.selectedMatchId);
  }
  renderCloseIcon() {
    return (
      <TouchableOpacity onPress={() => Actions.pop()}>
      <View
        style={{
          flex: 0.05,
          marginTop: -30,
          flexDirection: 'row',
          justifyContent: 'center',
          borderBottomWidth: 3,
        }}
      >
        <Text style={{fontFamily: 'Source Sans Pro'}}>Return to chat</Text>
      </View>
      </TouchableOpacity>
    );
  }

  animationRef(animation) {
    this.animation = animation;
    if(this.animation)
      this.animation.play();
  }

  render() {
    const { loading, firstName, age, profileImages, location, activities, affiliations, description, uid } = this.props.selectedUser;

    if(loading) {
      return <Spinner size="large" />;
    }
    return (
      <View style={{flex: 1}}>
        {this.renderCloseIcon()}
        <BuddyCard
          value={{
            firstName,
            age,
            profileImages,
            location,
            activities,
            affiliations,
            description,
            likeable: false,
            editable: false,
            uid,
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { chatProfileFetch })(ProfileModal);
