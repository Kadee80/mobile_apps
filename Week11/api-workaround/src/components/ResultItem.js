import {StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'

const ResultItem = (props) => {
  const {result} = props
  return (
    <View style={styles.container}>
      <Text>{result.name}</Text>
      <Image source={{uri: result.image_url}} style={styles.img} />
    </View>
  )
}

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

export default ResultItem
