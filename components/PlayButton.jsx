import { React, useState } from 'react';
import { StyleSheet, Pressable, Keyboard } from 'react-native';
import { getCurrentTime } from '../helpers/date-and-time';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const PlayButton = (props) => {
	const[isPlaying, setIsPlaying] = useState(false);



	function onButtonClicked()
	{
		if (!isPlaying && props.userInput)
		{
			props.setButtonActive(true);
			Keyboard.dismiss();
			setIsPlaying(true);
		}
		else if (isPlaying)
		{
			props.setButtonActive(false);
			//make it submit to the list
			props.updateUserInput(null);
			setIsPlaying(false);
		}
	}

	return (
		<Pressable style={styles.play} onPress={onButtonClicked}>
			{
				isPlaying ? 
						<FontAwesome5 name="stop" size={24.5} color="#DA0000" />:
						<AntDesign name="caretright" size={24} color={`${props.userInput ? '#313131' : "#828282"}`} />
			}
		</Pressable> 
	)
}

const styles = StyleSheet.create({
	play: {
			backgroundColor: '#F4F4F4',
			padding:20,
			borderRadius:40,
			elevation: 5,
	}
})

export default PlayButton