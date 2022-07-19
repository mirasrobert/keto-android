import React from 'react';
import colors from '../../Colors';
import {TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SimpleButton = ({screen, buttonText, buttonColor, txtColor}) => {
  const navigation = useNavigation();

  const bgColor = buttonColor ? buttonColor : colors.primary;
  const textColor = txtColor ? txtColor : colors.white;

  return (
    <View>
      <TouchableOpacity
        style={{
          textTransform: 'uppercase',
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: bgColor,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate(screen)}>
        <Text style={{color: textColor}}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SimpleButton;
