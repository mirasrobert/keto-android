import React, {useState} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment-timezone';

import {useDispatch} from 'react-redux';
import {editBloodPressure} from '../../features/tabs/bloodPressureSlice';

import {showAlert} from '../helpers/helpers';

const EditBloodPressureForm = ({route, navigation}) => {
  const {data} = route.params; // Data

  const dispatch = useDispatch();

  // Dropdown Select
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Left arm', value: 'Left'},
    {label: 'Right arm', value: 'Right'},
  ]);

  const [value, setValue] = useState(items[0].value);

  const [formData, setFormData] = useState({
    systolic_pressure: data.systolic_pressure || '',
    diastolic_pressure: data.diastolic_pressure || '',
    notes: data.notes || '',
  });

  const dataTime = moment(data.time, 'hh:mm:ss').format('LT');
  const [date, setDate] = useState(moment(data.date).format('YYYY-MM-DD'));
  const [time, setTime] = useState(dataTime);
  const [covert12HRTo24HR, setCovert12HRTo24HR] = useState(
    moment(dataTime, 'hh:mm A').tz('Asia/Manila').format('HH:mm'),
  );

  const [dateTime, setDateTime] = useState(
    moment(`${data.date} ${data.time}`).toDate(),
  );

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChangeDate = (e, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate || dateTime; // Date time object
    setDateTime(currentDate); // Set the date value of the calendar

    let fDate = moment(new Date(currentDate))
      .tz('Asia/Manila')
      .format('YYYY-MM-DD'); // Format the date to YYYY-MM-DD String
    let fTime = moment(new Date(currentDate))
      .tz('Asia/Manila')
      .format('hh:mm A');
    setDate(fDate); // Set the date on the form
    setTime(fTime); // Set the time on the form

    converted24HTime = moment(fTime, 'hh:mm A')
      .tz('Asia/Manila')
      .format('HH:mm');
    setCovert12HRTo24HR(converted24HTime);
  };

  // Desctructuring formData
  const {systolic_pressure, diastolic_pressure, notes} = formData;

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

    const timeToSaved = `${covert12HRTo24HR}:01`;

    // Add Blood Sugar Record
    dispatch(
      editBloodPressure({
        id: data.id,
        form: {
          systolic_pressure: systolic_pressure.trim(),
          diastolic_pressure: diastolic_pressure.trim(),
          arm: value,
          notes: notes.trim(),
          date: date,
          time: timeToSaved,
        },
      }),
    );

    // Reset Form
    setFormData({
      systolic_pressure: '',
      diastolic_pressure: '',
      notes: '',
    });

    // Go Back
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Blood Pressure</Text>
      <View style={styles.formWrapper}>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          label="Sugar Concentration"
          style={styles.inputStyle}
          onChangeText={e =>
            setFormData({
              ...formData,
              systolic_pressure: e,
            })
          }
          value={systolic_pressure}
        />
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          label="Diastolic Pressure"
          style={styles.inputStyle}
          onChangeText={e =>
            setFormData({
              ...formData,
              diastolic_pressure: e,
            })
          }
          value={diastolic_pressure}
        />
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{
            width: '100%',
            marginBottom: 21,
          }}
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
            is24Hour={false}
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
          Update Record
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

export default EditBloodPressureForm;
