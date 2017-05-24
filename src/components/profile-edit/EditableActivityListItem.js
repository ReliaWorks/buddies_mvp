import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { renderCloseIcon } from '../../icons';
import CustomIcon from '../../assets/icons';
import { CLOSE_ICON_SIZE } from '../../constants';
//import {getValue} from './activityAttributeUtils';

const EditableActivityListItem = ({
  tileName,
  tileIcon,
  tileId,
  attributeValue,
  cardStyle = styles.cardStyle,
  imageStyle = styles.imageStyle,
  titleStyle = styles.title,
  onRemove,
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.activity}>
        <Text style={styles.name}>{tileName}</Text>
        {renderCloseIcon(onRemove, tileId, tileName)}
      </View>
      <View style={styles.attribute}>
        <Text style={styles.value}>{attributeValue}</Text>
        <TouchableOpacity style={styles.editIconContainer} onPress={() => onEdit(tileId, tileName, attributeValue)}>
          <CustomIcon
            name="edit_icon"
            size={CLOSE_ICON_SIZE}
            style={styles.editIcon}
            color="#aaaaaa"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
  },
  activity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  attribute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  name: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 16,
  },
  value: {
    fontFamily: 'SourceSansPro-Light',
    fontSize: 14,
  },
  editIconContainer: {
    marginRight: 3
  },
};

export default EditableActivityListItem;
