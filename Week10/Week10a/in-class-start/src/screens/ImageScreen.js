import React from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native'
import ImageCard from '../components/ImageCard'

const ImageScreen = () => {
  const chickens = [
    {name: 'Bilbo Baggins', src: require('../../assets/bilbo-baggins.png')},
    {name: 'Cameron Poe', src: require('../../assets/cameron-poe.png')},
    {name: 'Pollux Troy', src: require('../../assets/pollux-troy.png')},
    {name: 'Nikki Cage', src: require('../../assets/nikki-cage.png')},
  ]
  return (
    <View>
      <Text>Image Screen</Text>
      {/* <ImageCard
        name="Bilbo Baggins"
        src={require('../../assets/bilbo-baggins.png')}
      />
      <ImageCard
        name="Cameron Poe"
        src={require('../../assets/cameron-poe.png')}
      /> */}
      <FlatList
        alwaysBounceVertical
        data={chickens}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => {
          return <ImageCard name={item.name} src={item.src} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default ImageScreen
