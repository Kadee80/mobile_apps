import React from 'react'
import {withNavigation} from 'react-navigation'
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
import ResultItem from './ResultItem'

const ResultsList = (props) => {
  const {title, results, navigation} = props
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {results.length === 0 ? (
        <Text style={styles.noResults}>No results in this price range!</Text>
      ) : (
        <FlatList
          horizontal
          data={results}
          keyExtractor={(result) => {
            return result.id
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', {id: item.id})}
              >
                <ResultItem result={item} />
              </TouchableOpacity>
            )
          }}
        />
      )}
    </View>
  )
}

export default withNavigation(ResultsList)

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginBottom: 15,
  },
  img: {
    width: 250,
    height: 150,
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: 15,
  },
  noResults: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center',
    marginVertical: 30,
  },
})
