import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentUserFetch, descriptionSaved } from '../../actions';
import UserEdit from './UserEdit';

class UserEditContainer extends Component {
  render() {
    const { activities, affiliations, description } = this.props;

    return (
      <UserEdit
        activities={activities}
        affiliations={affiliations}
        description={description}
        descriptionSaved={this.props.descriptionSaved}
      />
    );
  }
}
const mapStateToProps = ({ currentUser }) => {
  return currentUser;
};

export default connect(mapStateToProps, { currentUserFetch, descriptionSaved })(UserEditContainer);
