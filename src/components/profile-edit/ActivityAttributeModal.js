import React, { Component } from 'react';
import { Dimensions, View, ScrollView, Text, ListView, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modal';
import {attributeOptions, attributeShortDescription, scrollPosition} from './activityAttributeUtils';

const { width } = Dimensions.get('window');

/*
*    scrolling to lower values when openning this modal will work only for ios, this feature will not work for android for now.
*/

export default class ActivityAttributeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: props.activity.attribute,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isVisible === false && nextProps.isVisible === true) {
      this.setState({
        attribute: nextProps.activity.attribute,
      });
    }
  }

  render() {
    const { activity } = this.props;

    return (
      <Modal
        isVisible={this.props.isVisible}
        style={styles.container}
        backdropOpacity={0.1}
        transparent
      >
        <View style={styles.altContainer}>
          <View style={styles.topContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => this.props.onClose()}>
              <Text style={styles.headerText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>{attributeShortDescription(activity.name)}</Text>
            <TouchableOpacity
            style={styles.saveButton}
              onPress={() => {
                this.props.onSave({...activity, attribute: this.state.attribute});
                this.props.onClose();
              }}
            >
              <Text style={styles.headerText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentOffset={scrollPosition(activity.name)}>
            {attributeOptions(activity.name).map(name => {
              const itemContainerStyle = name === this.state.attribute ? [styles.itemContainer, styles.selectedItem] : styles.itemContainer;
              const itemTextStyle = name === this.state.attribute ? [styles.itemText, styles.selectedItemText] : styles.itemText;
              return (
                <TouchableOpacity style={itemContainerStyle} key={name} onPress={() => this.setState({attribute: name})}>
                  <Text style={itemTextStyle}>{name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    padding: 0,
    margin: 0
  },
  altContainer: {
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderTopColor: 'black',
    justifyContent: 'center',
    height: 180,
    width: width,
    left: 0
  },
  topContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    flex: 1
  },
  headerText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
    fontSize: 16,
  },
  list: {
    flex: 3,
  },
  itemContainer: {
    padding: 10,
  },
  itemText: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Source Sans Pro',
    fontSize: 14,
  },
  selectedItemText: {
    color: 'white',
  },
  selectedItem: {
    backgroundColor: '#4A90E2',
  },
  saveButton: {
    flex: 1,
  },
});
