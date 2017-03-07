import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { convoThumbnailStyle, textStyle } from './styles';

//const onButtonPress = () => {
//  Actions.conversation({friend});
//};

class ConversationListItem extends Component {
  render() {
    return (
    <TouchableOpacity
      onPress={() => Actions.conversation()}
    >
      <View style={styles.container}>
        <Image
          style={convoThumbnailStyle}
          source={{ uri: this.props.picture.large }}
        />
        <View style={styles.convoContainerStyle}>
          <Text style={textStyle}>
            {`${this.props.name.first} ${this.props.name.last}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    );
  }
}

const styles = {
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,

  },
  convoContainerStyle: {
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 1,
    alignItems: 'stretch',
  },
};

export { ConversationListItem };
