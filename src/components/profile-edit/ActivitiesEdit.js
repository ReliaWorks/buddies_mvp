import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActivitySet from './ActivitySet';
import { activityRemoved, activityEdited } from '../../actions';
import { Confirm } from '../common';
import ActivityAttributeModal from './ActivityAttributeModal';
import styles from './styles';

class ActivitiesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tileName: '',
      tileId: '',
      attributeModal: {
        show: false,
        attribute: '',
        activityId: '',
        activityName: ''
      }
    };
  }

  addActivity() {
    Actions.activityEdit({ source: 'Edit' });
  }

  removeActivity(tileId, tileName) {
    this.setState({ showModal: true, tileId, tileName });
  }

  confirmDelete() {
    this.props.activityRemoved(this.state.tileId);
    this.setState({ showModal: false });
  }

  cancelDelete() {
    this.setState({ showModal: false });
  }

  attributeSave(activityId, newAttribute) {
    this.props.activityEdited(activityId, newAttribute);
  }
  attributeEdit(activityId, activityName, attribute) {
    this.setState({
      attributeModal: {show: true, activityId, activityName, attribute}
    });
  }
  closeActivityEditModal() {
    this.setState({
      attributeModal: {
        show: false,
        attribute: '',
        activityName: '',
        activityId: ''
      }
    });
  }

  render() {
    const { activities, title } = this.props;

    return(
      <View style={localStyles.sectionContainer}>
        <View style={styles.title}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
        <ActivitySet
          value={{activities: activities}}
          onRemove={this.removeActivity.bind(this)}
          onAdd={this.addActivity.bind(this)}
          onEdit={this.attributeEdit.bind(this)}
        />
        <Confirm
          visible={this.state.showModal}
          onAccept={this.cancelDelete.bind(this)}
          onDecline={this.confirmDelete.bind(this)}
        >
          Are you sure you want to delete {this.state.tileName}?
        </Confirm>

        <ActivityAttributeModal
          isVisible={this.state.attributeModal.show}
          activityId={this.state.attributeModal.activityId}
          activityName={this.state.attributeModal.activityName}
          attribute={this.state.attributeModal.attribute}
          onSave={this.attributeSave.bind(this)}
          onClose={this.closeActivityEditModal.bind(this)}
        />
      </View>
    );
  }
}
const localStyles = {
  sectionContainer: {
    flex: 1,
//    backgroundColor: 'white',
    backgroundColor: '#F8F8F8',
  }
};

const mapStateToProps = ({ currentUser }) => {
  const { activities } = currentUser;
  return { activities };
};

export default connect(mapStateToProps, { activityRemoved, activityEdited })(ActivitiesEdit);
