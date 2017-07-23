import React from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from './Button';

const MARGIN = 15;

const Confirm = ({ children, visible, onAccept, onDecline, actionText = 'Remove' }) => {
  const { containerStyle, confirmTextStyle } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => {}}
    >
      <View
        style={{
          flex: 3,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}
      />
      <View style={containerStyle}>
        <View
          style={{
            backgroundColor: 'white',
            marginLeft: MARGIN,
            marginRight: MARGIN,
          }}
        >
          <View style={{padding: 20}}>
            <Text style={confirmTextStyle}>{children}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Button onPress={onAccept} styles={styles}>Cancel</Button>
            <View style={{width: 2}} />
            <Button onPress={onDecline} styles={styles}>{actionText}</Button>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 6,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        }}
      />
    </Modal>
  );
};

const styles = {
  confirmTextStyle: {
    fontSize: 18,
    fontFamily: 'Source Sans Pro',
    textAlign: 'center',
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 4,
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
  buttonStyle: {
    flex: 10,
    justifyContent: 'center',
    backgroundColor: '#42D3D3',
    height: 50,
  }
};

export { Confirm };
