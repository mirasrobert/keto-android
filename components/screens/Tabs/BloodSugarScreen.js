import React from 'react';
import colors from '../../../Colors';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Picker,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Badge from '../../elements/Badge';

import {Card, Paragraph} from 'react-native-paper';

const BloodSugarScreen = () => {
  const bloodSugar = [1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>Blood Sugar</Text>
        </View>
        <View>
          <MaterialCommunityIcons
            onPress={() => {
              alert('Icon Pressed');
            }}
            style={styles.icon}
            name="dots-vertical"
            size={30}
            color={colors.dark}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View>
          <TouchableOpacity
            style={styles.addRecordButton}
            onPress={() => alert('Add Record')}>
            <Text style={styles.addRecordButtonTxt}>Add Record</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Dropdown</Text>
        </View>
      </View>

      <SafeAreaView style={styles.cardsRecord}>
        <ScrollView style={styles.cardsrecordScrollView}>
          {bloodSugar.map((item, index) => {
            return (
              <View style={styles.cardContainer} key={item}>
                <Card
                  style={{backgroundColor: 'white'}}
                  elevation={1}
                  onPress={() => {
                    alert('Card Pressed');
                  }}>
                  <Card.Content style={styles.cardWrapper}>
                    <View>
                      <Paragraph style={styles.date}>
                        Feb 13, 2022 05:18 PM
                      </Paragraph>
                      <Paragraph style={styles.measured}>
                        Measured: After lunch
                      </Paragraph>
                      <Paragraph style={styles.notes}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Ratione possimus ex recusandae.
                      </Paragraph>
                      <Badge
                        text="Normal"
                        bgColor={colors.blue}
                        textColor={colors.white}
                      />
                    </View>
                    <View>
                      <Text style={styles.measurement}>5.6 mmol /L</Text>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.bright,
    paddingHorizontal: 36,
    paddingTop: 28,
  },
  titleContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 22,
    alignItems: 'center',
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: colors.dark,
  },
  icon: {
    margin: 0,
  },
  addRecordButton: {
    textTransform: 'uppercase',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  addRecordButtonTxt: {
    color: colors.white,
  },
  cardsRecord: {
    backgroundColor: colors.bright,
    marginTop: 34,
  },
  date: {
    color: colors.dark,
    fontFamily: 'Roboto',
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 4,
  },
  measured: {
    color: colors.dark,
    fontFamily: 'Roboto',
    fontSize: 13,
    marginBottom: 6,
  },
  notes: {
    color: colors.dark,
    fontFamily: 'Roboto',
    fontSize: 10,
    marginBottom: 6,
    width: 190,
  },
  measurement: {
    color: colors.dark,
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: colors.bright,
    marginBottom: 28,
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  cardsrecordScrollView: {
    backgroundColor: colors.bright,
    marginBottom: 100,
  },
});

export default BloodSugarScreen;
