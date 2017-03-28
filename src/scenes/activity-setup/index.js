import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActivitySetup from './ActivitySetup';
import { activitiesFetch, activitiesSaved, activitySelected, activityUnselected } from '../../actions';

class ActivitySetupScene extends Component {
  componentWillMount() {
    this.props.activitiesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component will be rendered with
    //this.props is the old set of props the component was previously rendered with
    this.createDataSource(nextProps);
  }

  createDataSource({ activities }) {
    const activitiesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = activitiesDS.cloneWithRows({ ...activities });
  }

  onActivitySelected(uid, name, icon, isSelected) {
    if(isSelected) this.props.activitySelected({uid, name, icon});
    else this.props.activityUnselected({uid: uid, name: name, icon: icon});
  }

  render() {
    return (
      <ActivitySetup
        activities={this.props.activities}
        activitiesDS={this.dataSource}
        onNext={() => {
          this.props.activitiesSaved(this.props.currentUser.activities, this.props.auth.profile_pics);
          Actions.affiliationSetup();
        }}
        onSelected={this.onActivitySelected.bind(this)}
      />
    );
  }
}

const mapStateToProps = ({ currentUser, auth, activities }) => {
  return { currentUser, auth, activities: activities.allActivities };
};

export default connect(mapStateToProps, { activitiesFetch, activitiesSaved, activitySelected, activityUnselected })(ActivitySetupScene);