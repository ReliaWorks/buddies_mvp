import React from 'react';
import { Image, Text, View } from 'react-native';

const Tile = ({
  tileName,
  tileIcon,
  cardStyle = styles.cardStyle,
  imageStyle = styles.imageStyle,
  titleStyle = styles.title
  }) => {
  return (
    <View style={cardStyle}>
      <Image style={imageStyle} source={{ uri: tileIcon }} />
      <Text style={titleStyle}>
        {tileName}
      </Text>
    </View>
  );
};

const styles = {
  imageStyle: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  cardStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    width: 75,
    height: 100,
  },
  title: {
    alignSelf: 'center',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center'
  }
};

export { Tile };
