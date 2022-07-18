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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading} = useSelector(state => state.auth);

  const showAlert = (title, msg) => {
    Alert.alert(title, msg, [
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };

  const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  const handleLogin = e => {
    // Validate Forms
    if (email === '' && password === '') {
      showAlert('Error', 'Please fill all fields');
      return;
    }

    if (email === '') {
      showAlert('Error', 'Please fill in email');
      return;
    }
    if (password === '') {
      showAlert('Error', 'Please fill in password');
      return;
    }

    if (validateEmail(email.trim())) {
      dispatch(
        loginUser({
          data: {
            email: email.trim(),
            password: password.trim(),
          },
          alert: Alert,
        }),
      );
    } else {
      showAlert('Error', 'Please enter a valid email');
      return;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Keep Connected</Text>
      <Text style={styles.subtitle}>
        Enter your email address and password to get access to your account
      </Text>
      <View style={styles.formWrapper}>
        <TextInput
          left={<TextInput.Icon name="email-outline" />}
          mode="outlined"
          label="Email Address"
          style={styles.emailInput}
          onChangeText={e => setEmail(e)}
          value={email}
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
