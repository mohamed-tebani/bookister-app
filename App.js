import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Tutorial from './src/components/Tutorial';
import AsyncStorage from '@react-native-async-storage/async-storage'

console.reportErrorsAsExceptions = false;

const Stack = createNativeStackNavigator();


const App = () => {
  const [hideTutorial, setHideTutorial] = useState(false);

  const readHideTutorial = async () => {
    try {
      const value = await AsyncStorage.getItem('hide_tutorial');
      setHideTutorial(value === 'true');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    readHideTutorial();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!hideTutorial ? <Stack.Screen name="tutorial" component={Tutorial} /> : null}
        <Stack.Screen name="home_1" component={MainHome} options={{ title: 'Main Home', headerShown: false }} />
        <Stack.Screen name="home_2" component={SecondHome} options={{ title: 'Second Home' }} />
        <Stack.Screen name="home_3" component={ThirdHome} options={{ title: 'Third Home' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const MainHome = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Bookister App</Text>
      </View>
      <Button title="Go to Second Home"
        onPress={() => navigation.navigate('home_2')} />
      <Button title="Go to Third Home"
        onPress={() => navigation.navigate('home_3')} />
    </View>
  );
}

const SecondHome = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Second Home</Text>
      <Button title="Return to Main Home"
        onPress={() => navigation.navigate('home_1')} />
      <Button title="Go to Third Home"
        onPress={() => navigation.navigate('home_3')} />
    </View>
  );
}

const ThirdHome = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>Third Home</Text>
      <Button title="Return to Main Home"
        onPress={() => navigation.navigate('home_1')} />
      <Button title="Go to Second Home"
        onPress={() => navigation.navigate('home_2')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
});

export default App;