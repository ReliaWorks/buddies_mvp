import React from 'react';
import { Image, Text, View } from 'react-native';

const Tile = (props) => {
  const { tileName, tileIcon } = props;
  const { cardStyle, imageStyle } = styles;

  return (
    <View style={cardStyle}>
      <Text style={{ alignSelf: 'center' }}>
        {tileName}
      </Text>
      <Image style={imageStyle} source={{ uri: tileIcon }} />
    </View>
  );
};

const styles = {
  imageStyle: {
    height: 85,
    width: 85,
  },
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 2,
    //elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 85,
    height: 100,
  }
};

export { Tile };
