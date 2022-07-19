import React from 'react';
import {Alert} from 'react-native';
export const showAlert = (title, msg) => {
  Alert.alert(title, msg, [
    {
      text: 'OK',
      onPress: () => {},
    },
  ]);
};
