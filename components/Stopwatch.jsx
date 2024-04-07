import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native';

const Stopwatch = (props) => {
  const [timer, setTimer] = useState(0);

  const start = () => {

  }

  const stop = () => {

  }

  return (
    <View>
      <Text style={styles.subtitle}>Timer</Text>
      <Text style={styles.timer}>00:00:00</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: '800'
  },
  timer: {
    fontSize: 24,
  }
})

export default Stopwatch