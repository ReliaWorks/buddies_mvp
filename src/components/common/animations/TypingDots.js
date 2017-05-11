import React from 'react';
import { View } from 'react-native';
import Animation from 'lottie-react-native';

const anim = require('../../../assets/animations/typingdots/data.json');

const TypingDots = ({ animationRef, styles = localStyles }) => {
  return (
    <View style={styles.container}>
      <Animation
        ref={animation => { animationRef(animation); }}
        style={styles.dots}
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
  },
  dots: {
    width: 350,
    height: 200,
  }
};


export { TypingDots };
