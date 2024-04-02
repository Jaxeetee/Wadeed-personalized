import { StatusBar } from 'expo-status-bar';
import { useColorScheme, StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const theme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex:1,
      marginTop:30,
      backgroundColor: theme === 'light' ?  '#F4F4F4' : '#313131',
      justifyContent: 'center',
    },
  
    text: {
      color: theme === 'light' ? '#313131': '#D2D2D2',
      fontWeight: '800',
    },

    textInput :{
      backgroundColor: theme === 'light' ? '#F4F4F4' : '#313131',
      color: theme === 'light' ? '#313131': '#D2D2D2',
      height: 55, 
      padding:15, 
      paddingLeft: 20,
      margin: 15,
      fontSize:16,
      borderRadius: 50,
      elevation: 5
    },

    button: {
      backgroundColor: theme === 'light' ? '#F4F4F4' : '#313131',
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

    subtitle: {
      fontWeight: '800'
    },

    timerFont: {
      fontSize: 24,
    }

  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Good Morning!</Text>
        <StatusBar style="auto" />
      <Text style={styles.text}>2, April 2024</Text>
      <TextInput 
        style={styles.textInput}
        autoCapitalize='none'
        placeholder='What are you going to do?'
        
      />
      <View style={styles.timerRow}>
        <View>
          <Text style={styles.subtitle}>Time Started</Text>
          <Text style={styles.timerFont}>00:00:00</Text>
        </View>
        
        <Pressable style={styles.button} onPress={() => {console.log("hellow world")}}>
          <AntDesign name="caretright" size={40} color="black" />
        </Pressable> 
        <View>
          <Text style={styles.subtitle}>Timer</Text>
          <Text style={styles.timerFont}>00:00:00</Text>
        </View>
      </View>
    </View>
  );
}


