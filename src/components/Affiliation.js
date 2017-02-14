import React, { Component } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { FullSizeImageModal } from './common';

const ggtcAffiliationImage = require('./common/img/ggtc_logo.png');
const rrcaAffiliationImage = require('./common/img/rrca_logo.png');

class Affiliation extends Component {
  state = { showModal: false, selectedImage: require('./common/img/ggtc_logo.png') };

  onModalClose() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <ScrollView
        style={{ flexDirection: 'row', flex: 1, alignSelf: 'stretch' }}
        horizontal
      >
        <TouchableOpacity
          onPress={() =>
            this.setState({
              showModal: !this.state.showModal,
              selectedImage: ggtcAffiliationImage
            })
          }
        >
          <View style={{ padding: 10 }}>
            <Image
              style={{ height: 75, width: 75 }}
              source={ggtcAffiliationImage}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              showModal: !this.state.showModal,
              selectedImage: rrcaAffiliationImage
            })
          }
        >
          <View style={{ padding: 10 }}>
            <Image
              style={{ height: 75, width: 50, alignSelf: 'stretch' }}
              source={rrcaAffiliationImage}
            />
          </View>
        </TouchableOpacity>
        <FullSizeImageModal
          visible={this.state.showModal}
          imageURI={this.state.selectedImage}
          onClose={this.onModalClose.bind(this)}
        >
        test
        </FullSizeImageModal>
      </ScrollView>
    );
  }
}

export default Affiliation;
