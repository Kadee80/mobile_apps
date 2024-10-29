import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.textStyle}>Hello Mobile</Text>
      <Text style={styles.textStyle}>This is some more text</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: 'red',
  },
})

export default HomeScreen
