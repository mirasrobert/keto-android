import React, {useState} from 'react';
import colors from '../../../Colors';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// Global Redux State
import {useDispatch} from 'react-redux';

import Container from '../../elements/Container';
import Header from '../../elements/Header';
import SimpleButton from '../../elements/SimpleButton';
import CardBloodSugar from '../../screen_components/CardBloodSugar';

const BloodSugarScreen = () => {
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
      <Header title="Blood Sugar" />
      <View style={styles.buttonsContainer}>
        <SimpleButton screen="AddBloodSugarForm" buttonText="Add Record" />
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
            return <CardBloodSugar key={index} />;
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

export default BloodSugarScreen;
