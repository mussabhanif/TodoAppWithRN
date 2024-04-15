import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={text => setSearchTerm(text)}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        borderRadius: 0,
        height: 45,
        marginTop: 0,
        flex: 1,
        borderRadius: 25,
        paddingHorizontal: 10,
        backgroundColor: 'white'
      },
      button: {
        borderRadius: 2,
        width: 60,
        height: 44,
        marginTop: 0,
      },
      buttonIcon: {
        paddingVertical: 'auto',
      },
});
