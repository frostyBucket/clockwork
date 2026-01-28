import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '@/components/customButton';


export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Example usage with specific dimensions */}
      <CustomButton onPress={() => console.log("Pressed Large")} title="Large Button" width={200} height={60} />
      {/* Example usage with percentage width */}
      <View style={{ width: '80%', marginTop: 20 }}>
        <CustomButton onPress={() => console.log("Pressed Full Width")} title="Full Width" width={'100%'} height={50} />
      </View>
    </View>
  );
}