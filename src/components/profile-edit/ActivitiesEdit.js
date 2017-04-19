import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AffiliationSet from './AffiliationSet';
import { activityRemoved } from '../../actions';
import { Confirm } from '../common';
import styles from './styles';

class AffiliationsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      tileName: '',
      tileId: '',
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

  render() {
    const { activities, title } = this.props;

    return(
      <View style={localStyles.sectionContainer}>
        <View style={styles.title}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
      <AffiliationSet
        value={{affiliations: activities}}
        onRemove={this.removeActivity.bind(this)}
        onAdd={this.addActivity.bind(this)}
      />
      <Confirm
        visible={this.state.showModal}
        onAccept={this.cancelDelete.bind(this)}
        onDecline={this.confirmDelete.bind(this)}
      >
        Are you sure you want to delete {this.state.tileName}?
      </Confirm>
      </View>
    );
  }
}
const localStyles = {
  sectionContainer: {
    flex: 1,
    backgroundColor: 'white',
  }
};

const mapStateToProps = ({ currentUser }) => {
  const { activities } = currentUser;
  return { activities };
};

export default connect(mapStateToProps, { activityRemoved })(AffiliationsEdit);
