import React, {useState} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../features/auth/authSlice';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState();

  const dispatch = useDispatch();

  const onChangeDate = (e, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      1 +
      '-' +
      tempDate.getMonth() +
      '-' +
      tempDate.getDate();
    setDateOfBirth(fDate);
  };

  const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  const handleRegister = async () => {
    if (email === '' || name === '' || password === '' || dateOfBirth === '') {
      alert('All fields are required');
      return;
    }

    if (validateEmail(email.trim())) {
      dispatch(
        registerUser({
          email: email.trim(),
          name: name.trim(),
          birthday: dateOfBirth.trim(),
          password: password.trim(),
        }),
      );
    } else {
      alert('Invalid email');
      return;
    }
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
          value={name}
          onChangeText={e => setName(e)}
        />
        <TextInput
          left={<TextInput.Icon name="email-outline" />}
          mode="outlined"
          label="Email"
          style={styles.emailInput}
          value={email}
          onChangeText={e => setEmail(e)}
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
          value={password}
          onChangeText={e => setPassword(e)}
        />

        <Button
          onPress={handleRegister}
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
