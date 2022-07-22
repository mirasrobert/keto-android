import React, {useState, useEffect} from 'react';
import colors from '../../../Colors';
import {StyleSheet, View, SafeAreaView, FlatList, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Global Redux State
import {useSelector, useDispatch} from 'react-redux';
import {
  getBloodSugarList,
  filterBloodSugarListByDate,
} from '../../../features/tabs/bloodSugarSlice';

import Container from '../../elements/Container';
import Header from '../../elements/Header';
import SimpleButton from '../../elements/SimpleButton';
import Loader from '../../elements/Loader';
import CardBloodSugar from '../../screen_components/CardBloodSugar';
import moment from 'moment';

const BloodSugarScreen = () => {
  const dispatch = useDispatch();

  const {bloodSugars: DATA, isLoading: bloodSugarIsLoading} = useSelector(
    state => state.bloodSugar,
  );

  useEffect(() => {
    dispatch(getBloodSugarList());
  }, []);

  // Dropdown Select
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'Today', value: 'Today'},
    {label: 'Yesterday', value: 'Yesterday'},
  ]);
  const [value, setValue] = useState(items[0].value);
  return (
    <Container>
      <Header title="Blood Sugar" />
      <View style={styles.buttonsContainer}>
        <SimpleButton screen="AddBloodSugarForm" buttonText="Add Record" />
        <View>
          {!bloodSugarIsLoading && (
            <DropDownPicker
              onSelectItem={item => {
                // Get today date by moment
                const today = moment().format('YYYY-MM-DD');
                // Get yesterdate date by mement
                const yesterday = moment()
                  .subtract(1, 'days')
                  .format('YYYY-MM-DD');

                if (item.value === 'Today') {
                  dispatch(filterBloodSugarListByDate({date: today}));
                } else if (item.value === 'Yesterday') {
                  dispatch(filterBloodSugarListByDate({date: yesterday}));
                } else {
                  dispatch(getBloodSugarList());
                }
              }}
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
          )}
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
              renderItem={({item}) => <CardBloodSugar item={item} />}
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

export default BloodSugarScreen;
