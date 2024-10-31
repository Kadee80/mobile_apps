import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const TutorialScreen = () => {
  return (
    <View>
      <Text style={styles.blueText}>Tutorial Screen</Text>
      <Text>Tutorial Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  blueText: {
    color: '#006fff',
    fontSize: 36,
  },
})

export default TutorialScreen
