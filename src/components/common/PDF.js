import React from 'react';
import { Text, View, WebView } from 'react-native';

const PDF = ({path}) => {
  console.log(`path = ${path}`);
  return (
    <WebView source={path} scalesPageToFit />
  );
};

export { PDF };
