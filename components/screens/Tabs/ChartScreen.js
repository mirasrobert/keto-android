import React, {useEffect} from 'react';
import colors from '../../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const ChartScreen = () => {
  const dispatch = useDispatch();
  const {isLoading, user} = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        onPress={() => {
          console.log(user);
        }}>
        ChartScreen
      </Text>
      <Text style={styles.title}>{user ? user.email : 'No Name'}</Text>
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

export default ChartScreen;
