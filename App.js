import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              title: 'Sudoku Master Elite'
            }}
          />
          <Stack.Screen 
            name="Game" 
            component={GameScreen}
            options={{
              title: 'Play Sudoku'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
