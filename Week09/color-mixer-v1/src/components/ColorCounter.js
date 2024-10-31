import React from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'

const ColorCounter = (props) => {
  const {color, onIncrease, onDecrease} = props
  return (
    <View>
      <Text>{color}</Text>
      <Button onPress={() => onIncrease()} title={`Increase ${color}`} />
      <Button onPress={() => onDecrease()} title={`Decrease ${color}`} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default ColorCounter
