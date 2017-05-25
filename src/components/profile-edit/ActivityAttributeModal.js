import React, {Component} from 'react';
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
      value: this.props.value,
      //scrollPosition: scrollPosition(nextProps.activityName)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isVisible === false && nextProps.isVisible === true) {
      this.setState({
        value: nextProps.value,
        //scrollPosition: {x: 0, y: 30}
      });
    }
  }

  render() {
    const selectedStyle = {fontWeight: 'bold'};
    console.log('actId:', this.props.activityId);

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
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text>{attributeShortDescription(this.props.activityName)}</Text>
            <TouchableOpacity
            style={styles.saveButton}
              onPress={() => {
                this.props.onSave(this.props.activityId, this.state.value);
                this.props.onClose();
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentOffset={scrollPosition(this.props.activityName)}>
            {attributeOptions(this.props.activityName).map(name => {
              const style = name === this.state.value ? [styles.item, styles.selectedItem] : styles.item;
              return (
                <TouchableOpacity style={styles.itemContainer} key={name} onPress={() => this.setState({value: name})}>
                  <Text style={style}>{name}</Text>
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
  cancelButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  list: {
    flex: 3,
    //borderWidth: 1,
  },
  itemContainer: {

  },
  item: {
    padding: 10,
    textAlign: 'center',
  },
  selectedItem: {
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
  },
  saveButtonText: {
    textAlign: 'center',
  }
});
