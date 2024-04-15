import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import axios from 'axios';

const TodoFormSheet = ({customRef, baseURL, onSuccess}) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const submit = async () => {
        setLoading(true)
        setErrors({})
        await axios.post(baseURL+'/todos/create', {title: title}).then((res) => {
            onSuccess()
            customRef.current.close()
        }).catch((err) => {
            setErrors(err.response.data)
        })
    }
  return (
    <RBSheet ref={customRef}
    minClosingHeight={0}
    height={220}
    openDuration={300}
    closeDuration={200}
    closeOnDragDown={true}
    dragFromTopOnly={false}
    closeOnPressMask={true}
    closeOnPressBack={true}
    onOpen={() => setTitle('')}
    draggable
    customStyles={{
      wrapper: {},
      container: {
        padding: 10,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
    }}
    >
        <Text style={styles.title}>New Task</Text>
        <TextInput
        style={styles.input}
        placeholder='Type something...'
        value={title}
        onChangeText={setTitle}
        />
         {errors?.title && (
          <Text style={styles.inputError}>{errors.title}</Text>
        )}
         <TouchableOpacity onPress={() => submit()} style={styles.button}>
        <Text style={styles.buttonText}>Save </Text>
    </TouchableOpacity>
    </RBSheet>
  )
}

export default TodoFormSheet

const styles = StyleSheet.create({
    title: {
        color: '#333',
        fontSize: 18,
    },
    input: {
        borderRadius: 0,
        height: 45,
        marginTop: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '100%',
        backgroundColor: '#F2F2F2'
      },
      button:{
        backgroundColor: '#2174F2',
        width: 100,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: '100%',
        marginTop: 15
      },
      buttonText:{
        color: 'white',
      } ,
      inputError: {
        color: 'red',
        marginTop: 5,
        width: '100%',
      },
})