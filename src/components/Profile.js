import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { textStyle } from './common/styles';
//import ActivityList from './ActivityList';
import Affiliation from './profile-setup/Affiliation';

//const defaultProfileImageURL = require('./common/img/sarahpallittacrop.jpg');

class Profile extends Component {
  render() {
    const { age, firstName, profileImageURL } = this.props.value;

    return (
     <View style={{ flex: 1, justifyContent: 'flex-start', alignSelf: 'stretch' }}>
       <Image
         source={{ uri: profileImageURL }}
         style={styles.imageStyle}
       />
       <View style={styles.containerStyle}>
         <Text style={textStyle}>{firstName}, {age}</Text>
       </View>
       <Affiliation />
     </View>
   );
  }
}

//<ActivityList />

const styles = {
 imageStyle: {
   alignSelf: 'stretch',
   justifyContent: 'center',
   height: 350,
   width: null,
   flex: 3
 },
 containerStyle: {
   flex: 2
 }
};

export default Profile;
