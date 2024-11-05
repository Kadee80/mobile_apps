import React, {useReducer} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

const INCREMENT = 'increment'
const DECREMENT = 'decrement'

const reducer = (state, action) => {
  // state === {count : number}
  // action === {type: 'increment' || 'decrement', payload?: 1 || -1 }

  switch (action.type) {
    case INCREMENT:
      return {...state, count: state.count + action.payload}
    case DECREMENT:
      return {...state, count: state.count + action.payload}
    default:
      return state
  }
}

const CounterScreen = () => {
  const [state, dispatch] = useReducer(reducer, {count: 1})
  return (
    <View>
      <Button
        title="Increase"
        onPress={() => {
          dispatch({type: INCREMENT, payload: 1})
        }}
      />
      <Button
        title="Decrease"
        onPress={() => {
          dispatch({type: DECREMENT, payload: -1})
        }}
      />
      <Text>Current Count:{state.count}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default CounterScreen
