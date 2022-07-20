import React, {useState} from 'react';
import colors from '../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

import {useDispatch} from 'react-redux';
import {addBloodSugar} from '../../features/tabs/bloodSugarSlice';

import {showAlert} from '../helpers/helpers';

const AddBloodSugarForm = () => {
  const dispatch = useDispatch();

  // Dropdown Select
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Before breakfast', value: 'Before breakfast'},
    {label: 'After breakfast', value: 'After breakfast'},
    {label: 'Before lunch', value: 'Before lunch'},
    {label: 'After lunch', value: 'After lunch'},
    {label: 'Before dinner', value: 'Before dinner'},
    {label: 'After dinner', value: 'After dinner'},
    {label: 'Before bed', value: 'Before bed'},
    {label: 'After bed', value: 'After bed'},
  ]);

  const [value, setValue] = useState(items[0].value);

  const [formData, setFormData] = useState({
    sugar_concentration: '',
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
  const {sugar_concentration, date, time, notes} = formData;

  // Validations
  const validateDate = str => {
    const regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    return regex.test(str);
  };

  const handleAddRecord = () => {
    if (sugar_concentration === '' || date === '' || time === '') {
      showAlert('Error', 'Please fill all the fields');
      return;
    }

    if (!validateDate(date.trim())) {
      showAlert('Error', 'Please enter a valid date');
      return;
    }

    // Add Blood Sugar Record
    dispatch(
      addBloodSugar({
        sugar_concentration: sugar_concentration.trim(),
        measured: value,
        notes: notes.trim(),
        created_at: date.trim(),
      }),
    );

    // Reset Form
    setFormData({
      sugar_concentration: '',
      date: '',
      time: '',
      notes: '',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Blood Sugar</Text>
      <View style={styles.formWrapper}>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          label="Systolic Pressure"
          style={styles.inputStyle}
          onChangeText={e =>
            setFormData({
              ...formData,
              sugar_concentration: e,
            })
          }
          value={sugar_concentration}
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

export default AddBloodSugarForm;
