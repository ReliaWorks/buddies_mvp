import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { containerStyle, textStyle } from './common/styles/Styles';
import BuddyCard from './BuddyCard';

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

  componentWillMount() {
    console.log("In Browse Buddies componentWillMount");
    const infoRequest = new GraphRequest(
      '/me?fields=birthday,first_name,picture.type(large)',
      null,
      this._responseInfoCallback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  _responseInfoCallback = (error, result) => {
    if(error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      this.setState({first_name: result.first_name, pic: result.picture.data.url});
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 1}}>
          <BuddyCard
            value={{
              firstName: this.state.first_name,
              age: this.state.age,
              profileImageURL: this.state.pic,
              activities: 'Running',
              description: 'Sample desc'
            }}
          />
        </View>
        <View style={styles.editContainerStyle}>
          <Text style={textStyle} onPress={() => Actions.userEdit()}>
            Edit Profile
          </Text>
        </View>
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
  editContainerStyle: {
    backgroundColor: 'white',
//    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  }
};

export default UserView;
