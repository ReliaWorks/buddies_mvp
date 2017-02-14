import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { convoThumbnailStyle, textStyle } from './styles';

const onButtonPress = () => {
  Actions.conversation();
};

const ConversationListItem = (props) => (
  <TouchableOpacity
    onPress={onButtonPress}
  >
    <View style={styles.container}>
      <Image
        style={convoThumbnailStyle}
        source={{ uri: props.picture.large }}
      />
      <View style={styles.convoContainerStyle}>
        <Text style={textStyle}>
          {`${props.name.first} ${props.name.last}`}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

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
//    backgroundColor: 'purple',
//    borderWidth: 1,
//    borderRadius: 2,
//    borderColor: '#ddd',
//    borderBottomWidth: 0,
//    shadowColor: '#000',
//    shadowOffset: { width: 0, height: 2 },
//    shadowOpacity: 0.1,
//    shadowRadius: 2,
//    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 1,
    alignItems: 'stretch',
  },
};

export { ConversationListItem };
