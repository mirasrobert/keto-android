import React from 'react';
import colors from '../../Colors';
import {View, StyleSheet, Text} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import Badge from '../elements/Badge';

const CardBloodSugar = () => {
  return (
    <View style={styles.cardContainer}>
      <Card
        style={{
          backgroundColor: 'white',
          borderTopColor: colors.pink,
          borderTopWidth: 1,
        }}
        elevation={1}
        onPress={() => {
          alert('Card Pressed');
        }}>
        <Card.Content style={styles.cardWrapper}>
          <View>
            <Paragraph style={styles.date}>Feb 13, 2022 05:18 PM</Paragraph>
            <Paragraph style={styles.measured}>Measured: After lunch</Paragraph>
            <Paragraph style={styles.notes}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
              possimus ex recusandae.
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
