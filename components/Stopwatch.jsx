import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

const Stopwatch = (props) => {
  const [timer, setTimer] = useState(0);

  const startTimer = () => {

  }

  const stopTimer = () => {

  }
  return (
    <View>
      <Text style={styles.subtitle}>Timer</Text>
      <Text style={styles.timerFont}>00:00:00</Text>
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