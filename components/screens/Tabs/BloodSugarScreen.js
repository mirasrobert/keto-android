import React, {useState, useEffect} from 'react';
import colors from '../../../Colors';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

// Global Redux State
import {useSelector, useDispatch} from 'react-redux';
import {getBloodSugarList} from '../../../features/tabs/bloodSugarSlice';

import Container from '../../elements/Container';
import Header from '../../elements/Header';
import SimpleButton from '../../elements/SimpleButton';
import Loader from '../../elements/Loader';
import CardBloodSugar from '../../screen_components/CardBloodSugar';

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
        <View style={styles.cardsrecordScrollView}>
          {bloodSugarIsLoading ? (
            <Loader />
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
