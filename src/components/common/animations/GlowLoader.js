import React from 'react';
import { View } from 'react-native';
import Animation from 'lottie-react-native';

const anim = require('../../../assets/animations/glow_loading.json');

const GlowLoader = ({ animationRef, styles = localStyles }) => {
  return(
    <View style={styles.container}>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
    marginRight: 30,
  },
  loader: {
    width: 300,
    height: 300,
  }
};

export { GlowLoader };
