import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomButton from '@/components/customButton';
import TaskWidget from '@/components/taskWidget';


export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.fab}>
      <CustomButton onPress={() => setIsOpen(true)} title="+" width={60} height={60}/>
    </View>
    <TaskWidget
    visible={isOpen}
    onClose={() => setIsOpen(false)}
    />
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