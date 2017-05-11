import React from 'react';
import { View } from 'react-native';
import Animation from 'lottie-react-native';

const anim = require('../../../assets/animations/typingdot/data.json');

const TypingDots = () => {
  return (
    <View style={styles.container}>
      <Animation
        ref={animation => { this.animation = animation; }}
        style={{
          width: 350,
          height: 200,
          marginBottom: 250
        }}
        loop
        source={anim}
      />
    </View>
  );
};

export { TypingDots };
