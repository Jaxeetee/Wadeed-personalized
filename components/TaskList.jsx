import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { getData } from '../sql/query'

const TaskList = (props) => {
  
  const test = getData();

  return (
    <ScrollView style={styles.scrollview}> 

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollview : {
    borderWidth: 1,
    borderRadius: 20,
  },

})

export default TaskList