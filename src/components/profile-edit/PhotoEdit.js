import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { MARGIN } from '../common/styles';
import { Button } from '../common';
import EditablePhoto from './EditablePhoto';
import { TRASH_ICON } from '../../scenes/profile-setup/strings';

const { width } = Dimensions.get('window');
const MAX_NUM_PHOTOS = 5 + 3;

class PhotoEdit extends Component {
  renderPics() {
    const { profileImages, onRemove } = this.props;
    const firstProfileImage = profileImages[0];
    const otherImages = profileImages.slice(1, MAX_NUM_PHOTOS - 1);

    return (
      <View style={{flex: 0.75, marginBottom: 5}}>
      <ScrollView>
        <View style={{width: width}}>
          {this.renderPrimaryPic(firstProfileImage, onRemove)}
          <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', alignSelf: 'center'}}>
            {otherImages.map((img) => {
              return (
                <EditablePhoto
                  url={img.url}
                  photo={img}
                  key={img.key}
                  onRemove={onRemove}
                />
              );
            })}
        </View>
      </View>
      </ScrollView>
      </View>
    );
  }

  renderPrimaryPic(firstProfileImage, onRemove) {
    return(
      <View style={{ marginLeft: MARGIN, marginTop: MARGIN, height: 300, width: width - (MARGIN * 2) }}>
        <Image
          style={styles.mainImageStyle}
          source={{ uri: firstProfileImage.url }}
        >
        <View style={styles.removeIconContainer}>
          <TouchableOpacity onPress={() => onRemove(firstProfileImage)}>
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
    return (
      <View style={{flex: 1}}>
        {this.renderPics()}
        {this.renderSaveButton(this.props.onSave)}
      </View>
    );
  }
}

const styles = {
  removeIconContainer: {
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

export default PhotoEdit;
