import { React, useState } from 'react';
import { StyleSheet, Pressable, Keyboard } from 'react-native';
import { getCurrentTime, getDateToday } from '../helpers/date-and-time';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { format } from 'date-fns';

import { submitData } from '../sql/query';

const PlayButton = (props) => {
	const[isPlaying, setIsPlaying] = useState(false);

	const onButtonClicked = async () =>
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
			
			await submitData({
				task_name: props.userInput,
				start_timestamp: props.startTimestamp,
				duration: props.duration,
				date_started: getDateToday()
			});

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