import React, {useContext} from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native'
import DiaryContext from '../context/DiaryContext'

const IndexScreen = () => {
  const {posts} = useContext(DiaryContext)
  return (
    <View>
      <Text>Index Screen</Text>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.title}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen
