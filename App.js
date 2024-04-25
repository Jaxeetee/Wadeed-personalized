
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Suspense, useEffect, useState } from 'react';
import  Loading  from './components/Loading';
import HomeScreen from './pages/HomeScreen';
import { loadDatabase } from './sql/query';
import  { SQLiteProvider }  from 'expo-sqlite/next';

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
      <Loading />
    )
  }
  return (
    <NavigationContainer style={{flex:1}}>
      <Suspense fallback={<Loading />}>
        <SQLiteProvider databaseName='wadoo.db' useSuspense>
          <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen 
            name='Home'
            component={HomeScreen}
            />
          </Stack.Navigator>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
  );
}


