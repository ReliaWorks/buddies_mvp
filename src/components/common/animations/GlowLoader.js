import React from 'react';
import { Dimensions, View } from 'react-native';
import Animation from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const anim = require('../../../assets/animations/glow_loading.json');

function getContainerStyle() {
  const containerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.3,
    marginRight: width * 0.15,
  };

  console.log(`height = ${height}`);
  if(height < 600) {
    console.log("iPhone 5");
    return {...containerStyle, marginBottom: 130, marginRight: 10};
  } else if(height > 600 && height <= 700) {
    console.log("iPhone 6");
    return {...containerStyle, marginBottom: 185, marginRight: 30};
  } else if(height > 700)
    return {...containerStyle, marginBottom: 200, marginRight: 50};
  return containerStyle;
}

const GlowLoader = ({ animationRef, styles = localStyles }) => {
  return(
    <View style={getContainerStyle()}>
      <Animation
        ref={animation => { animationRef(animation); }}
        style={styles.loader}
        loop
        source={anim}
      />
    </View>
  );
};

const localStyles = {
  loader: {
    width: 300,
    height: 300,
  }
};

export { GlowLoader };
