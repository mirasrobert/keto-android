import React, {useState, useEffect} from 'react';
import colors from '../../Colors';
import {View, StyleSheet, Text} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import Badge from '../elements/Badge';
import moment from 'moment-timezone';

const CardBloodPressure = ({item, borderTopColor}) => {
  const borderColorTop = borderTopColor ? borderTopColor : colors.pink;

  const [badgeTxt, setBadgeTxt] = useState('Normal');
  const [badgeColor, setBadgeColor] = useState(colors.green);

  useEffect(() => {
    if (
      parseInt(item.systolic_pressure) <= 90 &&
      parseInt(item.diastolic_pressure) <= 60
    ) {
      setBadgeTxt('Low');
      setBadgeColor(colors.yellow);
    } else if (
      parseInt(item.systolic_pressure) <= 120 &&
      parseInt(item.diastolic_pressure) <= 80
    ) {
      setBadgeTxt('Normal');
      setBadgeColor(colors.blue);
    } else {
      setBadgeTxt('High');
      setBadgeColor(colors.orange);
    }
  }, []);

  return (
    <View style={styles.cardContainer}>
      <Card
        style={{
          backgroundColor: 'white',
          borderTopColor: borderColorTop,
          borderTopWidth: 1,
        }}
        elevation={1}
        onPress={() => {
          alert('Card Pressed');
        }}>
        <Card.Content style={styles.cardWrapper}>
          <View>
            <Paragraph style={styles.date}>
              {moment(`${item.date} ${item.time}`).format('lll')}
            </Paragraph>
            <Paragraph style={styles.measured}>Arm: {item.arm}</Paragraph>
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
              {item.systolic_pressure} / {item.diastolic_pressure} mm Hg
            </Text>
          </View>
        </Card.Content>
      </Card>
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

export default CardBloodPressure;
