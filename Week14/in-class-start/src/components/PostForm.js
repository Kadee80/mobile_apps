import React, {useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View} from 'react-native'

const PostForm = ({onSubmit, inititalValues = {title: '', content: ''}}) => {
  const [title, setTitle] = useState(inititalValues.title)
  const [content, setContent] = useState(inititalValues.content)

  return (
    <View>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Content:</Text>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button
        title="Save Post"
        onPress={() => {
          onSubmit(title, content)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    margin: 10,
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
})

export default PostForm
