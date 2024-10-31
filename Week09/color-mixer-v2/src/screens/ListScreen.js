import React from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native'

const ListScreen = () => {
  const chickens = [
    {name: 'Silky Johnson'},
    {name: 'Bilbo Baggins'},
    {name: 'Castor Troy'},
    {name: 'Pollux Troy'},
    {name: 'Sean Archer'},
    {name: 'Cameron Poe'},
    {name: 'Nikki Cage'},
  ]

  return (
    <View>
      <Text style={styles.title}>List Screen</Text>
      {/* This mapping function still works, but RN has an easier way */}
      {/* {chickens.map((chicken) => (
        <Text>{chicken.name}</Text>
      ))} */}

      <FlatList
        // keyExtractor allows us to run a quick function to apply a unique key to each item in our list
        keyExtractor={(chicken) => chicken.name}
        horizontal
        showsHorizontalScrollIndicator={true}
        data={chickens}
        renderItem={({item}) => {
          return <Text style={styles.itemStyle}>{item.name}</Text>
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    marginVertical: 60,
    marginHorizontal: 10,
    fontSize: 24,
  },
  title: {
    fontSize: 60,
    color: 'red',
  },
})

export default ListScreen
