import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import CustomButton from '@/components/customButton';
import TaskWidget from '@/components/taskWidget';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('tasks');
      setTasks(stored ? JSON.parse(stored) : []);
    } catch (err) {
      console.error('Failed to load tasks', err);
    }
  };

  useEffect(() => {
    loadTasks();
    initNotifications();
  }, []);

  const initNotifications = async () => {
    await setupNotificationChannel();
    await requestNotificationPermissions();
  };

  const requestNotificationPermissions = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Notifications are disabled. Task reminders will not appear.');
    }
  };

  const setupNotificationChannel = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

  const openTask = (task) => {
    setEditingTask(task);
    setIsOpen(true);
  };

  const closeWidget = () => {
    setIsOpen(false);
    setEditingTask(null);
    loadTasks();
  };

  const renderTask = ({ item }) => {
    const { hour, minute, period } = item.time;

    return (
      <Pressable style={styles.taskItem} onPress={() => openTask(item)}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskTime}>
          {hour}:{minute.toString().padStart(2, '0')} {period}
        </Text>
        <Text style={styles.stars}>
          {'★'.repeat(item.severity || 1)}
        </Text>
      </Pressable>
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
          contentContainerStyle={{ padding: 20 }}
        />
      )}

      <View style={styles.fab}>
        <CustomButton
          title="+"
          width={60}
          height={60}
          onPress={() => openTask(null)}
        />
      </View>

      <TaskWidget
        visible={isOpen}
        onClose={closeWidget}
        task={editingTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#040014ff' },
  taskItem: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  taskTitle: { color: 'white', fontSize: 18, fontWeight: '600' },
  taskTime: { color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  stars: { color: '#FFD700', marginTop: 4, fontSize: 16 },
  empty: {
    marginTop: 100,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 16,
  },
  fab: { position: 'absolute', bottom: 80, right: 40 },
});
