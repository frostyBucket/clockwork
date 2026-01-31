import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ITEM_HEIGHT = 45;

export default function NumberScroller({ value, onChange, min, max}) {
  const numbers = Array.from(
    { length: max - min + 1 },
    (_, i) => i + min
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={numbers}
        keyExtractor={(item) => item.toString().padStart(2, '0')}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="normal"
        contentContainerStyle={{
          paddingVertical: 0,
        }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.y / ITEM_HEIGHT
          );
          console.log("Index: "+index);
          onChange(numbers[index]);
        }}
        
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.toString().padStart(2, '0')}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    width: 60,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
});
