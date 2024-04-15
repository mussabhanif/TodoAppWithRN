import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TodoCard = ({ todo }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, todo.status === 'completed' && styles.strikeThrough]}>{todo.title}</Text>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    elevation: 4, // Add elevation for shadow (Android)
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#E5E9ED'
  },
  title: {
    color: '#333',
    fontSize: 18,
},
strikeThrough: {
      textDecorationLine: 'line-through'
  }
});
