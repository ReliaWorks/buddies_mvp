import React from 'react';
import { Image, Text, View } from 'react-native';
import { renderCloseIcon } from '../../icons';
import { CLOSE_ICON_SIZE } from '../../constants';

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
          <View style={{height: CLOSE_ICON_SIZE}} />
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
    justifyContent: 'center',
  },
  imageStyle: {
    height: 58,
    width: 58,
    backgroundColor: '#F8F8F8',
    alignSelf: 'center',
  },
  cardStyle: {
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    fontSize: 12,
    fontFamily: 'Source Sans Pro',
    textAlign: 'center',
    color: 'black',
    paddingTop: 10,
  }
};

export default EditableTile;
