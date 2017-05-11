import React from 'react';
import { View } from 'react-native';
import Animation from 'lottie-react-native';

const anim = require('../../../assets/animations/typingdots/data.json');

const TypingDots = ({ animationRef }) => {
  return (
    <View style={styles.container}>
      <Animation
        ref={animation => { animationRef(animation); }}
        style={{
          width: 350,
          height: 200,
          marginBottom: 200,
        }}
        loop
        source={anim}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};


export { TypingDots };
