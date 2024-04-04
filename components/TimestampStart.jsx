import React from 'react'

import { StyleSheet } from 'react-native';

const TimestampStart = (props) => {
    const [timestampText, setTimestampText] = useState('00:00 am');

    const updateTimestamp = (newTimestamp) => {
        setTimestampText(newTimestamp);
      
    }
    return (
    <View>
        <Text style={styles.subtitle}>Time Started</Text>
        <Text style={styles.timerFont}>{timestampText}</Text>
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