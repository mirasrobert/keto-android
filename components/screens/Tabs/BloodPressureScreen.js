import React, {useState} from 'react';
import colors from '../../../Colors';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Global Redux State
import {useDispatch} from 'react-redux';

import Container from '../../elements/Container';
import Header from '../../elements/Header';
import SimpleButton from '../../elements/SimpleButton';
import CardBloodPressure from '../../screen_components/CardBloodPressure';

const BloodPressureScreen = () => {
  const dispatch = useDispatch();

  const bloodSugar = [1, 2, 3, 4, 5, 6];

  // Dropdown Select
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('All');
  const [items, setItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'Today', value: 'Today'},
  ]);

  return (
    <Container>
      <Header title="Blood Pressure" />
      <View style={styles.buttonsContainer}>
        <SimpleButton screen="AddBloodPressureForm" buttonText="Add Record" />
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              width: 100,
            }}
          />
        </View>
      </View>

      <SafeAreaView style={styles.cardsRecord}>
        <ScrollView style={styles.cardsrecordScrollView}>
          {bloodSugar.map((item, index) => {
            return <CardBloodPressure key={index} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardsRecord: {
    backgroundColor: colors.bright,
    marginTop: 34,
  },
  cardsrecordScrollView: {
    backgroundColor: colors.bright,
    marginBottom: 100,
  },
});

export default BloodPressureScreen;
