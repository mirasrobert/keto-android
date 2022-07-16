import React from 'react';
import colors from '../../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const PredictionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PredictionScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: colors.dark,
  },
});

export default PredictionScreen;
