import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const BRAND_PRIMARY_COLOR = '#FF703B';

export const backgroundImage = {
  flex: 1,
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: null,
  height: null
};

export const buttonIconStyle = {
  width: 20,
  height: 20
};

export const buttonStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginLeft: 5,
    marginRight: 5
};

export const containerStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  elevation: 2,
//  borderWidth: 1,
//  borderColor: '#979797',
};

export const convoThumbnailStyle = {
  height: 75,
  width: 75,
  marginLeft: 10,
  marginBottom: 10
};

export const headerTextStyle = {
  fontSize: 22,
  fontFamily: 'Avenir-Book',
  padding: 10
};

export const legalTextStyle = {
  alignSelf: 'center',
  color: 'blue',
  fontFamily: 'Avenir-Book',
  fontSize: 12,
  textAlign: 'center',
  margin: 5,
};

export const loginButtonStyle = {
//  flex: 1,
  alignItems: 'center',
  backgroundColor: '#4267B2',
  height: 45,
  borderRadius: 10,
  borderWidth: 1,
};
export const profileImageContainer = {
  flex: 3,
};

export const profileImage = {
  alignSelf: 'stretch',
  justifyContent: 'center',
  height: (height * 0.6) - 50, //60% of the screen - navbar height - padding
  width: width - 18,
};

export const navTitleStyle = {
  fontFamily: 'Avenir-Book',
  fontSize: 24,
};

export const navBarStyle = {
  backgroundColor: BRAND_PRIMARY_COLOR,
};

export const spinnerStyle = {
  alignSelf: 'center'
};

export const centeredTextStyle = {
  fontSize: 20,
  fontFamily: 'Avenir-Book',
  textAlign: 'center',
  marginTop: 10,
  marginBottom: 10,
};

export const textStyle = {
  fontSize: 20,
  fontFamily: 'Avenir-Book',
};
