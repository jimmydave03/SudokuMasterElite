import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface AdBannerProps {
  position: 'top' | 'bottom';
}

export const AdBanner: React.FC<AdBannerProps> = ({ position }) => {
  // Only show in development mode
  if (!__DEV__) {
    return null;
  }

  return (
    <View style={[styles.container, position === 'top' ? styles.topBanner : styles.bottomBanner]}>
      <Text style={styles.text}>Ad Banner Placeholder</Text>
      <Text style={styles.subText}>(Only visible in development)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#9e9e9e',
  },
  topBanner: {
    marginBottom: 10,
  },
  bottomBanner: {
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
  subText: {
    fontSize: 12,
    color: '#9e9e9e',
  },
});
