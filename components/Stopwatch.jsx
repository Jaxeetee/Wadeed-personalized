import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native';

import { formatTime } from '../helpers/date-and-time';

const Stopwatch = (props) => {
  const [timer, setTimer] = useState(0);
  const timeIntervalRef = useRef(null);

  const start = () => {
    timeIntervalRef.current = setInterval(() => {
      setTimer((currentTime) => currentTime + 1);
    }, 1000);
  };

  const stop = () => {
    setTimer(0);
    clearInterval(timeIntervalRef.current);
  };
  

  useEffect(() => {
    if (props.isPlayButtonActive)
    {
      start();
      
    } 
    else 
    {
      props.getDuration(formatTime(timer));
      stop();
    }

  }, [props.isPlayButtonActive])

  return (
    <View>
      <Text style={styles.titleText}>Timer</Text>
      <Text style={styles.timerValText}>{formatTime(timer)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: '800'
  },
  timerValText: {
    fontSize: 24,
  }
})

export default Stopwatch