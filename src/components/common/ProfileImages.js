import _ from 'lodash';
import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
//import ImagePicker from 'react-native-image-picker';
import { Spinner } from './Spinner';
import { PictureModal } from './PictureModal';
import { textStyle, buttonStyle } from './styles';

const { height, width } = Dimensions.get('window');
const MAX_NUM_PHOTOS = 5;

class ProfileImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      currentImg: 'https://firebasestorage.googleapis.com/v0/b/activities-test-a3871.appspot.com/o/img%2Fdefault-user-image.png?alt=media&token=5a29c303-0a94-4640-a917-9283f1ecdb66',
    };
  }

  renderNoPhotos() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: (height * 0.5),
          width: width,
          borderBottomWidth: 1
        }}
      >
        <Text style={textStyle}>No photos</Text>
      </View>
    );
  }

  onClose() {
    this.setState({ showModal: false });
  }

  showEditableButton(editable) {
    if(!editable) return;
    return (
      <View
        style={{
          backgroundColor: 'black',
          marginBottom: 30,
          marginRight: 0
        }}
      >
        <TouchableOpacity onPress={() => Actions.photoEdit()} style={buttonStyle}>
          <Icon
            name="edit"
            size={25}
            color="white"
            style={{padding: 4}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderPhoto(key, img, editable) {
    console.log(`img = `, img);
    return (
      <View key={key}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({ showModal: true, currentImg: img });
          }}
        >
          <Image
            source={{ uri: img }}
            style={styles.profileImage}
          >
            {this.showEditableButton(editable)}
          </Image>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  render() {
    const { profileImages, editable } = this.props.value;
    const { profileImageContainer } = styles;
    let pics = profileImages;

    if(!profileImages || profileImages.length === 0) return this.renderNoPhotos();
    if(profileImages.length > MAX_NUM_PHOTOS)
      pics = profileImages.slice(0, MAX_NUM_PHOTOS - 1);
    return (
      <View style={profileImageContainer}>
        <Swiper
          horizontal={false}
          dot={
            <View
              style={{
                backgroundColor: 'white',
                width: 10,
                height: 10,
                borderRadius: 5,
                marginTop: 3,
                marginBottom: 3}}
            />
          }
          activeDot={
            <View
            style={{
              backgroundColor: '#FF4F7D',
              width: 10,
              height: 10,
              borderRadius: 5,
              marginTop: 3,
              marginBottom: 3}}
            />
          }
          paginationStyle={{
            bottom: height - 120,
            paddingLeft: 7,
            paddingRight: 7,
          }}
        >
          { pics.map((pic) => {
              return this.renderPhoto(pic.key, pic.url, editable);
          })}
        </Swiper>
        <PictureModal
          visible={this.state.showModal}
          onClose={this.onClose.bind(this)}
          img={this.state.currentImg}
        />
      </View>
    );
  }
}

const styles = {
  profileImageContainer: {
    flex: 0.5,
    borderBottomWidth: 3,
  },
  profileImage: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: (height * 0.5),
    width: null,
  }
};


export { ProfileImages };
