import React, { Component } from 'react';
import { Dimensions, findNodeHandle, ScrollView, Text, TextInput, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ActivitiesEdit from '../../components/profile-edit/ActivitiesEdit';
import AffiliationsEdit from '../../components/profile-edit/AffiliationsEdit';
import { Button } from '../../components/common';
import { DESCRIPTION_PLACEHOLDER } from '../../constants';

const MARGIN = 15;
const { width } = Dimensions.get('window');

class UserEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: this.props.description,
      height: 300,
    };
  }
  componentWillUnmount() {
    const {text} = this.state;
    if (this.props.description !== text) {
      this.props.descriptionSaved(text);
    }
  }

  renderActivities(activities) {
    return(
      <ActivitiesEdit activities={activities} title="Activities" />
    );
  }

  renderAffiliations(affiliations) {
    return(
      <AffiliationsEdit affiliations={affiliations} title="Affiliations" />
    );
  }

  inputFocused(ref) {
    this._scroll(ref, 200);
  }

  inputBlurred(ref) {
    this._scroll(ref, 0);
  }

  renderDescription() {
    return (
      <View style={{ flex: 1, padding: 10}}>
        <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>About Me</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <TextInput
            ref="myInput"
            multiline
            style={styles.descriptionInput}
            onChangeText={text => {
              this.setState({text});
              //this.props.descriptionSaved(text);
            }}
            onContentSizeChange={(event) => {
              this.setState({height: event.nativeEvent.contentSize.height});
            }}
            onFocus={this.inputFocused.bind(this, 'myInput')}
            onBlur={this.inputBlurred.bind(this, 'myInput')}
            placeholder={DESCRIPTION_PLACEHOLDER}
            value={this.state.text}
            testID={'descriptionTextInput'}
          />
        </View>
      </View>
    );
  }

  renderSaveButton() {
    return (
      <Button onPress={() => Actions.userView()} style={saveButtonStyles}>
        Save
      </Button>
    );
  }

  _scroll(ref, offset) {
    setTimeout(() => {
      const scrollResponder = this.refs.myScrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[ref]),
        offset,
        true
      );
    });
  }

  render() {
    const { activities, affiliations } = this.props;

    return (
      <ScrollView
        ref="myScrollView"
        style={styles.scrollViewContainer}
        keyboardDismissMode='interactive'
        testID={'ScrollView'}
      >
        {this.renderActivities(activities)}
        {this.renderAffiliations(affiliations)}
        {this.renderDescription()}
        {this.renderSaveButton()}
      </ScrollView>
    );
  }
}

const saveButtonStyles = {
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'SourceSansPro-Bold',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    width: width - (MARGIN * 2),
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginBottom: 5,
  }
};

const styles = {
  scrollViewContainer: {
    backgroundColor: '#F8F8F8',
    flex: 1,
  },
  sectionHeaderText: {
    fontFamily: 'Source Sans Pro',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MARGIN,
    marginBottom: 10,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginLeft: 5,
    marginRight: 5,
  },
  descriptionInput: {
    height: 200,
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    color: '#000000',
  }
};

export default UserEdit;
