import React from 'react';
import { Image, Text, View } from 'react-native';

const Tile = (props) => {
  console.log(props);
  return (
    <View style={styles.cardStyle}>
      <Text style={{ alignSelf: 'center' }}>
        {props.tileName}
      </Text>
      <Image style={styles.imageStyle} source={{ uri: props.tileIcon }} />
    </View>
  );
};

//<TouchableOpacity onPress={() => { Actions.root(); }}>
//  <View style={{ padding: 10 }}>
//    <Image
//      style={styles.mainImageStyle}
//      source={{ uri: this.state.img1Source }}
//    />
//  </View>
//</TouchableOpacity>

const styles = {
  imageStyle: {
    height: 100,
    width: 100,
//    marginTop: 20,
  },
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
   borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 100,
    height: 120,
  }
};

export { Tile };
