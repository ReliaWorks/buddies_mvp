import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import BuddyCard from '../buddycard/BuddyCard';
import { chatProfileFetch } from '../../actions';
import { Spinner } from '../common';

const ICON_WIDTH = 25;
const MARGIN = 15;

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
        <Text style={{fontFamily: 'Avenir-Book'}}>Return to chat</Text>
      </View>
      </TouchableOpacity>
    );
  }
/*  <Icon
    name="close"
    size={ICON_WIDTH}
    color="black"
    style={{marginRight: MARGIN}}
  />
*/
  render() {
    if(this.props.selectedUser.loading) {
      return(<Spinner size="large" />);
    }
    return (
      <View style={{flex: 1}}>
        {this.renderCloseIcon()}
        <BuddyCard
          value={{
            firstName: this.props.selectedUser.firstName,
            age: this.props.selectedUser.age,
            profileImages: this.props.selectedUser.profileImages,
            activities: this.props.selectedUser.activities,
            affiliations: this.props.selectedUser.affiliations,
            description: this.props.selectedUser.description,
            likeable: false,
            editable: false,
            uid: this.props.selectedUser.uid,
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
