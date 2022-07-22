import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
export const showAlert = (title, msg) => {
  Alert.alert(title, msg, [
    {
      text: 'OK',
      onPress: () => {},
    },
  ]);
};

export const showAlertDialog = (title, msg, func) => {
  Alert.alert(title, msg, [
    {
      text: 'Cancel',
      onPress: () => {},
      style: 'cancel',
    },
    {text: 'Yes', onPress: () => func},
  ]);
};
