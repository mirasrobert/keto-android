import React, {useEffect} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View, Image} from 'react-native';
// Import React Native paper button
import {Button} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const HomeScreen = () => {
  const navigation = useNavigation();

  const {error, loginHasError, registerHasError} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    console.log('HomeScreen Loaded');

    if (error && loginHasError) {
      navigation.navigate('Login');
      return;
    }

    if (error && registerHasError) {
      navigation.navigate('Register');
      return;
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.hero}
        source={require('../../assets/img/medicine.png')}
      />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to KETO</Text>
        <Text style={styles.subText}>
          Manage your health and predict an early-stage risk of diabetes with
          ease of use.
        </Text>
        <Button
          onPress={() => {
            navigation.navigate('Register');
          }}
          mode="contained"
          style={styles.mdRounded}
          contentStyle={styles.registerButton}>
          Create an Account
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('Login');
          }}
          labelStyle={styles.loginTextButton}
          mode="contained"
          style={styles.mdRounded}
          contentStyle={styles.loginButton}>
          Log In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  hero: {
    marginTop: 94,
    paddingHorizontal: 24,
    width: 366,
    height: 288,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingHorizontal: 24,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
    fontFamily: 'Roboto',
    color: colors.dark,
  },
  subText: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 47,
  },
  registerButton: {
    textTransform: 'uppercase',
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  loginButton: {
    textTransform: 'uppercase',
    padding: 10,
    backgroundColor: colors.light,
    color: colors.dark,
    borderRadius: 10,
  },
  mdRounded: {
    borderRadius: 10,
    marginBottom: 27,
  },
  loginTextButton: {
    color: colors.dark,
  },
});

export default HomeScreen;
