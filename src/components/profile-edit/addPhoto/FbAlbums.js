import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { fetchFacebookAlbums, fetchFacebookAlbumPhotos } from '../../../actions';

class FbAlbums extends Component {
  componentWillMount() {
    this.props.fetchFacebookAlbums();
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
    const albums = this.props.currentUser.facebookAlbums.filter((album) => album.count > 0);

    return (
      <ListView
        contentContainerStyle={styles.albumList}
        enableEmptySections
        dataSource={ds.cloneWithRows(albums)}
        renderRow={(rowData) => this.renderAlbumAsListItem(rowData)}
      />
    );
  }
  renderAlbumAsListItem(rowData) {
    const { id, name, cover_photo: coverPhoto, count } = rowData;
    const source = coverPhoto && coverPhoto.images[0].source;

    return (
      <TouchableOpacity
        style={styles.albumItem}
        onPress={() => {
          Actions.addPhotoFbAlbumPhotos();
          this.props.fetchFacebookAlbumPhotos(id);
        }}
      >
        <Image style={styles.albumItemImage} source={{ uri: source }} />
        <View style={styles.albumItemRightContainer}>
          <Text style={styles.albumItemName}>{name}</Text>
          <Text style={styles.albumItemImageCount}>{count} photos</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ currentUser }) => {
  return { currentUser };
};
export default connect(mapStateToProps, { fetchFacebookAlbums, fetchFacebookAlbumPhotos })(FbAlbums);

const styles = StyleSheet.create({
  albumList: {
    alignItems: 'stretch',
    margin: 10,
  },
  albumItem: {
    flexDirection: 'row',
    margin: 5,
  },
  albumItemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  albumItemRightContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#D5D5D5',
  },
  albumItemName: {
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    flexWrap: "wrap",
  },
  albumItemImageCount: {
    fontSize: 12,
    marginTop: 5,
    color: 'grey',
  },
});
