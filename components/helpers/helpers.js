import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
export const showAlert = (title, msg) => {
  Alert.alert(title, msg, [
    {
      text: 'OK',
      onPress: () => {},
    },
  ]);
};

const calcTimeLeft = t => {
  if (!t) return 0;

  const left = t - new Date().getTime();

  if (left < 0) return 0;

  return left;
};

export function useCountdown(endTime) {
  const [end, setEndTime] = useState(endTime);
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(end));

  useEffect(() => {
    setTimeLeft(calcTimeLeft(end));

    const timer = setInterval(() => {
      const targetLeft = calcTimeLeft(end);
      setTimeLeft(targetLeft);

      if (targetLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [end]);

  return [timeLeft, setEndTime];
}
