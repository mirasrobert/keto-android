import React, {useState} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState();

  const onChangeDate = (e, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      '/' +
      tempDate.getDate() +
      '/' +
      tempDate.getFullYear();
    setDateOfBirth(fDate);
  };

  const handleRegister = async () => {
    const token = await AsyncStorage.getItem('token');

    console.log('Token: ', token);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>
        Enter your credentials to create your account and get started.
      </Text>
      <View style={styles.formWrapper}>
        <TextInput
          left={<TextInput.Icon name="account-circle-outline" />}
          mode="outlined"
          label="Full Name"
          style={styles.emailInput}
        />
        <TextInput
          left={<TextInput.Icon name="email-outline" />}
          mode="outlined"
          label="Email"
          style={styles.emailInput}
        />
        <TextInput
          left={<TextInput.Icon name="calendar" />}
          mode="outlined"
          label="Date Of Birth"
          onPressOut={() => {
            setShow(true);
          }}
          value={dateOfBirth}
          style={styles.emailInput}
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        <TextInput
          left={<TextInput.Icon name="lock-outline" />}
          mode="outlined"
          secureTextEntry
          label="Password"
          style={styles.emailInput}
        />

        <Button
          onPress={() => {
            handleRegister();
          }}
          mode="contained"
          style={styles.mdRounded}
          contentStyle={styles.submitButton}>
          Register Now
        </Button>
        <Text style={styles.terms}>
          By creating an account, you agree to our Terms and Conditions and
          agree to Privacy Policy
        </Text>
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
    marginBottom: 23,
  },
  submitButton: {
    textTransform: 'uppercase',
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  mdRounded: {
    borderRadius: 10,
    marginBottom: 23,
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
  terms: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Roboto',
    color: colors.dark,
  },
});

export default RegisterScreen;
