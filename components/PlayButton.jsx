import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, Pressable } from 'react-native';
import { getCurrentTime } from '../helpers/date-and-time';

const PlayButton = (props) => {

    function onButtonClicked()
    {
        console.log("Played");
        props.setTimestamp(getCurrentTime());
    }

  return (
    <Pressable style={buttonStyle.play} onPress={onButtonClicked}>
        <AntDesign name="caretright" size={40} color="black" />
    </Pressable> 
  )
}

const buttonStyle = StyleSheet.create({
    play: {
        backgroundColor: '#F4F4F4',
        padding:20,
        borderRadius:40,
        elevation: 5,
    }
})

export default PlayButton