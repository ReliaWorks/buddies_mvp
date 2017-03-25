import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import AffiliationSetup from './AffiliationSetup';
import { affiliationsFetch, affiliationsSaved, affiliationSelected, affiliationUnselected } from '../../actions';

class AffiliationSetupScene extends Component {
  componentWillMount() {
    this.props.affiliationsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //nextProps are the next set of props that this component will be rendered with
    //this.props is the old set of props the component was previously rendered with
    this.createDataSource(nextProps);
  }

  createDataSource({ affiliations }) {
    const affiliationsDS = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.dataSource = affiliationsDS.cloneWithRows({ ...affiliations });
  }

  onAffiliationSelected(uid, name, icon, isSelected) {
    if(isSelected) this.props.affiliationSelected({uid, name, icon});
    else this.props.affiliationUnselected({uid: uid, name: name, icon: icon});
  }

  render() {
    return (
      <AffiliationSetup
        affiliationsDS={this.dataSource}
        onNext={() => {
          this.props.affiliationsSaved(this.props.currentUser.affiliations);
          Actions.descriptionSetup();
        }}
        onSelected={this.onAffiliationSelected.bind(this)}
      />
    );
  }
}

const mapStateToProps = ({ currentUser, auth, affiliations }) => {
  return { currentUser, auth, affiliations: affiliations.allAffiliations };
};

export default connect(mapStateToProps, { affiliationsFetch, affiliationsSaved, affiliationSelected, affiliationUnselected })(AffiliationSetupScene);
