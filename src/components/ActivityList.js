import _ from 'lodash';
import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { activitiesFetch } from '../actions';
import Activity from './Activity';

class ActivityList extends Component {
  componentWillMount() {
    this.props.activitiesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ activities }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(activities);
  }

  renderRow(singleActivity) {
    return <Activity activity={singleActivity} />;
  }

  render() {
    console.log('In ActivityList render');
    console.log(this.props);
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const activities = _.map(state.activities, (val, uid) => {
    return { ...val, uid };
  });
  return { activities };
};

export default connect(mapStateToProps, { activitiesFetch })(ActivityList);
