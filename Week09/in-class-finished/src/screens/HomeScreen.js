import React from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'

const HomeScreen = (props) => {
  return (
    <View>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title="Go to Tutorial Screen"
        onPress={() => props.navigation.navigate('Tutorial')}
      />
      <Button
        title="Go to List Screen"
        onPress={() => props.navigation.navigate('List')}
      />
      <Button
        title="Go to Image Screen"
        onPress={() => props.navigation.navigate('Image')}
      />
      <Button
        title="Go to Color Screen"
        onPress={() => props.navigation.navigate('Color')}
      />
      {/* <TouchableOpacity onPress={() => props.navigation.navigate('List')}>
        <Text>Go to List Screen</Text>
      </TouchableOpacity> */}
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
