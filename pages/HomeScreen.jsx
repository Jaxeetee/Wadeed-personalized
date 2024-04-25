import { React, useState } from 'react';

import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { getDateToday, getGreeting } from '../helpers/date-and-time';
import PlayButton from '../components/PlayButton';
import Stopwatch from '../components/Stopwatch';
import TimestampStart from '../components/TimestampStart';
import TaskList from '../components/TaskList';
import { useSQLiteContext } from 'expo-sqlite/next';

const HomeScreen = () => {
  const [isPlayButtonActive, setIsPlayButtonActive] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [startTimestamp, setStartTimestamp] = useState(null);
  const [duration, setDuration] = useState(null);
	const db = useSQLiteContext();
  
  const updateUserInput = (newInput) => {
    setUserInput(newInput);
  }

  const updateStartTask = (setStartTaskState) => {
    setIsPlayButtonActive(setStartTaskState);
  };

  const updateStartTimestamp = (timestamp) => {
    setStartTimestamp(timestamp);
  };

  const updateDuration = (newDuration) => {
    setDuration(newDuration);
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>Good {getGreeting()}!</Text>    
      <Text style={{fontSize:24}}>{getDateToday()}</Text>
      <TaskList 
        getUpdate={isPlayButtonActive}
      />
      <TextInput 
        style={styles.textInput}
        autoCapitalize='none'
        placeholder='What are you going to do?'
        onChangeText={updateUserInput}
        value={userInput}
      />
      <View style={styles.timerRow}>
        <TimestampStart
          isPlayButtonActive = {isPlayButtonActive}
          getTimestamp = {updateStartTimestamp}
        />
        <PlayButton 
          setButtonActive = {updateStartTask}
          updateUserInput = {updateUserInput}
          userInput = {userInput}
          startTimestamp ={startTimestamp}
          duration = {duration}
        />
        <Stopwatch 
          isPlayButtonActive = {isPlayButtonActive}
          getDuration = {updateDuration}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:20,
    marginTop: 50,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
  },

  text: {
    color: '#313131',
    fontWeight: '800', 
  },

  textdate: {
    fontWeight: '800',
    fontSize: 24,
  },

  textInput :{
    backgroundColor: '#F4F4F4',
    color: '#313131',
    height: 55, 
    padding:15, 
    paddingLeft: 20,
    marginTop: 15,
    fontSize:16,
    borderRadius: 50,
    elevation: 5
  },

  textContent: {
    justifyContent: 'center',
    alignContent: 'center',
  },


  button: {
    backgroundColor: '#F4F4F4',
    padding:20,
    borderRadius:40,
    elevation: 5,
  },

  timerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap:30,
    padding: 20
  },

});

export default HomeScreen