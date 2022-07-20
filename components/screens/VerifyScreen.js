import React, {useState, useEffect, useRef} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux';
import {verifyUser} from '../../features/auth/authSlice';
import Loader from '../elements/Loader';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu} from 'react-native-paper';
import {logoutUser} from '../../features/auth/authSlice';

import {useCountdown} from '../helpers/helpers';

const VerifyScreen = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

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
      }),
    );
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Timer

  const endTime = new Date().getTime() + 60000 * 1; // 1 minutes
  const [timeLeft, setEndTime] = useCountdown(endTime);

  const minutes = Math.floor(timeLeft / 60000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;

  const [isTimerStarted, setIsTimerStarted] = useState(false);

  const stopTimer = () => {
    setEndTime(0);
  };

  const resetTimer = () => {
    setEndTime(endTime);
  };

  const showTimer = () => {
    setIsTimerStarted(true);
  };

  useEffect(() => {
    setIsTimerStarted(false);
    stopTimer();

    return () => {
      resetTimer();
      stopTimer();
    };
  }, []);

  const handleResendOTP = () => {
    alert('OTP has been resent');
    showTimer();
    resetTimer();

    setTimeout(() => {
      setIsTimerStarted(false);
      stopTimer();
    }, 59000);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 45,
        }}>
        <Text style={styles.title}>Verify Email</Text>
        <View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <MaterialCommunityIcons
                onPress={openMenu}
                style={styles.icon}
                name="dots-vertical"
                size={30}
                color={colors.dark}
              />
            }>
            <Menu.Item onPress={handleLogout} title="Logout" />
          </Menu>
        </View>
      </View>
      <Text style={styles.subtitle}>
        Code is sent to your email. Please enter the code to verify your account
      </Text>
      <View style={styles.formWrapper}>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          label="Code"
          style={styles.emailInput}
          onChangeText={e => {
            setOtp(e.replace(/[^0-9]/g, ''));
          }}
          value={otp}
        />
        <View style={{marginBottom: 17}}>
          <Text style={styles.resend} numberOfLines={2}>
            Didn't receive the code?
          </Text>
          {!isTimerStarted ? (
            <Text
              onPress={handleResendOTP}
              style={{color: colors.blue, textAlign: 'center'}}
              numberOfLines={2}>
              Click here to resend
            </Text>
          ) : (
            <Text
              style={{color: colors.blue, textAlign: 'center'}}
              numberOfLines={2}>
              Please wait {`${minutes}:${seconds}`} to resend code again
            </Text>
          )}
        </View>
        <Button
          color={colors.primary}
          disabled={otp === '' || otp.length !== 6}
          onPress={handleVerify}
          mode="contained"
          style={styles.mdRounded}
          contentStyle={styles.submitButton}>
          Verify Account
        </Button>
        {/* <Button
          color={colors.primary}
          onPress={stopTimer}
          mode="contained"
          style={styles.mdRounded}
          contentStyle={styles.submitButton}>
          STOP TIMER
        </Button> */}
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
    fontSize: 15,
    fontFamily: 'Roboto',
    color: colors.dark,
    opacity: 0.8,
    textAlign: 'center',
  },
});

export default VerifyScreen;
