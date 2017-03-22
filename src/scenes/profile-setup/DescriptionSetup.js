import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { descriptionSaved, profileSaved } from '../../actions';

class DescriptionSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: "I'm a stop-and-smell-the-roses runner. Not competitive. I just like to get outside and enjoy the beautiful weather while getting healthy!",
      text: '',
      height: 300,
    };
  }

  render() {
    debugger;
    const { uid, activities, affiliations, description } = this.props.currentUser;

    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 5}}>
          <Button
            onPress={() => {
              this.props.profileSaved(uid, activities, affiliations, description, this.props.auth.profile_pics);
              Actions.main();
            }}
            title="Next"
            color="#4267B2"
          />
        </View>
        <Text style={styles.textStyle}>About Me</Text>
        <TextInput
          multiline
          placeholder={this.state.placeholder}
          style={styles.descriptionInput}
          onChangeText={value => {
              this.props.descriptionSaved(value);
            }
          }
          onContentSizeChange={(event) => {
            this.setState({height: event.nativeEvent.contentSize.height});
          }}
          value={this.props.text}
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

const mapStateToProps = ({ currentUser, auth }) => {
  return { currentUser, auth };
};
export default connect(mapStateToProps, { descriptionSaved, profileSaved })(DescriptionSetup);
