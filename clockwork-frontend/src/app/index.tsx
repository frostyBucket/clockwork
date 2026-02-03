import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from '@/components/customButton';
import TaskWidget from '@/components/taskWidget';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('tasks');
      const parsed = stored ? JSON.parse(stored) : [];
      setTasks(parsed);
    } catch (err) {
      console.error('Failed to load tasks', err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const closeWidget = () => {
    setIsOpen(false);
    loadTasks(); // reload after saving
  };

  const renderTask = ({ item }) => {
    const { hour, minute, period } = item.time;

    return (
      <View style={styles.taskItem}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskTime}>
          {hour}:{minute.toString().padStart(2, '0')} {period}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text style={styles.empty}>No tasks yet</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          contentContainerStyle={styles.list}
        />
      )}

      <View style={styles.fab}>
        <CustomButton
          onPress={() => setIsOpen(true)}
          title="+"
          width={60}
          height={60}
        />
      </View>

      <TaskWidget
        visible={isOpen}
        onClose={closeWidget}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040014ff',
  },
  list: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  empty: {
    marginTop: 100,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
  },
  taskItem: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  taskTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  taskTime: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 40,
  },
});
