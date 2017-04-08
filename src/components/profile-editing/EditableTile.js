import React from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import Icon from 'react-native-vector-icons/IonIcons';
import Icon from 'react-native-vector-icons/Octicons';


const ICON_SIZE = 17;

const renderCloseIcon = (onRemove, tileId, tileName) => {
  return (
    <TouchableHighlight
      onPress={() => onRemove(tileId, tileName)}
      style={{alignSelf: 'flex-end'}}
    >
      <Icon
        name="x"
        size={ICON_SIZE}
        color="#FF4F70"
      />
    </TouchableHighlight>
  );
};

const EditableTile = ({
  tileName,
  tileIcon,
  tileId,
  cardStyle = styles.cardStyle,
  imageStyle = styles.imageStyle,
  titleStyle = styles.title,
  onRemove,
  }) => {
    return (
      <View style={cardStyle}>
        <View style={styles.iconContainer}>
          <View style={{height: ICON_SIZE}}/>
          <Image style={imageStyle} source={{ uri: tileIcon }} />
          {renderCloseIcon(onRemove, tileId, tileName)}
        </View>
        <Text style={titleStyle}>
          {tileName}
        </Text>
      </View>
    );
};

const styles = {
  iconContainer: {
    width: 95,
    height: 95,
    backgroundColor: '#F8F8F8',
//    backgroundColor: 'yellow',
    justifyContent: 'center',
//    alignItems: 'center',
  },
  imageStyle: {
    height: 58,
    width: 58,
    backgroundColor: '#F8F8F8',
    alignSelf: 'center',
  },
  cardStyle: {
//    marginTop: 10,
//    marginBottom: 10,
//    width: 95,
//    width: 110,
//    height: 100,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '100',
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    paddingTop: 10,
  }
};

export default EditableTile;
