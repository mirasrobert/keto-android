import React, {useState, useEffect} from 'react';
import colors from '../../Colors';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import Badge from '../elements/Badge';
import moment from 'moment-timezone';
import {Menu} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {deleteBloodSugar} from '../../features/tabs/bloodSugarSlice';

const CardBloodSugar = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Menu
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [borderColorTop, setBorderColorTop] = useState(colors.pink);
  const [badgeTxt, setBadgeTxt] = useState('Normal');
  const [badgeColor, setBadgeColor] = useState(colors.green);

  useEffect(() => {
    if (parseFloat(item.sugar_concentration) < 3.9) {
      // Low
      setBadgeTxt('Low');
      setBadgeColor(colors.yellow);
      setBorderColorTop(colors.yellow);
    } else if (parseFloat(item.sugar_concentration) < 5.6) {
      // Normal
      setBadgeTxt('Normal');
      setBadgeColor(colors.blue);
      setBorderColorTop(colors.green);
    } else {
      // High
      setBadgeTxt('High');
      setBadgeColor(colors.orange);
      setBorderColorTop(colors.pink);
    }
  }, []);

  return (
    <View style={styles.cardContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Card
            style={{
              backgroundColor: 'white',
              borderTopColor: borderColorTop,
              borderTopWidth: 1,
            }}
            elevation={1}
            onPress={openMenu}>
            <Card.Content style={styles.cardWrapper}>
              <View>
                <Paragraph style={styles.date}>
                  {moment(`${item.date} ${item.time}`).format('lll')}
                </Paragraph>
                <Paragraph style={styles.measured}>
                  Measured: {item.measured}
                </Paragraph>
                <Paragraph style={styles.notes}>
                  {item.notes && item.notes.length > 0 ? item.notes : ''}
                </Paragraph>
                <Badge
                  text={badgeTxt}
                  bgColor={badgeColor}
                  textColor={colors.white}
                />
              </View>
              <View>
                <Text style={styles.measurement}>
                  {item.sugar_concentration} mmol /L
                </Text>
              </View>
            </Card.Content>
          </Card>
        }>
        <Menu.Item
          onPress={() => {
            closeMenu();
            navigation.navigate('EditBloodSugarForm', {data: item});
          }}
          title="Edit"
        />
        <Menu.Item
          onPress={() => {
            Alert.alert(
              'Delete',
              'Are you sure you want to remove this record?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    closeMenu();
                  },
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => dispatch(deleteBloodSugar({id: item.id})),
                },
              ],
            );
          }}
          title="Delete"
        />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CardBloodSugar;
