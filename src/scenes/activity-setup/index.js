import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActivitySetup from './ActivitySetup';
import { activitiesFetch, activitiesSaved, photosSaved, activitySelected, activityUnselected } from '../../actions';

class ActivitySetupScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchText: ''
    };
  }

  componentWillMount() {
    this.props.activitiesFetch();
    this.activitiesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.createDataSource(this.props);
  }

  componentWillUnmount() {
    this.props.activitiesSaved(this.props.currentUser.activities);
    if(this.props.source != 'Edit') {
      this.props.photosSaved(this.props.currentUser.profileImages);
    }
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component will be rendered with
    //this.props is the old set of props the component was previously rendered with
    this.createDataSource(nextProps);
  }

  createDataSource({ activities }) {
    // const activitiesDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.dataSource = activitiesDS.cloneWithRows({ ...activities });

    const searchText = this.state.searchText;

    this.setState({
      dataSource: this.activitiesDS.cloneWithRows({ ...(this._filterActivities(activities, searchText)) })
    });
  }

  onActivitySelected(uid, name, icon, isSelected) {
    if(isSelected) this.props.activitySelected({uid, name, icon});
    else this.props.activityUnselected({uid , name, icon});
  }

  onSearchBarChangeText(searchText) {
    console.log(searchText);
    this.setState({
      searchText: searchText,
      dataSource: this.activitiesDS.cloneWithRows({ ...this._filterActivities(this.props.activities, searchText) })
    });
  }

  render() {
    let onNextAction = () => {
      Actions.affiliationSetup();
    };
    let navLabel = "Next";
    if(this.props.source == 'Edit') {
      onNextAction = () => {
        Actions.userEdit();
      };
      navLabel = "Done";
    }

    return (
      <ActivitySetup
        activities={this.props.activities}
        activitiesDS={this.state.dataSource}
        onNext={onNextAction}
        onSelected={this.onActivitySelected.bind(this)}
        navLabel={navLabel}
        currentActivities={this.props.currentUser.activities}
        onSearchBarChangeText={this.onSearchBarChangeText.bind(this)}
      />
    );
  }

  _filterActivities(activities, searchText) {
    if (searchText) {
      return _.pickBy(activities, (value, key) => {
        return value.name.toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      return activities;
    }
  }
}

const mapStateToProps = ({ currentUser, auth, activities }) => {
  return { currentUser, auth, activities: activities.allActivities };
};

export default connect(mapStateToProps, { activitiesFetch, activitiesSaved, photosSaved, activitySelected, activityUnselected })(ActivitySetupScene);
