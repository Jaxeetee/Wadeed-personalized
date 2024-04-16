
import React, { Suspense, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SQLiteProvider } from 'expo-sqlite/next';
import HomeScreen from './pages/HomeScreen';
import { loadDatabase } from './sql/query';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbLoaded, setDBLoaded] = useState(false);

  useEffect(()=>{
    loadDatabase()
      .then(() => setDBLoaded(true))
      .catch((err) => console.error(err));
  },[]);

  if (!dbLoaded)
  {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  return (
    <NavigationContainer style={{flex:1}}>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen 
        name='Home'
        component={HomeScreen}
        
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


