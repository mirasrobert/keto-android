import React from 'react';
import colors from '../../Colors';
import {StyleSheet, View} from 'react-native';

const Container = ({children}) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.bright,
    paddingHorizontal: 36,
    paddingTop: 28,
  },
});

export default Container;
