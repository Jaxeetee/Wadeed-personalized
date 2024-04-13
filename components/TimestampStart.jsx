import React, { useEffect, useState } from 'react'

import { StyleSheet, View, Text } from 'react-native';
import { getCurrentTime } from '../helpers/date-and-time'

const TimestampStart = (props) => {
    const [timestampText, setTimestampText] = useState('00:00 am');

    useEffect(() => {

        if (props.isPlayButtonActive)
        {
            setTimestampText(getCurrentTime());
        }
        else 
        {
            props.getTimestamp(timestampText);
            setTimestampText('00:00 am');
        }

    }, [props.isPlayButtonActive])
    return (
    <View>
        <Text style={styles.subtitle}>Time Started</Text>
        <Text style={styles.timer}>{timestampText}</Text>
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

export default TimestampStart