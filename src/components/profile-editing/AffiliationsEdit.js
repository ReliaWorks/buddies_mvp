import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import AffiliationSet from './AffiliationSet';
import { affiliationRemoved } from '../../actions';
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

  removeAffiliation(tileId, tileName) {
    this.setState({ showModal: true, tileId, tileName });
  }

  confirmDelete() {
    this.props.affiliationRemoved(this.state.tileId);
    this.setState({ showModal: false });
  }

  cancelDelete() {
    this.setState({ showModal: false });
  }

  render() {
    const { affiliations } = this.props;

    return(
      <View style={localStyles.affiliationSectionContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeaderText}>Affiliations</Text>
        </View>
      <AffiliationSet value={{affiliations}} onRemove={this.removeAffiliation.bind(this)} />
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
  affiliationSectionContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 25,
  }
};

const mapStateToProps = ({ currentUser }) => {
  const { affiliations } = currentUser;
  return { affiliations };
};

export default connect(mapStateToProps, { affiliationRemoved })(AffiliationsEdit);
