import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const TaskCard = (props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.displayTask}>{props.task}</Text>
      <View style={styles.displayTimeOutput}>
        <Text>{props.timestampStart}</Text>
        <Text>{props.duration}</Text>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 5,
    borderBottomWidth: 1,
    borderBlockColor: 'black'
  },
  title: {
    fontSize: 16,
    fontWeight: '800', 
  },
  time: {
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default TaskCard