import React from 'react';
import { Image, Text, View } from 'react-native';

const Tile = (props) => {
  const { tileName, tileIcon } = props;
  const { cardStyle, imageStyle } = styles;

  return (
    <View style={cardStyle}>
      <Image style={imageStyle} source={{ uri: tileIcon }} />
      <Text style={{ alignSelf: 'center', fontSize: 11, fontWeight: '700', textAlign: 'center' }}>
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
  }
};

export { Tile };
