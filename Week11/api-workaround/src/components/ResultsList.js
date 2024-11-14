import React from 'react'
import {StyleSheet, Text, View, FlatList, Image} from 'react-native'
import ResultItem from './ResultItem'

const ResultsList = (props) => {
  const {title, results} = props
  return (
    <View>
      <Text>{title}</Text>
      <FlatList
        horizontal
        data={results}
        keyExtractor={(result) => {
          return result.id
        }}
        renderItem={({item}) => {
          return <ResultItem result={item} />
        }}
      />
    </View>
  )
}

export default ResultsList

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
  },
  img: {
    width: 250,
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
})
