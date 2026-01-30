import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from  'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TaskWidget = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState('');
    return (
      <TouchableOpacity>
        <SafeAreaProvider>
          <SafeAreaView>
            <TextInput style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="New Task"
            />
          </SafeAreaView>
        </SafeAreaProvider>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TaskWidget;