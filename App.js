import React, { useState } from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { Text, CheckBox, Input, Button } from '@rneui/themed';

export default function App() {
 
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Do assignment', completed: false },
    { key: '2', description: 'Clean kitchen', completed: true },
    { key: '3', description: 'Study for exam', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  // Toggle checkbox
  const toggleTask = (key) => {
    const updatedTasks = tasks.map((task) =>
      task.key === key ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Add new task
  const addTask = () => {
    if (newTask.trim() === '') return;

    const newItem = {
      key: Date.now().toString(),
      description: newTask,
      completed: false,
    };

    setTasks([...tasks, newItem]);
    setNewTask('');
  };

  // Render each item
  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
      />
      <Text
        style={[
          styles.taskText,
          item.completed && styles.completedText,
        ]}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.title}>🌸 My Task List</Text>

      {/* Input + Button */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter a new task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe6f0',
    padding: 15,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#ff66a3',
  },
  inputContainer: {
    marginBottom: 15,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  taskText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
