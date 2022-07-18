import React, {useState, useEffect} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {verifyUser} from '../../features/auth/authSlice';
import Loader from '../elements/Loader';

const VerifyScreen = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');

  const {isLoading} = useSelector(state => state.auth);

  const handleVerify = () => {
    if (otp === '') {
      alert('OTP is required');
      return;
    }

    if (otp.length !== 6) {
      alert('OTP must be 6 digits');
      return;
    }

    dispatch(
      verifyUser({
        verification_otp: otp.trim(),
        alert: Alert,
      }),
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Email</Text>
      <Text style={styles.subtitle}>
        Code is sent to your email. Please enter the code to verify your account
      </Text>
      <View style={styles.formWrapper}>
        <TextInput
          mode="outlined"
          label="Code"
          style={styles.emailInput}
          onChangeText={e => {
            setOtp(e.replace(/[^0-9]/g, ''));
          }}
          value={otp}
        />
        <Text style={styles.resend}>
          Didn't receive code? Click here to resend
        </Text>
        <Button
          color={colors.primary}
          disabled={otp === '' || otp.length !== 6}
          onPress={handleVerify}
          mode="contained"
          style={styles.mdRounded}
          contentStyle={styles.submitButton}>
          Verify Account
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
  resend: {
    fontSize: 13,
    fontFamily: 'Roboto',
    color: colors.dark,
    opacity: 0.8,
    marginBottom: 17,
    textAlign: 'center',
  },
});

export default VerifyScreen;
