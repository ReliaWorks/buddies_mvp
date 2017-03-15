import React, { Component } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../components/common';
import { connect } from 'react-redux';
import { requestPics } from '../actions/';
import { ADD_ICON, EDIT_ICON } from '../components/profile-setup/strings';

class PictSetup extends Component {

  componentWillMount() {
      console.log("On picsetup");
  }

  render() {
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
        <Image
          style={styles.mainImageStyle}
          source={{ uri: this.state.img1Source }}
        >
          <View style={styles.editIconStyle}>
            <TouchableOpacity onPress={() => { this.editPhoto(); }}>
              <Image
                style={{width: 20, height: 20}}
                source={{ uri: EDIT_ICON }}
              />
            </TouchableOpacity>
          </View>
        </Image>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
          <TouchableOpacity onPress={() => { Actions.root(); }}>
            <View style={{ padding: 10 }}>
              <Image
                style={styles.smallImageStyle}
                source={{ uri: this.state.img2Source }}
              >
              <View style={styles.editIconStyle}>
                <TouchableOpacity onPress={() => { this.editPhoto(); }}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={{ uri: EDIT_ICON }}
                  />
                </TouchableOpacity>
              </View>
              </Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Actions.root(); }}>
            <View style={{ padding: 10 }}>
              <Image
                style={styles.smallImageStyle}
                source={{ uri: this.state.img3Source }}
              >
              <View style={styles.editIconStyle}>
                <TouchableOpacity onPress={() => { this.editPhoto(); }}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={{ uri: EDIT_ICON }}
                  />
                </TouchableOpacity>
              </View>
              </Image>
            </View>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => { Actions.root(); }}>
            <View style={{ padding: 10 }}>
              <Image
                style={styles.iconStyle}
                source={ADD_ICON}
              />
            </View>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { token } = auth;

  return { token };
};

export default connect(mapStateToProps, { requestPics })(PictSetup);
