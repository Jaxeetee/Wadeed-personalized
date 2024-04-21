import React from 'react'
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

const Loading = () => {
  return (
    <View style={{flex: 1}}>
      <ActivityIndicator size={'large'} />
    </View>
  )
}

export default Loading