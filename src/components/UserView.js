import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { containerStyle, textStyle } from './common/styles/Styles';
import Profile from './Profile';
//import Card from './common/Card';
//import CardItem from './common/CardItem';

const defaultProfileImageURL = require('./common/img/sarahpallittacrop.jpg');

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      pic: 'https://randomuser.me/api/portraits/women/22.jpg',
      age: '36',
    };
  }

  _responseInfoCallback = (error, result) => {
    if(error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      this.setState({first_name: result.first_name, pic: result.picture.data.url});
    }
    console.log("in _responseInfoCallback with ");
    console.log(this.state);
  }

  componentWillMount() {
    console.log("In Browse Buddies componentWillMount");
    const infoRequest = new GraphRequest(
      '/me?fields=birthday,first_name,picture.type(large)',
      null,
      this._responseInfoCallback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  render() {
    console.log("in userview with");
    console.log(this.state);
    return (
      <View style={containerStyle}>
        <Profile
          value={{
            firstName: this.state.first_name,
            age: this.state.age,
            profileImageURL: this.state.pic,
            activities: 'Running, Tennis'
          }}
        />
        <Text style={textStyle} onPress={() => Actions.userEdit()}>
          Edit Profile
        </Text>
      </View>
    );
  }
}

const styles = {
  imageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 350,
    width: null
  },
  descriptionContainerStyle: {
    backgroundColor: 'white',
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  }
};

export default UserView;
