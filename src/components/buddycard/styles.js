import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default styles = {
  containerStyle: {
    flex: 3,
  },
  nameTextStyle: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
  },
  locationTextStyle: {
    fontSize: 14,
    color: 'gainsboro',
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: 'Avenir-Book',
  },
  textStyle: {
    fontSize: 18,
    marginLeft: 10,
    fontFamily: 'Avenir-Book',
  },
  imageStyle: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: (height * 0.6) - 25, //60% of the screen - navbar height - padding
    width: width - 18,
  },
  descriptionContainerStyle: {
    flex: 2,
  }
};
