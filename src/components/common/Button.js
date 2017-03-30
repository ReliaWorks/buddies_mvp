import React from 'react';
import { Dimensions, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const LOGINFORM_MARGIN = 15;

const Button = ({ onPress, children, styles = localStyles }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const localStyles = {
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Avenir-Book',
    fontWeight: '700',
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#42D3D3',
    width: width - (LOGINFORM_MARGIN * 2),
    marginLeft: LOGINFORM_MARGIN,
    marginRight: LOGINFORM_MARGIN,
    marginBottom: 5,
  }
};

export { Button };
