import React from 'react';
import {Text, View} from 'react-native';

const Badge = ({text, textColor, bgColor}) => {
  return (
    <View
      style={{
        width: 80,
        backgroundColor: bgColor,
        padding: 5,
        borderRadius: 25,
      }}>
      <Text style={{textAlign: 'center', color: textColor, fontSize: 10}}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;
