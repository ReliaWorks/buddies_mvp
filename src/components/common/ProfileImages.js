import React, { Component } from 'react';
import { Dimensions, Image, Text, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { Spinner } from './Spinner';
import { PictureModal } from './PictureModal';
import { textStyle, buttonStyle } from './styles';

const { height, width } = Dimensions.get('window');

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
        <TouchableOpacity onPress={() => Actions.userEdit()} style={buttonStyle}>
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

  renderPhoto(img, editable) {
    return (
      <Image
        source={{ uri: img }}
        style={styles.profileImage}
      >
        {this.showEditableButton(editable)}
      </Image>
    );
  }

  render() {
    const { profileImages, editable } = this.props.value;
    const { profileImageContainer, profileImage } = styles;
    let pics = profileImages;

    if(!profileImages) return this.renderNoPhotos();
    if(profileImages.length === 0) {
      return (
        <View style={{justifyContent: 'center', alignSelf: 'center'}}>
          <Spinner size="large" />
        </View>
      );
    }
    if(profileImages.length > 6) {
      pics = profileImages.slice(0, 5);
    }
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
            />}
          paginationStyle={{
            bottom: height - 120,
            paddingLeft: 7,
            paddingRight: 7,
          }}
        >
          { pics.map((img, key) => {
            return (
              <View key={key}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({ showModal: true, currentImg: img });
                  }}
                >
                  {this.renderPhoto(img, editable)}
                </TouchableWithoutFeedback>
              </View>
            );
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
    //flex: 1,
    borderBottomWidth: 3,
  },
  profileImage: {
//    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: (height * 0.5),
    width: null,
  }
};


export { ProfileImages };
