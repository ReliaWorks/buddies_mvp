import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import _ from 'lodash';
import AffiliationSetup from './AffiliationSetup';
import { affiliationsFetch, affiliationsSaved, affiliationSelected, affiliationUnselected } from '../../actions';

class AffiliationSetupScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      searchText: ''
    };
  }

  componentWillMount() {
    this.props.affiliationsFetch();
    this.affiliationsDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.createDataSource(this.props);
  }

  componentWillUnmount() {
    this.props.affiliationsSaved(this.props.currentUser.affiliations);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component will be rendered with
    //this.props is the old set of props the component was previously rendered with
    this.createDataSource(nextProps);
  }

  createDataSource({ affiliations }) {
    //const affiliationsDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const searchText = this.state.searchText;

    this.setState({
      dataSource: this.affiliationsDS.cloneWithRows({ ...(this._filterAffiliations(affiliations, searchText)) })
    });
  }

  onAffiliationSelected(uid, name, icon, isSelected) {
    if(isSelected) this.props.affiliationSelected({uid, name, icon});
    else this.props.affiliationUnselected({uid, name, icon});
  }

  onSearchBarChangeText(searchText) {
    this.setState({
      searchText: searchText,
      dataSource: this.affiliationsDS.cloneWithRows({ ...this._filterAffiliations(this.props.affiliations, searchText) })
    });
  }

  render() {
    let onNextAction = () => {
      Actions.descriptionSetup();
    };
    let navLabel = "Next";
    if(this.props.source == 'Edit') {
      onNextAction = () => {
        Actions.userEdit();
      };
      navLabel = "Done";
    }
    return (
      <AffiliationSetup
        affiliationsDS={this.state.dataSource}
        onNext={onNextAction}
        onSelected={this.onAffiliationSelected.bind(this)}
        navLabel={navLabel}
        currentAffiliations={this.props.currentUser.affiliations}
        onSearchBarChangeText={this.onSearchBarChangeText.bind(this)}
      />
    );
  }

  _filterAffiliations(affiliations, searchText) {
    if (searchText) {
      return _.pickBy(affiliations, (value, key) => {
        return value.name.toLowerCase().includes(searchText.toLowerCase());
      });
    } else {
      return affiliations;
    }
  }
}

const mapStateToProps = ({ currentUser, auth, affiliations }) => {
  return { currentUser, auth, affiliations: affiliations.allAffiliations };
};

export default connect(mapStateToProps, { affiliationsFetch, affiliationsSaved, affiliationSelected, affiliationUnselected })(AffiliationSetupScene);
