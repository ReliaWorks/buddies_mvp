import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const SELECTED_COLOR = '#D8FCFC';

class SelectableTile extends Component {
  constructor(props) {
    super(props);
    const isSelected = this.props.isSelected;

    this.state = {
      tileBackgroundColor: (isSelected ? SELECTED_COLOR : 'white'),
      tileBorderColor: '#ECECEC',
      isSelected: isSelected,
    };
  }

  onTilePress() {
    const { onSelect, tileId, tileName, tileIcon } = this.props;
    const isSelected = !this.state.isSelected;

    this.setState({
      isSelected,
      tileBackgroundColor: (isSelected ? SELECTED_COLOR : 'white'),
    });
    onSelect(tileId, tileName, tileIcon, isSelected);
  }

  render() {
    const { tileName, tileIcon, source } = this.props;
    const { activityTextLabel, imageStyle} = styles;

    let width = 101;
    let height = 101;

    if (source == 'affiliations') {
      imageStyle.marginTop = 15;
      width = 131;
      height = 131;
    }

    return (
      <TouchableOpacity onPress={this.onTilePress.bind(this)}>
        <View
          style={{
            borderWidth: 1,
            borderColor: this.state.tileBorderColor,
            backgroundColor: this.state.tileBackgroundColor,
            marginRight: 10,
            marginBottom: 10,
            width: width,
            height: height,
          }}
        >
          <Image style={imageStyle} source={{ uri: tileIcon }} />
          <Text style={activityTextLabel}>
            {tileName}
          </Text>
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
    fontWeight: '500',
    textAlign: 'center',
  }
};

export { SelectableTile };
