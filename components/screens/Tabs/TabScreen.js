import React from 'react';
import colors from '../../../Colors';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

// Screens
import ChartScreen from './ChartScreen';
import BloodSugarScreen from './BloodSugarScreen';
import BloodPressureScreen from './BloodPressureScreen';
import WeightScreen from './WeightScreen';
import MedicationScreen from './MedicationScreen';
import PredictionScreen from './PredictionScreen';

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chart"
      labeled={true}
      shifting={false}
      activeColor={colors.primary}
      barStyle={{
        backgroundColor: colors.light,
        paddingTop: 13,
        paddingBottom: 14,
        borderTopColor: colors.light,
        borderTopWidth: 1,
        borderTopStartRadius: 20,
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <Tab.Screen
        name="Chart"
        component={ChartScreen}
        options={{
          tabBarLabel: 'Charts',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="chart-areaspline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BloodSugar"
        component={BloodSugarScreen}
        options={{
          tabBarLabel: 'Sugar',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="blood-bag" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="BloodPressure"
        component={BloodPressureScreen}
        options={{
          tabBarLabel: 'BP',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="heart-pulse"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Weight"
        component={WeightScreen}
        options={{
          tabBarLabel: 'Weight',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="weight-kilogram"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Medication"
        component={MedicationScreen}
        options={{
          tabBarLabel: 'Medication',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="pill" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Prediction"
        component={PredictionScreen}
        options={{
          tabBarLabel: 'Prediction',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="brain" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
