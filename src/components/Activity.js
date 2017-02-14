import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardItem } from './common';
import { headerTextStyle, textStyle } from './common/styles';

class Activity extends Component {
  onRowPress() {
    Actions.userEdit({ activity: this.props.activity });
  }

  render() {
    const { name, attribute1, attribute2 } = this.props.activity;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
        <CardItem>
          <Text style={headerTextStyle}>
            {name}
          </Text>
        </CardItem>
        <View style={styles.containerStyle}>
          <Text style={textStyle}>
            {attribute1}
          </Text>
        </View>
        <View style={styles.containerStyle}>
          <Text style={textStyle}>
            {attribute2}
          </Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  containerStyle: {
    marginLeft: 10
  }
};

export default Activity;
