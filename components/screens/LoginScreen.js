import React, {useState, useEffect} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {loginUser} from '../../features/auth/authSlice';
import Loader from '../elements/Loader';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading, error} = useSelector(state => state.auth);

  const handleLogin = e => {
    // Validate Forms
    if (username === '' && password === '') {
      alert('Username and Password is required');
      return;
    }

    if (username === '') {
      alert('Username is required');
      return;
    }
    if (password === '') {
      alert('Password is required');
      return;
    }

    dispatch(
      loginUser({
        username,
        password,
      }),
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keep Connected</Text>
      <Text style={styles.subtitle}>
        Enter your username address and password to get access to your account
      </Text>
      <View style={styles.formWrapper}>
        <TextInput
          left={<TextInput.Icon name="email-outline" />}
          mode="outlined"
          label="Username"
          style={styles.emailInput}
          onChangeText={e => setUsername(e)}
          value={username}
        />
        <TextInput
          left={<TextInput.Icon name="lock-outline" />}
          mode="outlined"
          secureTextEntry
          label="Password"
          onChangeText={e => setPassword(e)}
          value={password}
        />
        <View style={styles.forgotWrapper}>
          <Text style={styles.forgotPwd}>Forgot Password?</Text>
        </View>
        <Button
          onPress={handleLogin}
          mode="contained"
          style={styles.mdRounded}
          contentStyle={styles.submitButton}>
          Log In
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
    paddingHorizontal: 36,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    marginTop: 45,
    color: colors.dark,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Roboto',
    color: colors.dark,
  },
  formWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 60,
  },
  emailInput: {
    marginBottom: 17,
  },
  submitButton: {
    textTransform: 'uppercase',
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  mdRounded: {
    borderRadius: 10,
    marginTop: 43,
  },
  forgotWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPwd: {
    fontSize: 13,
    fontFamily: 'Roboto',
    color: colors.dark,
    opacity: 0.8,
    marginTop: 10,
  },
});

export default LoginScreen;
