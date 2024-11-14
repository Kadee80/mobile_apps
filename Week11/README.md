# Yelp API Restaurant Search App Continued

Last week we did most of the heavy lifting for our restaurant search app. We used object oriented programming to set up our BaseURL and Authorization headers so that we can now just call something like `yelp.get('/${searchTerm})` or any other valid API endpoint and the authorization and long URL part is handled by our `yelp.js` file.

We also set up our project to use a `.env` file to store our secret keys, so that we have them in our local project, but never publish our private keys to GitHub. Before we continue, now is the time to triple check that we have `.env` files added to our `.gitignore` file **At the root of your class directory!** If you were publishing this individual project as its own Github Repository, you would have to make sure `.env` is ignored there as well.

Last class, we ended with wiring up our `SearchBar` and `SearchScreen` to search a term entered and confirmed by the user. We have one last very important gotcha to address before moving on.

## Error handling. Why? Bad cell phone service is a thing.

Before we jump into the fun part of rendering our results, we should really have some plan in place for if a request fails for some reason other than a typo in your code. Remember, we are dealing with mobile devices that may have a weak signal.

An easy way to produce an error, is deleting the space between `Bearer ${REACT_APP_API_KEY}` inside `yelp.js`. Let's do that so we have an error to handle, that we can also easily undo.

Code with error:

```jsx
import axios from 'axios'
import {REACT_APP_API_KEY} from '@env'

console.log(REACT_APP_API_KEY)

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: `Bearer${REACT_APP_API_KEY}`,
  },
})
```

Now if you try and search for `pizza`. Not only will your results count stay stuck at 0, but you should get an error on your emulator screen and or terminal.

Mine says something like `Possible unhandled promise rejection`. Looks like an error to me! Now, for how to handle this situation elegantly. Keep in mind, these errors will not show up on real devices, only emulators.

We can wrap our entire request in a try/catch statement, for now we will just log the error and see what it says:

```jsx
const searchApi = async () => {
  try {
    const response = await yelp.get('/search', {
      params: {
        limit: 50,
        term: term,
        location: 'NYC',
      },
    })
    setResults(response.data.businesses)
  } catch (err) {
    console.log(err)
  }
}
```

Inside terminal, we will see:
`[AxiosError: Request failed with status code 400]`
Not very useful to the app user. First of all they cannot see it. Second, even if they could, its meaningless to them.

Instead we can show a generic message on the screen when a search fails. Since we are talking about updating our screen, looks like we need another piece of `state` inside our `SearchScreen`.

```jsx
const [errorMessage, setErrorMessage] = useState('')
```

and inside our catch statement we can replace our `console.log(err)` with:

```jsx
    } catch (err) {
      setErrorMessage('Something went wrong. Check your data connection.')
    }
```

Now we have something human readable to display to our user. We can conditionally render this much like we did last class!

```jsx
return (
  <View>
    <SearchBar term={term} onTermChange={setTerm} onTermSubmit={searchApi} />
    {errorMessage ? <Text>{errorMessage}</Text> : null}
    <Text>We have found {results.length} results!</Text>
  </View>
)
```

We can even throw in a little bit of styling if you'd like:

```jsx
const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    color: 'orangered',
    fontStyle: 'italic',
  },
})
```

Test this error out with the styling and then DONT FORGET to fix your `yelp.js` so your search works again. Once last little thing. You removed the error, but the error message remains even with a successful search. We can clear out the error in our `try` statement.

```jsx
const searchApi = async () => {
  try {
    const response = await yelp.get('/search', {
      params: {
        limit: 50,
        term: term,
        location: 'NYC',
      },
    })
    setErrorMessage('')
    setResults(response.data.businesses)
  } catch (err) {
    setErrorMessage('Something went wrong. Check your data connection.')
  }
}
```

## Initial Search onLoad

Although we haven't built out the components and FlatLists to render our search results yet, we can tell our App is going to look pretty empty on load. Rather than waiting for a user to search a term to populate the screen, we will perform a search for a hardcoded/default search onLoad.

Here's what we absolutely SHOULD NOT DO:

```jsx
...
const searchApi = async () => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: term,
          location: 'NYC',
        },
      })
      setErrorMessage('')
      setResults(response.data.businesses)
    } catch (err) {
      setErrorMessage('Something went wrong. Check your data connection.')
    }
  }
  // NO NO NO - Infinite Loop of API calls!
  searchApi('pizza')

  return (
    <View>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={searchApi} />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Text>We have found {results.length} results!</Text>
    </View>
  )
...
```

Calling `searchApi('pizza')` within our component code will call `setResults()`, which will update State. Updating State will trigger a re-render, which will call `searchApi('pizza')` once again, which will call `setResults()`, which will update State, which will trigger a re-render where we call `searchApi('pizza')` yet again... You get the point.

So what do we do? You already know the answer from React-DOM. We need a hook that runs once and only once when the component mounts: `useEffect()`!

Just to refresh your memory:

```jsx
useEffect(() => {}) // runs every time the component renders

useEffect(() => {}, []) // runs only once, when the component first mounts

useEffect(() => {}, [valueToWatch]) // runs on mount, and any time 'valueToWatch' changes, you can watch as many values as you wish!
```

We want option 2, where `useEffect()` runs the first argument/function only once on mount aka when the component _first_ renders.

```jsx
useEffect(() => {
  searchApi('pizza')
}, [])
```

## Refactor: Extracting our Custom Hook Logic

Ok, now we are only hitting the API once when the screen first loads, and of course whenever a user enters a search term aka `onTermSubmit`. But our SearchScreen is getting rather long, nearly half of the lines of code have to do with making our API call. Time for another refactor that not only keeps our component logic and our search business logic separate, but allows us to make our own reusable Hook which we could potentially use anywhere within our project.

To begin, create a new directory inside `src/` named `hooks/`. (This should look and sound vaguely familiar.) Next inside our new hooks directory, create a file named `useResults.js`. Hooks are functions that add some additional functionality to a component, and usually start with the word `use` as a convention. Here is where we will place all lines of code related to making the Yelp API business search call.

First, we start with all of the imports we need, and a function we will export as default:

```jsx
import {useEffect, useState} from 'react'
import yelp from '../api/yelp'

export default () => {
  // coming soon!
}
```

Now, we extract all of the code related to our API call from within our component. This will leave us with our `term` piece of state and setter, which we need for binding our `SearchBar` input, and the JSX we return.

useResults.js:

```jsx
import {useEffect, useState} from 'react'
import yelp from '../api/yelp'

export default () => {
  const [results, setResults] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const searchApi = async () => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: term,
          location: 'NYC',
        },
      })
      setErrorMessage('')
      setResults(response.data.businesses)
    } catch (err) {
      setErrorMessage('Something went wrong. Check your data connection.')
    }
  }

  useEffect(() => {
    searchApi('pizza')
  }, [])
}
```

SearchScreen.js:

```jsx
const SearchScreen = () => {
  const [term, setTerm] = useState('')

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Text>We have found {results.length} results!</Text>
    </View>
  )
}
```

Now, we need to take a look at our SearchScreen JSX, and find all of the functions and variables that make a reference to the code we just cut. They are:

- `searchApi`
- `errorMessage`
- `results.length`

These are the three things needed from our Hook. So, at the bottom of our `useResults` function, we can return them so that they can be extracted/destructured from it in ANY component that calls it.

useResults.js:

```jsx
  return [searchApi, results, errorMessage]
...
```

Now we need to import our `useResults` hook and destructure the needed values.

SearchScreen:

```jsx
...
import useResults from '../hooks/useResults'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage] = useResults()
...
}
```

Now we have a MUCH cleaner `SearchScreen` and a reusable Hook that we could potentially use anywhere else in our App.

## Rendering our List(s) of Results

It's finally time to work on our `ResultList` component. We will reuse this component 3 times, one for each group of restaurants in each price range. Remember, business result object each have a price key which rates how expensive each restaurant is.

To get started, create a component file in our `src/components/` directory named `ResultsList`. Add the usual starter boilerplate code to this file and let's immediately import it and render it 3 times in our `SearchScreen`.

Now it's time to think about Props. We know we will need a header or `title` for each list. This should be review.

## Grouping Results By $

Before we get too involved, let's take a moment to review what our results data looks like. We can throw in a `console.log(results)` at the top of our `SearchScreen` to view them. It's darn near impossible to read without some formatting so lets wrap it in a JSON command for better legibility.

This is also the point where we need to access some fields which are behind a paywall. I will be emailing a key during class. Remember, we only place this information inside our `.env` file to avoid publishing it to GitHub. If that happens, the API key will almost certainly be shut down and our projects will cease to work without a workaround I provide later on.

```js
console.log(JSON.stringify(results, null, 2))
```

Here is a single result item so that we can take a closer look, but the key we are most concerned with right now is `price` which has a range of `$-$$$`. We will do the filtering at the `SearchScreen` level so that the results passed to each `ResultList` is already filtered and the `FlatList` within it can simply render all of the data passed down to it.

```json
{
    "id": "ysqgdbSrezXgVwER2kQWKA",
    "alias": "julianas-brooklyn-3",
    "name": "Juliana's",
    "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/od36nFW220aMFAnNP00ocw/o.jpg",
    "is_closed": false,
    "url": "https://www.yelp.com/biz/julianas-brooklyn-3?adjust_creative=UhIEO0tBr2i9b0e-NhwOfw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=UhIEO0tBr2i9b0e-NhwOfw",
    "review_count": 2839,
    "categories": [
      {
        "alias": "pizza",
        "title": "Pizza"
      }
    ],
    "rating": 4.4,
    "coordinates": {
      "latitude": 40.70274718768062,
      "longitude": -73.99343490196397
    },
    "transactions": [
      "delivery"
    ],
    "price": "$$",
    "location": {
      "address1": "19 Old Fulton St",
      "address2": "",
      "address3": "",
      "city": "Brooklyn",
      "zip_code": "11201",
      "country": "US",
      "state": "NY",
      "display_address": [
        "19 Old Fulton St",
        "Brooklyn, NY 11201"
      ]
    },
    "phone": "+17185966700",
    "display_phone": "(718) 596-6700",
    "distance": 308.56984360837544,
    "business_hours": [
      {
        "open": [
          {
            "is_overnight": false,
            "start": "1130",
            "end": "1515",
            "day": 0
          },
          {
            "is_overnight": false,
            "start": "1600",
            "end": "2100",
            "day": 0
          },
          {
            "is_overnight": false,
            "start": "1130",
            "end": "1515",
            "day": 1
          },
          {
            "is_overnight": false,
            "start": "1600",
            "end": "2100",
            "day": 1
          },
          {
            "is_overnight": false,
            "start": "1130",
            "end": "1515",
            "day": 2
          },
          {
            "is_overnight": false,
            "start": "1600",
            "end": "2100",
            "day": 2
          },
          {
            "is_overnight": false,
            "start": "1130",
            "end": "1515",
            "day": 3
          },
          {
            "is_overnight": false,
            "start": "1600",
            "end": "2100",
            "day": 3
          },
          {
            "is_overnight": false,
            "start": "1130",
            "end": "1515",
            "day": 4
          },
          {
            "is_overnight": false,
            "start": "1600",
            "end": "2100",
            "day": 4
          },
          {
            "is_overnight": false,
            "start": "1130",
            "end": "1515",
            "day": 5
          },
          {
            "is_overnight": false,
            "start": "1600",
            "end": "2100",
            "day": 5
          },
          {
            "is_overnight": false,
            "start": "1130",
            "end": "1515",
            "day": 6
          },
          {
            "is_overnight": false,
            "start": "1600",
            "end": "2100",
            "day": 6
          }
        ],
        "hours_type": "REGULAR",
        "is_open_now": true
      }
    ],
    "attributes": {
      "business_temp_closed": null,
      "menu_url": "https://julianaspizza.com/menus/",
      "open24_hours": null,
      "waitlist_reservation": null
    }
  },
```

Now that we saw some results in our logs, we can remove our `console.log` and keep going. Next up is to create a function to filter our results. We will pass in the price we wish to pull out as an argument here.

```jsx
const filterResultsByPrice = (price) => {
  // price = '$' || '$$' || '$$$'
  return results.filter((result) => {
    return result.price === price
  })
}
```

Now we can call this filter function when we pass in our results prop to each result list:

```jsx
      <ResultsList title="Cheap" results={filterResultsByPrice('$')} />
      <ResultsList title="Moderate" results={filterResultsByPrice('$$')} />
      <ResultsList title="Money Bags" results={filterResultsByPrice('$$$')} />
```

Don't forget to recieve this new prop in `ResultsList`. You may get 0 results for some search terms. That's OK.

```jsx
const ResultsList = (props) => {
  const {title, results} = props
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <FlatList horizontal data={results} />
    </View>
  )
}
```

## Rendering Results Continued

Now that we have our data grouped by price, let's bring in a `FlatList` Primitive and render out some more information about each restaurant. We can replace out result count `Text` Primitive with a Flatlist and remember, by default it will scroll vertically, but there a prop for that! When we use a `FlatList` we need to use the `keyExtractor` prop to return something unique and consistent between renders as a key for each item in our list. This unique identifier is super important because a simple index will bot suffice if we start deleting/modifying items within our List. Luckily, since our data is coming from an API, it already has an ID field which we can make use of. The `renderItem` prop is where we pass in a function to render some JSX for each item in our List. We can access each item as `{item}` within this function. For now, we can simply return a Text primitive with `item.name`.

```jsx
<FlatList
  horizontal
  data={results}
  keyExtractor={(result) => {
    result.id
  }}
  renderItem={({item}) => {
    return <Text>{item.name}</Text>
  }}
/>
```

At this point, all or most of your categories should be populated with text containing the name of each restaurant that meets that pricing criteria. It may be a little difficult for now, but you should be able to scroll them horizontally. All thats left in our `SearchScreen` is some better formatting/styling for our JSX and to extract a few more properties to display. This is a great time for another resuable component.

## Reusable ResultItem Component

We _could_ render a whole mess of JSX inside our `renderItem` function, but that would make our file bloated, harder to read, and we would lack the ability to easily render an individual result elsewhere if needed. Let's get started with our boilerplate for a new `ResultItem` component.

```jsx
import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

const ResultItem = () => {
  return (
    <View>
      <Text>Result Item</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ResultItem
```

Now inside our `ResultList` let's import our `ResultItem` and pass it each `item` as a prop named `result`.

```jsx
...
import ResultItem from './ResultItem'

...

        renderItem={({item}) => {
          return <ResultItem result={item}/>
        }}

...
```

This should all be review, just extracting certain keys from each result object and rendering something within our `ResultItem` with them. The keys we care about are:

- result.name
- result.price
- result.rating
- result.image_url
- result.review_count

To begin, let's start with the `Image` to render.

```jsx
const ResultItem = (props) => {
  const {result} = props
  return (
    <View>
      <Image source={{uri: result.image_url}} />
      <Text>{result.name}</Text>
    </View>
  )
}
```

Hmmm, all we see is text! Remember, an `Image` Primitive will collapse without some sizing applied to it. Make a style to apply to your `Image` and give it a width of 250. Still no image? We need a height of 150 as well! This isn't ideal, since we are not taking into account the aspect ratio, but it will do for now.

```jsx
import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

const ResultItem = (props) => {
  const {result} = props
  return (
    <View>
      <Image source={{uri: result.image_url}} style={styles.img} />
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        {result.rating} Stars, {result.review_count} Reviews
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 250,
    borderRadius: 5,
    height: 150,
  },
  name: {
    fontWeight: 'bold',
  },
})

export default ResultItem
```

There is still some more styling to fix up but I will leave that up to you! In class we will make sure we have margin on a bunch of items to make things align, and give some spacing between elements. The big issues however are:

- removing the horizontal scroll bar
- being able to scroll vertically if our results on our SearchScreen flow off the bottom of the page

Our FlatList has a prop `showsHorizontalScrollIndicator={false}` which we can use to remove the horizontal scrolling. But what about the potential verical scrolling issue on smaller devices? There's a primitive for that! Enter `ScrollView`! We can wrap our `ResultList`s in one of these:

```jsx
<View>
  <SearchBar
    term={term}
    onTermChange={setTerm}
    onTermSubmit={() => searchApi(term)}
  />
  {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
  <ScrollView>
    <ResultsList title="Cheap" results={filterResultsByPrice('$')} />
    <ResultsList title="Moderate" results={filterResultsByPrice('$$')} />
    <ResultsList title="Money Bags" results={filterResultsByPrice('$$$')} />
  </ScrollView>
</View>
```

Close... but there are a few new props that can help us get a much more desired effect. To see the issue, let's add a red border to the parent `View` element of the page.

```jsx
    <View style={{borderColor: 'red', borderWidth: 10}}>
```

You may or may not see the issue depending on which device you are emulating, but the issue is that our parent level `View` may be expanding past the extents of our page and therefore screwing up our `ScrollView`. To fix this we can use the `flex` property we looked at last week.

```jsx
 <View style={{flex: 1}}>
```

Now the `View` either grows or shrinks to fit the screen size, eliminating the issue on any device! There is another slightly easier solution, we can use an empty element instead of a `View` AKA a `fragment`.

## Navigation to the Next Screen

So, we are done enough with our `SearchScreen` except for any styling adjustments you wish to make. Time to move on to our next screen, this introduces a few new problems to solve. Let's start by creating a new Screen named `ResultDetailScreen`. Add the usual boilerplate. Don't forget to add it to your `StackNavigator` inside `App.js`.

So we have a second screen, how do we get there? Remember every screen can recieve props from the StackNavigator. What we care about is `navigator.navigate()`. Last time we used it, we had a button right there on the screen to use to navigate. Now, we want to navigate from a child component in a different file. Let's take a look at what that might look like:

First, we need to pull out the `navigation` object from props in `SearchScreen`

```jsx
const SearchScreen = (props) => {
  const {navigation} = props

...

<ScrollView>
  <ResultsList
    title="Cheap"
    results={filterResultsByPrice('$')}
    navigation={navigation}
  />
  <ResultsList
    title="Moderate"
    results={filterResultsByPrice('$$')}
    navigation={navigation}
  />
  <ResultsList
    title="Money Bags"
    results={filterResultsByPrice('$$$')}
    navigation={navigation}
  />
</ScrollView>
```

Next we need to recieve it in our `ResultList` simply to pass it down to the `ResultItem`. We cannot use the `Button` primitive, but remember we have TouchableOpacity!

```jsx
...
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native'
...
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Detail')
              }}
            >
              <ResultItem result={item} />
            </TouchableOpacity>
          )
        }}
...
```

Now we can click on any `RestaurantItem` and it will bring us to our empty `ResultDetails` screen! Now we have a new issue: how do we get the information from the pressed `ResultItem` to this new page? One little refactor before we tackle that. It feels silly to pull out `navigation` on a Screen simply to pass it down a few time. There IS a better way!

First, delete any reference to `navigation` on `SearchScreen` ONLY, including the props we passed down.

We are going to skip the props pass-down part completely with a new helper: `WithNavigation`.

In ResultsList:

```jsx
import {withNavigation} from 'react-navigation'

...

export default withNavigation(ResultsList)
```

It still works but without the prop passing from `SearchScreen`!

## Screen to Screen Communication

We now can navigate to a very empty `ResultDetailScreen`. How do we know which result was clicked? Remember we need to do a second API call to the `businesses/{id}` endpoint to fetch more images of a restaurant. We need to pass the `id` of the restaurant we clicked. Luckily, `navigate()` can take a second argument which can contain information we need to pass.

ResultsList:

```jsx
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Detail', {id: item.id})
              }}
            >
              <ResultItem result={item} />
            </TouchableOpacity>
          )
        }}
```

Now we need to receive it on our `ResultDetail` screen:

```jsx
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const ResultDetailScreen = (props) => {
  const {navigation} = props
  const id = navigation.getParam('id')

  return (
    <View>
      <Text>Result Detail Screen</Text>
      <Text>ID: {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ResultDetailScreen
```

## Fetching Single Business Info by ID

We are now passing the `id` which is all we need to make our next API call, to our `ResultDetailScreen`. Lucky for us, we already made our `yelp` api calls super reusable, we just need to make sure we hit the right endpoint.

Endpoint: `/{id}`
Result: An individual business object, NOT an array!
Key needed: `photos`

```jsx
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import yelp from '../api/yelp'

const ResultDetailScreen = (props) => {
  const {navigation} = props
  const id = navigation.getParam('id')

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`)
    // response.data
  }
  return (
    <View>
      <Text>Result Detail Screen</Text>
      <Text>ID: {id}</Text>
    </View>
  )
}
```

We need to store the response somewhere, and update the screen. Looks like another job for `useState`. We also only want to make the API call once on mount, so we will also need `useEffect`.

```jsx
import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import yelp from '../api/yelp'

const ResultDetailScreen = (props) => {
  const [result, setResult] = useState(null)
  const {navigation} = props
  const id = navigation.getParam('id')

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`)
    setResult(response.data)
  }

  useEffect(() => {
    getResult(id)
  }, [])

  // log it nicely formatted so we can see our data
  console.log(JSON.stringify(result, null, 2))
  return (
    <View>
      <Text>Result Detail Screen</Text>
      <Text>ID: {id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ResultDetailScreen
```

## In Class Exercise/HW: Rendering Restaurant Photos

Now that you have an individual restaurant result and it's data on the `ResultDetailScreen`, take a moment to render out a FlatList of all of the images in `result.photos`. Bonus points for any other additional information you render out for the `ResultDetailsPage`!
