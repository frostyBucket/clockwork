import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const ITEM_HEIGHT = 45;

export default function AMPM() {
  const [value, setValue] = useState('AM');

  return (
    <View style={styles.container}>
      {/* Highlight */}
      <View
        style={[
          styles.highlight,
          { top: value === 'AM' ? 0 : ITEM_HEIGHT / 2 },
        ]}
      />

      {/* AM */}
      <Pressable
        style={styles.subItem}
        onPress={() => setValue('AM')}
      >
        <Text
          style={[
            styles.text,
            value === 'AM' && styles.activeText,
          ]}
        >
          AM
        </Text>
      </Pressable>

      {/* PM */}
      <Pressable
        style={styles.subItem}
        onPress={() => setValue('PM')}
      >
        <Text
          style={[
            styles.text,
            value === 'PM' && styles.activeText,
          ]}
        >
          PM
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    height: ITEM_HEIGHT,
    width: 60,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  highlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: ITEM_HEIGHT / 2,
    backgroundColor: '#00ffea',
    borderRadius: 8,
  },

  subItem: {
    height: ITEM_HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  text: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
    fontWeight: '600',
  },

  activeText: {
    color: 'black',
    fontWeight: '800',
  },
});
