import React, {useContext, useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View} from 'react-native'
import DiaryContext from '../context/DiaryContext'

const EditScreen = ({navigation}) => {
  const id = navigation.getParam('id')
  const {state, editDiaryPost} = useContext(DiaryContext)
  const post = state.find(
    (diaryPost) => diaryPost.id === navigation.getParam('id')
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

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
          editDiaryPost(id, title, content, () =>
            navigation.navigate('View', {id: id})
          )
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

export default EditScreen
