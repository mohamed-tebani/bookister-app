import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Tutorial = ({ navigation }) => {

  const onSkipTutorial = async () => {
    try {
      await AsyncStorage.setItem('hide_tutorial', true);
      navigation.navigate('home_1');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Bookister Tutorial</Text>
      <Button title="Skip" onPress={onSkipTutorial} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Tutorial;
