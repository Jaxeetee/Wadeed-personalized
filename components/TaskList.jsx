import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'

// import { fetchData } from '../sql/query'
import { useSQLiteContext } from 'expo-sqlite/next';

const TaskList = (props) => {

  const [taskList, setTaskList] = useState([]);
  
	const db = useSQLiteContext();

  // const fetchData = async () =>
  // {
  //   

  //   const doneTasks = await db.getAllSync(query);
  //   setTaskList(doneTasks);
  //   try
  //   {
  //     const results = await db.getAllAsync(query);
  //     return results;
  //   }
  //   catch(err)
  //   {
  //     console.error(`could not fetch data: ${err}`);
  //     return [];
  //   }
  // }

  useEffect(()=>{
    if (!props.getUpdate)
    {
      const query = `
        SELECT * FROM tasks
          WHERE DATE();
      `;
      const doneTasks = db.getAllSync(query);
      setTaskList(doneTasks);
    }

    console.log(`getUpdate: ${props.getUpdate}`)
  }, [props.getUpdate]);

  return (
    <ScrollView style={styles.scrollview}> 
    {console.info(taskList)}
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