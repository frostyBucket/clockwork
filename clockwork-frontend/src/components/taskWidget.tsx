import React from 'react';
import { Modal, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import CustomButton from './customButton';
export default function TaskWidget({ visible, onClose }) {
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
          placeholderTextColor='rgba(255, 255, 255, 0.32)'
          />
          <View style={styles.buttons}>
          <CustomButton onPress={onClose} title="Cancel" width={100} height={60}/>
          <Text>  </Text>
          <CustomButton onPress={onClose} title="Save" width={100} height={60}/>
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
    color: 'white'
  },
  popup: {
    padding: 20,
    backgroundColor: 'rgba(13, 36, 85, 0.5)',
    borderRadius: 10,
  },
  input: {
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    color:'white'
  },
  buttons: {
    flexDirection: 'row'
  }
});
