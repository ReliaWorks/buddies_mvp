import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { descriptionSaved } from '../../actions';
import { NEXT_BUTTON_CONTAINER_HEIGHT, PROGRESS_BAR_HEIGHT, DESC_HEADER_HEIGHT } from '../../constants';

const { width, height } = Dimensions.get('window');

class DescriptionSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: "I'm a stop-and-smell-the-roses runner. Not competitive. I just like to get outside and enjoy the beautiful weather while getting healthy!",
      text: '',
      height: 300,
    };
  }

  renderProgressBar() {
    if(this.props.source == 'Edit') {
      return null;
    }else{
      return(
        <View style={{height: PROGRESS_BAR_HEIGHT, flexDirection: 'row', alignItems: 'flex-end', backgroundColor: '#42D3D3'}}>
          <View style={{flex: 1, height: PROGRESS_BAR_HEIGHT, backgroundColor: '#FF4F7D', marginRight: 2}} />
          <View style={{flex: 1, height: PROGRESS_BAR_HEIGHT, backgroundColor: '#4A90E2', marginRight: 2}} />
          <View style={{flex: 1, height: PROGRESS_BAR_HEIGHT, backgroundColor: 'black'}} />
        </View>
      );
    }
  }

  renderDescription() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
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

  renderNextButton() {
    return (
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          onPress={() => Actions.profileSetupComplete()}
          color="white"
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderDescription()}
        {this.renderProgressBar()}
        {this.renderNextButton()}
      </View>
    );
  }
}
const styles = {
  textStyle: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Source Sans Pro',
  },
  descriptionInput: {
    height: height - NEXT_BUTTON_CONTAINER_HEIGHT - PROGRESS_BAR_HEIGHT - DESC_HEADER_HEIGHT,
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    backgroundColor: 'white',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 16,
    padding: 10,
  },
  nextButtonContainer: {
    height: NEXT_BUTTON_CONTAINER_HEIGHT,
    width: width,
    marginTop: 0,
    justifyContent: 'center',
    backgroundColor: '#42D3D3',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
};

const mapStateToProps = ({ currentUser, auth }) => {
  return { currentUser, auth };
};

export default connect(mapStateToProps, { descriptionSaved })(DescriptionSetup);
