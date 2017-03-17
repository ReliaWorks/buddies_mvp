import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { textStyle } from '../components/common/styles';
import { EDIT_ICON, TRASH_ICON } from '../components/profile-setup/strings';
import { addPic, savePics } from '../actions';

class PhotoSetup extends Component {
  renderOtherPics(profile_pics) {
    return (
      <View style={{ flexDirection: 'row' }}>
        {profile_pics.map((url, key) => {
          return (
            <View key={key} style={{ padding: 5 }}>
              <Image
                style={styles.smallImageStyle}
                source={{ uri: url }}
              >
              <View style={styles.editIconStyle}>
                <TouchableOpacity onPress={() => this.props.addPic(url)}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={TRASH_ICON}
                  />
                </TouchableOpacity>
              </View>
              </Image>
            </View>
        );
        })}
      </View>
    );
  }

  renderPrimaryPic(url) {
    return(
      <View style={{ padding: 10 }}>
        <Image
          style={styles.mainImageStyle}
          source={{ uri: url }}
        >
          <View style={styles.editIconStyle}>
            <TouchableOpacity onPress={() => this.props.addPic(url)}>
              <Image
                style={{width: 20, height: 20 }}
                source={TRASH_ICON}
              />
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }

  renderSectionHeader(selectedPics) {
    return(
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
        <Text style={textStyle}>
        Review photos:
        </Text>
        <Button
          onPress={() => this.props.savePics(selectedPics)}
          style={textStyle}
          title="Next"
          color="#4267B2"
        />
      </View>
    );
  }

  render() {
    const { profile_pics, selectedPics } = this.props;
    const firstProfileImage = profile_pics[0];
    const otherProfileImages = profile_pics.slice(1);

    return (
      <View>
        {this.renderSectionHeader(selectedPics)}
        {this.renderPrimaryPic(firstProfileImage)}
        {this.renderOtherPics(otherProfileImages)}
      </View>
    );
  }
}

const styles = {
  editIconStyle: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
    marginRight: 2,
    marginBottom: 2,
    borderRadius: 2,
  },
  iconStyle: {
    justifyContent: 'center',
    height: 20,
    width: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    padding: 2,
  },
  mainImageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    height: 300,
    width: null,
    padding: 5,
    borderRadius: 10,
  },
  smallImageStyle: {
    height: 115,
    width: 115,
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
};

const mapStateToProps = ({ auth }) => {
  return auth;
};

export default connect(mapStateToProps, { addPic, savePics })(PhotoSetup);
