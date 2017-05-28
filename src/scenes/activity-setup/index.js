import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ActivitySetup from './ActivitySetup';
import { activitiesFetch, activitiesSaved, photosSaved, activitySelected, activityUnselected, activityEdited } from '../../actions';
import ActivityAttributeModal from '../../components/profile-edit/ActivityAttributeModal';

class ActivitySetupScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchText: '',
      attributeModal: {
        show: false,
        activity: {
          attribute: '',
          activityId: '',
          activityName: '',
          activityIcon: '',
        }
      }
    };
  }

  componentWillMount() {
    if (!this.props.wasAllActivitiesFetched) {
      this.props.activitiesFetch();
    }
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
    const searchText = this.state.searchText;

    this.setState({
      dataSource: this.activitiesDS.cloneWithRows({ ...(this._filterActivities(activities, searchText)) })
    });
  }

  onActivitySelected(uid, name, icon, isSelected, attribute) {
    if(isSelected) {
      this.props.activitySelected({uid, name, icon, attribute});

      if (this.props.source === 'Edit') {
        this.setState({
          attributeModal: {show: true, activity: {activityId: uid, activityName: name, activityIcon: icon, attribute}}
        });
      }
    } else {
      this.props.activityUnselected({uid , name, icon, attribute});
    }
  }

  onSearchBarChangeText(searchText) {
    this.setState({
      searchText: searchText,
      dataSource: this.activitiesDS.cloneWithRows({ ...this._filterActivities(this.props.activities, searchText) })
    });
  }

  attributeSave(activity) {
    this.props.activityEdited(activity);
  }
  closeActivityEditModal() {
    this.setState({
      attributeModal: {
        show: false,
        activity: {
          attribute: '',
          activityId: '',
          activityName: '',
          activityIcon: '',
        }
      }
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
      <View style={{flex: 1}}>
        <ActivitySetup
          activities={this.props.activities}
          activitiesDS={this.state.dataSource}
          onNext={onNextAction}
          onSelected={this.onActivitySelected.bind(this)}
          navLabel={navLabel}
          currentActivities={this.props.currentUser.activities}
          onSearchBarChangeText={this.onSearchBarChangeText.bind(this)}
          source={this.props.source}
        />
        <ActivityAttributeModal
          isVisible={this.state.attributeModal.show}
          activity={this.state.attributeModal.activity}
          onSave={this.attributeSave.bind(this)}
          onClose={this.closeActivityEditModal.bind(this)}
        />
      </View>
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
  const {allActivities, wasAllActivitiesFetched} = activities;
  return { currentUser, auth, activities: allActivities, wasAllActivitiesFetched };
};

export default connect(mapStateToProps, { activitiesFetch, activitiesSaved, photosSaved, activitySelected, activityUnselected, activityEdited })(ActivitySetupScene);
