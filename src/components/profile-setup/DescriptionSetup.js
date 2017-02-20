import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

class DescriptionSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "I'm a stop-and-smell-the-roses runner. Not competitive. I just like to get outside and enjoy the beautiful weather while getting healthy!",
      height: 300,
    };
  }

  render() {
    return(
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>
          <Button
            onPress={() => Actions.main()}
            title="Next"
            color="#4267B2"
          />
        </View>
        <Text style={styles.textStyle}>About Me</Text>
        <TextInput
          multiline
          style={styles.descriptionInput}
          onChangeText={(text) => this.setState({text})}
          onContentSizeChange={(event) => {
            this.setState({height: event.nativeEvent.contentSize.height});
          }}
          value={this.state.text}
        />
        <Button
          onPress={() => { Actions.main(); }}
          title="Skip"
          style={{alignSelf: 'center', marginTop: 30}}
        />
      </View>
    );
  }
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Avenir-Book',
  },
  descriptionInput: {
    height: 300,
    fontSize: 18,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
  }
};

export { DescriptionSetup };
