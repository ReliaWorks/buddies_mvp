import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddIcon = ({ onPress, styles = localStyles }) => {
  return (
    <TouchableOpacity style={styles.addActivityIcon} onPress={onPress}>
      <Icon
        name="add-circle"
        size={ICON_SIZE - 12}
        color="black"
        style={{justifyContent: 'center'}}
      />
    </TouchableOpacity>
  );
};

const ICON_SIZE = 50;

const localStyles = {
  addActivityIcon: {
    margin: 12,
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  addActivityIconTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  }
};

export { AddIcon };
