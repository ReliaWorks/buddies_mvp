import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { MARGIN } from '../common/styles';
import { Button } from '../common';
import { TRASH_ICON } from '../../scenes/profile-setup/strings';
import { addPic, savePics } from '../../actions';

const { width } = Dimensions.get('window');
//const MARGIN = 10;

class PhotoEdit extends Component {
  renderOtherPics(otherImages) {
    const { profileImages } = this.props.currentUser;
    const firstProfileImage = profileImages[0];

    return (
      <View style={{flex: 0.75, marginBottom: 5}}>
      <ScrollView>
        <View style={{width: width}}>
          {this.renderPrimaryPic(firstProfileImage)}
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignSelf: 'center'}}>
        {otherImages.map((url, key) => {
          return (
            <View key={key} style={{ marginRight: 5, marginTop: 5 }}>
              <Image
                style={styles.smallImageStyle}
                source={{ uri: url }}
              >
              <View style={styles.editIconContainer}>
                <TouchableOpacity onPress={() => this.props.addPic(url)}>
                  <Image
                    style={styles.iconStyle}
                    source={TRASH_ICON}
                  />
                </TouchableOpacity>
              </View>
              </Image>
            </View>
        );
        })}
        </View>
      </View>
      </ScrollView>
      </View>
    );
  }

  renderPrimaryPic(url) {
    return(
      <View style={{ marginLeft: MARGIN, marginTop: MARGIN, height: 300, width: width - (MARGIN * 2) }}>
        <Image
          style={styles.mainImageStyle}
          source={{ uri: url }}
        >
          <View style={styles.editIconContainer}>
            <TouchableOpacity onPress={() => this.props.addPic(url)}>
              <Image
                style={styles.iconStyle}
                source={TRASH_ICON}
              />
            </TouchableOpacity>
          </View>
        </Image>
      </View>
    );
  }

  renderSaveButton(onNext) {
    return (
      <View style={{flex: 0.1, justifyContent: 'flex-end' }}>
      <Button onPress={onNext}>
        Save
      </Button>
      </View>
    );
  }

  render() {
    const { profileImages } = this.props.currentUser;
    const otherProfileImages = profileImages.slice(1, 10);

    return (
      <View style={{flex: 1}}>
        {this.renderOtherPics(otherProfileImages)}
        {this.renderSaveButton(this.props.onSave)}
      </View>
    );
  }
}

const styles = {
  editIconContainer: {
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

const mapStateToProps = ({ auth, currentUser }) => {
  return { auth, currentUser };
};

export default connect(mapStateToProps, { addPic, savePics })(PhotoEdit);
