import React, {useState} from 'react'
import {StyleSheet, Text, View, TextInput} from 'react-native'

const TextInputScreen = () => {
  const [password, setPassword] = useState('')
  return (
    <View>
      <Text>Enter Password:</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(newValue) => setPassword(newValue)}
      />
      {password.length < 5 ? (
        <Text style={styles.error}>
          Password must be at least 5 characters long!
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 15,
    boderColor: 'black',
    borderWidth: 1,
  },
  error: {
    fontSize: 12,
    marginHorizontal: 15,
    color: 'red',
  },
})

export default TextInputScreen
