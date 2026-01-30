import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '@/components/customButton';
import TaskWidget from '@/components/taskWidget';


export default function App() {
  const [TaskWidget, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      {/* Example usage with specific dimensions */}
      <View style={styles.fab}>
      <CustomButton onPress={() => setVisible(false)} title="+" width={60} height={60}/>
    </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040014ff",
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 40,
  },
});