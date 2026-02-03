import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, Pressable, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import CustomButton from './customButton';
import NumberScroller from './numberScroller';
import AMPM from './amPm';

const StarRating = ({ value, onChange }) => (
  <View style={styles.starsRow}>
    {[1, 2, 3].map((n) => (
      <Pressable key={n} onPress={() => onChange(n)}>
        <Text style={[styles.star, n <= value && styles.starActive]}>★</Text>
      </Pressable>
    ))}
  </View>
);

export default function TaskWidget({ visible, onClose, task }) {
  const [title, setTitle] = useState('');
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState('AM');
  const [severity, setSeverity] = useState(1);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setHour(task.time.hour);
      setMinute(task.time.minute);
      setPeriod(task.time.period);
      setSeverity(task.severity || 1);
    } else {
      setTitle('');
      setHour(12);
      setMinute(0);
      setPeriod('AM');
      setSeverity(1);
    }
  }, [task]);

  // Convert hour/minute/period to Date
  const getTriggerTime = () => {
    let hour24 =
      period === 'PM' && hour !== 12
        ? hour + 12
        : period === 'AM' && hour === 12
        ? 0
        : hour;

    const now = new Date();
    const trigger = new Date();
    trigger.setHours(hour24);
    trigger.setMinutes(minute);
    trigger.setSeconds(0);

    if (trigger <= now) {
      trigger.setDate(trigger.getDate() + 1);
    }

    return trigger;
  };

  const scheduleNotification = async (taskToNotify) => {
    const date = getTriggerTime();

    const triggerObj =
      Platform.OS === 'web'
        ? null
        : { type: 'time', date, channelId: 'default' };

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: taskToNotify.title,
      },
      trigger: triggerObj,
    });

    return notificationId;
  };

  const cancelNotification = async (notificationId) => {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    }
  };

  const saveHandler = async () => {
    if (!title.trim()) return;

    const stored = await AsyncStorage.getItem('tasks');
    const tasks = stored ? JSON.parse(stored) : [];

    const updatedTask = {
      id: task?.id || Date.now().toString(),
      title: title.trim(),
      severity,
      time: { hour, minute, period },
      createdAt: task?.createdAt || new Date().toISOString(),
      notificationId: task?.notificationId,
    };

    // Cancel old notification if editing
    if (task?.notificationId) await cancelNotification(task.notificationId);

    // Schedule new notification
    const newNotificationId = await scheduleNotification(updatedTask);
    updatedTask.notificationId = newNotificationId;

    const updatedTasks = task
      ? tasks.map((t) => (t.id === task.id ? updatedTask : t))
      : [...tasks, updatedTask];

    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    onClose();
  };

  const removeTask = async () => {
    if (!task) return;

    const stored = await AsyncStorage.getItem('tasks');
    const tasks = stored ? JSON.parse(stored) : [];
    const updatedTasks = tasks.filter((t) => t.id !== task.id);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Cancel notification
    if (task.notificationId) await cancelNotification(task.notificationId);

    onClose();
  };

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.headerTag}>{task ? 'Edit Task' : 'New Task'}</Text>

          <TextInput
            style={styles.input}
            placeholder="Task Name"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.clockContainer}>
            <NumberScroller value={hour} onChange={setHour} min={1} max={12} />
            <Text style={styles.colon}>:</Text>
            <NumberScroller value={minute} onChange={setMinute} min={0} max={59} />
            <AMPM value={period} onChange={setPeriod} />
          </View>

          <StarRating value={severity} onChange={setSeverity} />

          <View style={styles.buttons}>
            <CustomButton title="Cancel" onPress={onClose} width={100} height={60} />
            <Text> </Text>
            <CustomButton title="Save" onPress={saveHandler} width={100} height={60} />
            {task && (
              <>
                <Text> </Text>
                <CustomButton title="Remove" onPress={removeTask} width={100} height={60} />
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  popup: { padding: 20, backgroundColor: 'rgba(0,16,51,1)', borderRadius: 10 },
  headerTag: { color: 'white', marginBottom: 10 },
  input: { color: 'white', marginBottom: 10 },
  colon: { color: 'white', fontSize: 30 },
  clockContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 },
  buttons: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  star: { fontSize: 28, color: 'rgba(255,255,255,0.3)', marginHorizontal: 6 },
  starActive: { color: '#FFD700' },
});
