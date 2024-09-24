import axios from 'axios'

const searchImages = async (term) => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    // inside headers use your ACCESS KEY
    headers: {
      Authorization: 'Client-ID lLzFtKwJrMovdJIQWhI_C8fUX5xHQT52hvqxR0dzN6s',
    },
    params: {query: term},
  })
  console.log(response.data.results)
  return response.data.results
}

export default searchImages
