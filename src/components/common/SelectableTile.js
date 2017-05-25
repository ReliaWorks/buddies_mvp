import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import {tileDescription, getValue} from '../profile-edit/activityAttributeUtils';

const SELECTED_COLOR = '#D8FCFC';
const TILE_BACKGROUNDCOLOR = 'white';

class SelectableTile extends Component {
  constructor(props) {
    super(props);
    const isSelected = this.props.isSelected;

    this.state = {
      tileBackgroundColor: (isSelected ? SELECTED_COLOR : TILE_BACKGROUNDCOLOR),
      tileBorderColor: '#ECECEC',
      isSelected: isSelected,
    };
  }

  onTilePress() {
    const { onSelect, onEdit, tileId, tileName, tileIcon, attribute } = this.props;
    const isSelected = !this.state.isSelected;

    this.setState({
      isSelected,
      tileBackgroundColor: (isSelected ? SELECTED_COLOR : 'white'),
    });

    onSelect(tileId, tileName, tileIcon, isSelected, getValue(tileName, attribute));
  }

  render() {
    const { tileName, tileIcon, source } = this.props;
    const { activityTextLabel, imageStyle, attribute} = styles;

    let width = 108;
    let height = 108;
    let imageMarginTop = 5;
    if (source === 'affiliations') {
      imageMarginTop = 35;
      width = 168;
      height = 168;
    }
    imageStyle.marginTop = imageMarginTop;

    return (
      <TouchableOpacity onPress={this.onTilePress.bind(this)}>
        <View
          style={{
            borderWidth: 1,
            borderColor: this.state.tileBorderColor,
            backgroundColor: this.state.tileBackgroundColor,
            marginRight: 10,
            marginBottom: 12,
            width: width,
            height: height,
          }}
        >
          <Image style={imageStyle} source={{ uri: tileIcon }} />
          <Text style={activityTextLabel}>
            {tileName}
          </Text>
          {this.props.isSelected && this.props.attribute !== 'none'
            ? <Text style={attribute}>
              {tileDescription(tileName, this.props.attribute)}
              </Text>
            : null
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  imageStyle: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    marginTop: 5,
  },
  activityTextLabel: {
    fontSize: 14,
    fontFamily: 'Source Sans Pro',
//    fontFamily: 'SourceSansPro-SemiBold',
    textAlign: 'center',
  },
  attribute: {
    textAlign: 'center',
    fontSize: 9,
    fontFamily: 'SourceSansPro-Light'
  }
};

export { SelectableTile };
