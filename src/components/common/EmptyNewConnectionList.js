import React from 'react';
import { View, Text } from 'react-native';

function renderGreyCircles() {
  return(
    <View style={styles.circleContainer}>
      <View style={styles.grayCircle} />
      <View style={styles.grayCircle} />
      <View style={styles.grayCircle} />
      <View style={styles.grayCircle} />
    </View>
  );
}
const EmptyNewConnectionList = () => {
  return(
    <View>
      <View style={{marginTop: MARGIN, marginLeft: MARGIN }}>
        <Text style={styles.headerText}>New Connections</Text>
        {renderGreyCircles()}
      </View>
      <View style={{borderBottomWidth: 1, marginTop: MARGIN}} />
    </View>
  );
};

const MARGIN = 15;

const styles = {
  headerText: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-SemiBold',
  },
  circleContainer: {
    flexDirection: 'row',
  },
  grayCircle: {
    marginTop: 15,
    marginLeft: 7,
    marginRight: 7,
    height: 70,
    width: 70,
    borderRadius: 35,
    borderWidth: 35,
    borderColor: '#F8F8F8',
  },
};

export { EmptyNewConnectionList };
