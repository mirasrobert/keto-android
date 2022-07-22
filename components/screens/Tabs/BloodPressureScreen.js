import React, {useState, useEffect} from 'react';
import colors from '../../../Colors';
import {StyleSheet, View, SafeAreaView, FlatList, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Global Redux State
import {useSelector, useDispatch} from 'react-redux';
import {getBloodPressureList} from '../../../features/tabs/bloodPressureSlice';

import Container from '../../elements/Container';
import Header from '../../elements/Header';
import SimpleButton from '../../elements/SimpleButton';
import Loader from '../../elements/Loader';
import CardBloodPressure from '../../screen_components/CardBloodPressure';

const BloodPressureScreen = () => {
  const dispatch = useDispatch();

  const {bloodPressureList: DATA, isLoading: bloodSugarIsLoading} = useSelector(
    state => state.bloodPressure,
  );

  useEffect(() => {
    dispatch(getBloodPressureList());
  }, []);

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
        <View style={styles.cardsrecordScrollView}>
          {bloodSugarIsLoading ? (
            <Loader />
          ) : DATA.length == 0 ? (
            <Text
              style={{textAlign: 'center', color: colors.dark, opacity: 0.6}}>
              There are no data to shown.
            </Text>
          ) : (
            <FlatList
              data={DATA}
              renderItem={({item}) => <CardBloodPressure item={item} />}
              keyExtractor={item => item.id}
            />
          )}
        </View>
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
