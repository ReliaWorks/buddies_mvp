import React from 'react';
import { Image, Text, View } from 'react-native';
import {tileDescription, getAttribute} from '../profile-edit/activityAttributeUtils';

const renderTileImage = (tileIcon, imageStyle) => {
  if(tileIcon)
    return (
      <Image
        style={imageStyle}
        source={{ uri: tileIcon }}
        onLoadEnd={() => {
          console.log(`Finished loading ${tileIcon}`);
        }}
      />
    );
  else return null;
};

const Tile = ({
  tileName,
  tileIcon,
  tileAttribute,
  cardStyle = styles.cardStyle,
  imageStyle = styles.imageStyle,
  titleStyle = styles.title,
  attributeStyle = styles.attribute
}) => {
  return (
    <View style={cardStyle}>
      {renderTileImage(tileIcon, imageStyle)}
      <Text style={titleStyle}>
        {tileName}
      </Text>
      {getAttribute(tileName, tileAttribute) !== 'none'
        ? <Text style={attributeStyle}>
          {tileDescription(tileName, tileAttribute)}
          </Text>
        : null
      }
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
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 12,
    textAlign: 'center'
  },
  attribute: {
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'SourceSansPro-Light',
  }
};

export { Tile };
