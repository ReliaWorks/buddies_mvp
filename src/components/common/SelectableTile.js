import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


class SelectableTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tileBackgroundColor: 'white',
      selected: false,
    };
  }

  onTilePress() {
    const { onSelect, tileId } = this.props;
    const selected = !this.state.selected;

    this.setState({ selected, tileBackgroundColor: (selected ? 'purple' : 'white')});
    console.log(`Calling onSelect ${tileId} ${selected}`);
    if(selected) onSelect(tileId);
  }

  render() {
    const { tileId, tileName, tileIcon } = this.props;
    const { imageStyle } = styles;

    console.log(`Tile id = ${tileId}`);

    return (
      <TouchableOpacity onPress={this.onTilePress.bind(this)}>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 2,
            borderColor: '#ddd',
            backgroundColor: this.state.tileBackgroundColor,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
            marginBottom: 10,
            width: 150,
            height: 150,
          }}
        >
          <Text style={{ alignSelf: 'center', fontSize: 18, marginBottom: 5 }}>
            {tileName}
          </Text>
          <Image style={imageStyle} source={{ uri: tileIcon }} />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = {
  imageStyle: {
    height: 90,
    width: 90,
    alignSelf: 'center',
  },
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    backgroundColor: 'white',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    width: 150,
    height: 150,
  }
};

export { SelectableTile };
