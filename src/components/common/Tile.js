import React from 'react';
import { Image, Text, View } from 'react-native';

const Tile = (props) => {
  const { tileName, tileIcon } = props;
  const { cardStyle, imageStyle } = styles;

  return (
    <View style={cardStyle}>
      <Text style={{ alignSelf: 'center', fontSize: 12 }}>
        {tileName}
      </Text>
      <Image style={imageStyle} source={{ uri: tileIcon }} />
    </View>
  );
};

const styles = {
  imageStyle: {
    height: 50,
    width: 50,
    padding: 5,
    alignSelf: 'center',
  },
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 60,
    height: 75,
  }
};

export { Tile };
