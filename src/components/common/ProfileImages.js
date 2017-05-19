import React, { Component } from 'react';
import { Dimensions, Image, TouchableWithoutFeedback, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { PictureModal } from './PictureModal';
import { buttonStyle } from './styles';
import { ICON_SIZE, DEFAULT_PROFILE_PHOTO } from '../../constants';
import CustomIcon from '../../assets/icons';

const { height } = Dimensions.get('window');
const MAX_NUM_PHOTOS = 7;

class ProfileImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      currentImg: DEFAULT_PROFILE_PHOTO,
      firstRender: true,
    };
  }

  componentDidMount() {
    this.setState({firstRender: false});
  }

  renderNoPhotos() {
    return this.renderPhoto('1', DEFAULT_PROFILE_PHOTO, this.props.editable);
/*    return (
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
    */
  }

  onClose() {
    this.setState({ showModal: false });
  }

  showEditableButton(editable) {
    if(!editable) return;
    return (
      <View style={styles.editIconBox}>
        <TouchableOpacity onPress={() => Actions.photoEdit()} style={buttonStyle}>
          <CustomIcon
            name="edit_icon"
            size={ICON_SIZE}
            color="white"
            style={{ padding: 4 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderPhoto(key, img, editable) {
    return (
      <View key={key} style={styles.profileImageContainer}>
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

    if(!profileImages || profileImages.length === 0)
      return this.renderNoPhotos();

    if(this.state.firstRender) pics = profileImages.slice(0, 1);
    else if(profileImages.length >= MAX_NUM_PHOTOS) {
        pics = profileImages.slice(0, MAX_NUM_PHOTOS);
    }
    return (
      <View style={profileImageContainer}>
        <Swiper
          horizontal={false}
          dot={
            <View
              style={{
                backgroundColor: 'white',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginTop: 3,
                marginBottom: 3}}
            />
          }
          activeDot={
            <View
            style={{
              backgroundColor: '#FF4F7D',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginTop: 3,
              marginBottom: 3}}
            />
          }
          paginationStyle={{
            bottom: height - 150,
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
          imgSet={profileImages}
        />
      </View>
    );
  }
}

const styles = {
  profileImageContainer: {
    flex: 0.5,
    borderBottomWidth: 4,
  },
  profileImage: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: (height * 0.5),
    width: null,
  },
  editIconBox: {
    backgroundColor: 'black',
    marginBottom: 25,
    height: 40,
    width: 40,
  }
};


export { ProfileImages };
