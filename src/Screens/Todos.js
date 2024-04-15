import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import axios from 'axios'
import TodoCard from '../Components/TodoCard'
import TodoFormSheet from '../Components/TodoFormSheet'

const baseURL = 'http://192.168.196.87:8000/api'
const dimensions = Dimensions.get('window')
const Todos = () => {
  const [pendingTodos, setPendingTodos] = useState([]);  
  const [completedTodos, setCompletedTodos] = useState([]);  
  const todoSheet = useRef();
  const getTodos = async () => {
   const res = await axios.get(baseURL+'/todos').then((res) => {
        setPendingTodos(res.data.pending_todos);
        setCompletedTodos(res.data.completed_todos);
    }).catch((err) => {
        alert('Error getting todo: '+err)
    });
  }
  useEffect(() => {
    getTodos();
  
    return () => {
      
    }
  }, [])
  
  return (
   <View style={styles.container}>
    <TodoFormSheet customRef={todoSheet} baseURL={baseURL} onSuccess={getTodos}/>
    <ScrollView>
    <View style={styles.header}>
    <Text style={styles.heading}>My Todo List</Text>
        <SearchBar/>
    </View>
    <View style={styles.todoList}>
        {pendingTodos.map(item => (
            <TodoCard todo={item} key={item.id}/>
        ))}
        {/* <FlatList
            data={pendingTodos}
            renderItem={({item}) =>  (
                    <TodoCard todo={item}/>
                )}
            keyExtractor={item => item.id}
        /> */}
    </View>
    <Text style={styles.listTitle}>Completed</Text>
    <View style={styles.todoList}>
    {completedTodos.map(item => (
            <TodoCard todo={item} key={item.id}/>
        ))}
        {/* <FlatList
            data={completedTodos}
            renderItem={({item}) =>  (
                    <TodoCard todo={item}/>
                )}
            keyExtractor={item => item.id}
        /> */}  
    </View>
    </ScrollView>
    <TouchableOpacity onPress={() => todoSheet.current.open()} style={styles.addButton}>
        <Text style={styles.buttonText}>New Task</Text>
    </TouchableOpacity>
   </View>
  )
}

export default Todos

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      header: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#2174F2',
        height: 200,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
      },
      heading: {
        fontSize: 25,
        color: 'white'
      },
      todoList: {
        paddingVertical: 10,
        paddingHorizontal: 15,
      },
      listTitle: {
        marginHorizontal: 15,
        fontSize: 16,
        color: 'black'
      },
      addButton:{
        backgroundColor: '#2174F2',
        width: 100,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        position: 'absolute',
        bottom: 30,
        right: 14
      },
      buttonText:{
        color: 'white',
      } 
})