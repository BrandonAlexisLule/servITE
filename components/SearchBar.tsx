import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface Props {
  onPress?: () => void;
  placeHolder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeHolder, value, onChangeText }: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#2B69DB" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        placeholderTextColor="black"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#dcdcdc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: .8,
    color: 'black',
    fontSize: 16,
  },
});