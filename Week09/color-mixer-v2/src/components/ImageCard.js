import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

const ImageCard = (props) => {
  const {name, src} = props
  return (
    <View>
      <Text style={styles.textStyle}>{name}</Text>
      <Image source={src} />
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: '#006FFF',
  },
})

export default ImageCard
