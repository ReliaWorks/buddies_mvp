import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { renderCloseIcon } from '../../icons';
import CustomIcon from '../../assets/icons';
import { CLOSE_ICON_SIZE } from '../../constants';
import {listDescription} from './activityAttributeUtils';

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
        <Text style={styles.value}>{listDescription(tileName, attributeValue)}</Text>
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
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F8F8F8',
    backgroundColor: 'white',

  },
  activity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
//    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  attribute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopWidth: 1,
    borderTopColor: '#aaa',
  },
  name: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 14,
  },
  value: {
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
    color: '#808184',
  },
  editIconContainer: {
    marginRight: 3
  },
};

export default EditableActivityListItem;
