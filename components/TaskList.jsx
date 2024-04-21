import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import { fetchData } from '../sql/query'
import { useSQLiteContext } from 'expo-sqlite/next';

const TaskList = (props) => {

  const [taskList, setTaskList] = useState([]);
  
  useEffect(()=>{

    fetchData()
      .then(val => {setTaskList(val)});

  }, [props.getUpdate]);

  return (
    <ScrollView style={styles.scrollview}> 
      {console.log(taskList)}
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