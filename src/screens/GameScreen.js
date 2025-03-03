import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function GameScreen() {
  return (
    <View style={styles.container}>
      {/* Game content will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
});
