import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
// import useResults from '../hooks/useResults'
import SearchBar from '../components/SearchBar'
import ResultsList from '../components/ResultsList'
import {buinesses} from '../api/businesses'
const SearchScreen = () => {
  const [term, setTerm] = useState('')
  // const [searchApi, results, errorMessage] = useResults()
  const results = buinesses
  console.log(JSON.stringify(results, null, 2))

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {/* {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null} */}
      {/* <Text>We found {results.length} results!</Text> */}
      <ResultsList title="Cheap" results={results} />
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: 'orangered',
    fontStyle: 'italic',
    marginHorizontal: 15,
  },
})

export default SearchScreen
