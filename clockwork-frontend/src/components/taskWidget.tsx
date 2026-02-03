import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomButton from './customButton';
import NumberScroller from './numberScroller';
import AMPM from './amPm';

export default function TaskWidget({ visible, onClose }) {
  const [title, setTitle] = useState('');
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState('AM');

  const saveHandler = async () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      time: {
        hour,
        minute,
        period, // "AM" | "PM"
      },
      createdAt: new Date().toISOString(),
    };

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];

      tasks.push(newTask);

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

      // reset + close
      setTitle('');
      setHour(12);
      setMinute(0);
      setPeriod('AM');

      onClose();
    } catch (err) {
      console.error('Failed to save task', err);
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.headerTag}>New Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Task Name"
            placeholderTextColor="rgba(255, 255, 255, 0.32)"
            value={title}
            onChangeText={setTitle}
          />

          <View style={styles.buttons}>
            <NumberScroller
              value={hour}
              onChange={setHour}
              min={1}
              max={12}
            />

            <Text style={styles.colon}> : </Text>

            <NumberScroller
              value={minute}
              onChange={setMinute}
              min={0}
              max={59}
            />

            <AMPM value={period} onChange={setPeriod} />
          </View>

          <View>
            <Text>


            </Text>
          </View>

          <View style={styles.buttons}>
            <CustomButton
              onPress={onClose}
              title="Cancel"
              width={100}
              height={60}
            />
            <Text>  </Text>
            <CustomButton
              onPress={saveHandler}
              title="Save"
              width={100}
              height={60}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTag: {
    marginRight: 10,
    color: 'white',
  },
  popup: {
    padding: 20,
    backgroundColor: 'rgba(0, 16, 51, 1)',
    borderRadius: 10,
  },
  colon: {
    fontSize: 30,
    color: 'white',
  },
  input: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
