import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const BoxModelScreen = () => {
  return (
    <View>
      <Text>Box Model Screen</Text>
      <View style={styles.parentStyle}>
        <Text style={styles.childOneStyle}>Child 1</Text>
        <Text style={styles.childTwoStyle}>Child 2</Text>
        <Text style={styles.childThreeStyle}>Child 3</Text>
        {/* <Text style={styles.lastChild}>Last Child</Text> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  parentStyle: {
    marginVertical: 30,
    marginHorizontal: 15,
    padding: 10,
    borderWidth: 3,
    borderColor: 'black',
    height: 130,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  childOneStyle: {
    height: 50,
    width: 50,
    backgroundColor: 'red',
  },
  childTwoStyle: {
    height: 50,
    width: 50,
    backgroundColor: 'green',
    alignSelf: 'flex-end',
  },
  childThreeStyle: {
    height: 50,
    width: 50,
    backgroundColor: 'blue',
  },
  lastChild: {
    backgroundColor: 'purple',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default BoxModelScreen
