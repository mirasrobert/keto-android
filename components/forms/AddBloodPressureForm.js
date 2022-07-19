import React, {useState} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {showAlert} from '../helpers/helpers';

const AddBloodPressureForm = () => {
  const [formData, setFormData] = useState({
    systolic_pressure: '',
    diastolic_pressure: '',
    date: '',
    time: '',
    notes: '',
  });

  const [dateTime, setDateTime] = useState(new Date());

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChangeDate = (e, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || date;
    setDateTime(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      1 +
      '-' +
      tempDate.getMonth() +
      '-' +
      tempDate.getDate();

    // Get the AM and PM
    let ampm = 'AM';
    let hours = tempDate.getHours();
    if (hours >= 12) {
      ampm = 'PM';
    }
    if (hours > 12) {
      hours -= 12;
    }
    if (hours === 0) {
      hours = 12;
    }

    let fTime = tempDate.getHours() + ':' + tempDate.getMinutes() + ' ' + ampm;
    setFormData({...formData, date: fDate, time: fTime}); // update the state with the new date & time
  };

  // Desctructuring formData
  const {systolic_pressure, diastolic_pressure, date, time, notes} = formData;

  // Validations
  const validateDate = str => {
    const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    return regex.test(str);
  };

  const handleAddRecord = () => {
    if (
      systolic_pressure === '' ||
      diastolic_pressure === '' ||
      date === '' ||
      time === ''
    ) {
      showAlert('Error', 'Please fill all the fields');
      return;
    }

    if (!validateDate(date.trim())) {
      showAlert('Error', 'Please enter a valid date');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Blood Pressure</Text>
      <View style={styles.formWrapper}>
        <TextInput
          mode="outlined"
          label="Systolic Pressure"
          style={styles.inputStyle}
          onChangeText={e =>
            setFormData({
              ...formData,
              systolic_pressure: e.replace(/[^0-9]/g, ''),
            })
          }
          value={systolic_pressure}
        />
        <TextInput
          mode="outlined"
          label="Diastolic Pressure"
          style={styles.inputStyle}
          onChangeText={e =>
            setFormData({
              ...formData,
              diastolic_pressure: e.replace(/[^0-9]/g, ''),
            })
          }
          value={diastolic_pressure}
        />
        <View style={styles.dateWrapper}>
          <View style={styles.dateInput}>
            <TextInput
              mode="outlined"
              label="Date"
              onPressIn={() => {
                setMode('date');
                setShow(true);
              }}
              onChangeText={e => setFormData({...formData, date: e})}
              value={date}
              readonly={true}
            />
          </View>
          <View style={styles.timeInput}>
            <TextInput
              mode="outlined"
              label="Time"
              placeholder="24 hour format"
              onPressIn={() => {
                setMode('time');
                setShow(true);
              }}
              onChangeText={e => setFormData({...formData, time: e})}
              value={time}
            />
          </View>
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTime}
            mode={mode}
            display="default"
            is24Hour={true}
            onChange={onChangeDate}
          />
        )}

        <TextInput
          mode="outlined"
          label="Notes"
          multiline
          style={styles.inputStyle}
          onChangeText={e => setFormData({...formData, notes: e})}
          value={notes}
        />
        <Button
          onPress={handleAddRecord}
          mode="contained"
          style={styles.mdRounded}
          contentStyle={styles.submitButton}>
          Add Record
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
  formWrapper: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 60,
  },
  inputStyle: {
    marginBottom: 21,
  },
  submitButton: {
    textTransform: 'uppercase',
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  mdRounded: {
    borderRadius: 10,
    marginTop: 23,
  },
  dateWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 21,
  },
  dateInput: {
    width: '57%',
    marginRight: '3%',
  },
  timeInput: {
    width: '40%',
  },
});

export default AddBloodPressureForm;
