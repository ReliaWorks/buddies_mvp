import React, { Component } from 'react';
import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { textStyle } from '../common/styles';
import { Header } from '../common';
import { ADD_ICON, EDIT_ICON } from './strings';

class PicSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      profile_album_id: '',
      profilePics: [],
      imgArr: [],
      img1Source: 'https://randomuser.me/api/portraits/women/22.jpg',
      img2Source: 'https://randomuser.me/api/portraits/women/22.jpg',
      img3Source: 'https://randomuser.me/api/portraits/women/22.jpg',
      counter: 0,
      fbToken: '',
      pic: 'https://randomuser.me/api/portraits/women/22.jpg',
    };
  }

  componentWillMount() {
    console.log("In PicSetup componentWillMount");
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        console.log("In PicSetup accesstoken = ");
        const token = data.accessToken;
        this.setState({ fbToken: token.toString() });
        console.log(token);
        const infoRequest = new GraphRequest(
          '/me',
          {
            parameters: {
              fields: { string: 'id,first_name,friends.location,albums{name}' },
              access_token: { string: token.toString() }
            },
         },
          this._responseInfoCallback
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      }
    ).catch((error) => {
      console.log('Error fetching access token' + error.toString());
    });
  }

  _responseInfoCallback = (error, result) => {
    if(error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log("in _responseInfoCallback with result = ");
      const fbAlbums = result.albums.data;
      const profileAlbum = fbAlbums.find((album) => {
          return album.name === 'Profile Pictures';
        });
      this.profile_album_id = profileAlbum.id;
      this.setState({ first_name: result.first_name, profile_album_id: profileAlbum });
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          const profilePicRequest = new GraphRequest(
            `/${profileAlbum.id}`,
            {
              parameters: {
                fields: { string: 'photos' },
                access_token: { string: data.accessToken.toString() }
              },
            },
          this.storeProfilePhotos
          );
          new GraphRequestManager().addRequest(profilePicRequest).start();
        }
      );
    }
  }

  storeProfilePhotos = (error, result) => {
    console.log('in storeProfilePhotos');
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      this.setState({ profilePics: result.photos.data });
      console.log(this.state.profilePics);
      this.state.profilePics.forEach(this.lookUpPictureURL.bind(this));
    }
  }

  lookUpPictureURL(pic) {
    const picRequest = new GraphRequest(
      `/${pic.id}`,
      {
        parameters: {
          fields: { string: 'images' },
          access_token: { string: this.state.fbToken }
        },
     },
      this.addPictureURL.bind(this)
    );
    new GraphRequestManager().addRequest(picRequest).start();
  }

  addPictureURL = (error, result) => {
    if(error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      console.log("In addPictureURL");
      console.log(result.images);
      switch(this.state.counter) {
        case 0: {
          this.setState({ img1Source: result.images[0].source, counter: 1 });
          return;
        }
        case 1: {
          this.setState({ img2Source: result.images[0].source, counter: 2 });
          return;
        }
        case 2: {
          this.setState({ img3Source: result.images[0].source, counter: 3 });
          return;
        }
        default: return;
      }
    }
  }

  editPhoto() {

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

export { PicSetup };
