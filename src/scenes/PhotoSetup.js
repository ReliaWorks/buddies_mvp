import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { textStyle } from '../components/common/styles';
import { Header } from '../components/common';
import { EDIT_ICON } from '../components/profile-setup/strings';
import { addPic } from '../actions';

class PhotoSetup extends Component {

  componentWillMount() {
      console.log("On PhotoSetup");
  }

  editPhoto() {

  }

  render() {
    console.log("Rendering photos");
    console.log(this.props.profile_pics);
    const self = this;
    return(
      <View>
      <Header headerTitle="Get Started" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text style={textStyle}>
          Review photos:
          </Text>
          <Button
            onPress={() => Actions.activitySetup()}
            style={textStyle}
            title="Next"
            color="#4267B2"
          />
        </View>
        {this.props.profile_pics.map(function( url, index ){
          console.log("index");
          console.log(url);
          console.log(index);
          return(
        <Image
          style={styles.mainImageStyle}
          source={{ uri: url }}
        >
          <View style={styles.editIconStyle}>
            <TouchableOpacity onPress={() => self.props.addPic(url)}>
              <Image
                style={{width: 20, height: 20}}
                source={{ uri: EDIT_ICON }}
              />
            </TouchableOpacity>
          </View>
        </Image>);
      })}


      </View>
    );
  }
}

const styles = {
  editIconStyle: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    width: 30,
    padding: 5,
  },
  iconStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 25,
    width: 25
  },
  mainImageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    height: 300,
    width: null,
    padding: 5,
  },
  smallImageStyle: {
    height: 120,
    width: 120,
    justifyContent: 'flex-end',
    padding: 5,
  },
};

const mapStateToProps = ({ auth }) => {
  console.log('props');
  console.log(auth);
  return auth;
};

export default connect(mapStateToProps, { addPic })(PhotoSetup);
