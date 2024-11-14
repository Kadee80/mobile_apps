import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import yelp from '../api/yelp'

const DetailScreen = (props) => {
  const {navigation} = props
  const id = navigation.getParam('id')

  const [result, setResult] = useState(null)

  const getResult = async (id) => {
    try {
      const response = await yelp.get(`/${id}`)

      setResult(response.data)
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  // use effect with empty [] second argumement to avoid loop, and only call once on mount
  useEffect(() => {
    getResult(id)
  }, [])

  return (
    <View>
      <Text>Detail Screen</Text>
      <Text>ID: {id}</Text>
      {/* There is a lag between the request and response, you need to conditionally render information because it wont exist for a few milliseconds */}
      <Text>{result?.name}</Text>
      <Text>{result && result.name}</Text>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})
