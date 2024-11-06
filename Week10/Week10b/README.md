# Restaurant Search App

Now that we have made a bunch of screens and a few reusable components to explore the React Native flavor of doing things, we can start building something a little more meaningful. Today we will build a restaurant search app using an outside API. Our app will consist of a search bar at the top, and then we will render the results grouped by price. Each group of results will display and scroll horizontally. Once the user chooses an individual restaurant to view, they will be taken to a restaurant detail page with more information and photos.

## Project generation

First, we need to generate a new project via command line with the following:

```bash
npx create-expo-app restaurants --template blank
```

- We are using an `npx` command but instead of using `create-react-app` we use `create-expo-app`

- `restaurants` is the name I chose, you can call yours whatever you like.

- `--template blank` is an additional argument telling expo to generate a blank template for our app. (Empty root, no Typescript)

Once you run the command, type `y` to continue installing the project and its dependencies. Note we now have some new `nom run` commands. Don't forget to `cd` / `dir` into your project first!

NOTE: We have 2 command line options for generating a new React Native project.
`expo-cli` is what we are using because it handles a lot of default configuration that we probably want, like icons, video, and camera use. This option has gotten even easier to use recently and we no longer need to install it globally, and we can generate a new project with just the single command shown above.

The other option available is generally for more advanced users who are familiar with project architecture. `react-native-cli` generates an empty project as well, but its up to the developer to add in their own configuration.

## Yelp Developer Account Gotchas and Workaround

As of March of this year, Yelp has paywalled their API. As you know, API keys get snatched up by bots frequently so be sure to NEVER publish your API key on GitHub for this very reason.

This project requires use of their `pricing` endpoints, which are now behind

DO NOT SHARE OR PUBLISH THE API KEY I EMAIL YOU AT THE START OF CLASS! If we all abide by this, the chances of the key being terminated are much lower. There is a strict 5000 call per day quota - please only use this key to complete this project.

Documentation for using the Yelp Developer API and Free Trial Signup can be found [here](https://fusion.yelp.com/). Please signup for a free trial (We don't have a business email, so you can only choose STARTER), confirm your email, and go to:

[Create a new App](https://www.yelp.com/developers/v3/manage_app)- To create a new app.

[API Endpoint Documentation Homepage](https://docs.developer.yelp.com/docs/fusion-intro)

[Business Search Endpoint Documentation](https://docs.developer.yelp.com/reference/v3_business_search) You will need to sign in here as well.

**Once you are on the Business Search Documentation page:**

On the right side column, you will see a panel with different coding languages, below that, there is a section labeled RESPONSE, select the 200 result example to view a sample business result object. The keys we care about are:

- name
- id
- price ($-$$$$)
- rating (0-5 )
- review_count
- image_url

It's not a apparent as it was in the older documentation, but the endpoint we really need for our business search is:

```
GET https://api.yelp.com/v3/businesses/search
```

We need to pass in some parameters such as:

- term
- location

Notice we only get back 1 image with this search. We will need a different API request to view more business images. To search business details, we need the ID from the first search.

[Business Details Endpoint Documentation](https://docs.developer.yelp.com/reference/v3_business_info)

You will notice we need to pass the ID from the first search at the end of the request URL:

```
GET  https://api.yelp.com/v3/businesses/{id}
```

View the 200 response example. The key we care about here is:

- photos []

Keep both tabs open for the remainder of class! We won't be using this information just yet.

## Starting Up Your New Project

You may have noticed when you generated your new project, there was no `nom start` command listed in your command line hints. We have a few options here:

1- iOS emulator: `npm run ios`
2- Android emulator: `npm run android`
3- Browser option: `npm run web` - When you first run this command, you will get an error telling you do not have the required dependencies to run this. Please follow the hint to install them. Currently my command line reads:

```bash
npx expo install react-native-web react-dom @expo/metro-runtime
```

Today, that command will fix it for you as well, but as time goes on, and you generate new projects, these exact dependencies might change so always follow the instructions provided in your own command line window!

After you run your desired OS start command, you should see a screen that says:

**Open up App.js to start working on your app!**

Now we begin the process of deleting the default files and building our own from scratch!

## Screens and Navigation

Based on the App description, we know we will need a business search/results screen, and then a business details screen once a user clicks an individual result. Obviously, information from the first screen will inform the second screen. Keep this in mind as we continue.

React Native Navigation provides us with 3 different navigator options:

- `StackNavigator`- what we have been using in class so far, user clicks a `link` on the screen provided by us to proceed to the next screen, back button displays up top.
- `DrawerNavigator` - pops out a left side panel with nav links
- `BottomTabNavigator` - bottom tab with nav links

We will continue to use `StackNavigator` for this project since the second screen is informed by the first. Since we are generating our project from scratch this go around, we need to make sure we install `react-navigation` and begin wiring it up. Setting up navigation at the beginning of a project is almost always a wise move!

Open up a second tab inside terminal (make sure you are still inside your project directory), and leave the first one alone to run your project.

_Install React Navigation:_

```bash
npm install react-navigation@4.4.4 --legacy-peer-deps
```

Notice we are specifying a specific version and its dependencies. There is a v6 available now, but will require a few refactors if you want to make this upgrade.

_Install Dependencies:_

````bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view -- --legacy-peer-deps
```

_Install React Navigation Stack:_

```bash
npm install react-navigation-stack @react-native-community/masked-view --legacy-peer-deps
````

_Update babel.config.js:_

Find the line(s) with `return {...}` and add the following line:

```js
    plugins: ["react-native-reanimated/plugin"],
```

Your config should now look something like this:

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  }
}
```

Finally, let's start writing some code!

Open up App.js and delete everything. To begin we need to import a few items:

```jsx
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
```

Now we create our `navigator`:

```jsx
const navigator = createStackNavigator()
```

We saw this in our previous project, but today we will finally build it from scratch and understand better what is going on. `createStackNavigator` takes two arguments. The first is an object containing all of our routes mapped to screens. We don't have any screens yet, so let's create one now.

Inside your project, create a `src/` directory, and inside `src/` create a `screens/` directory. We know our first screen will be our `SearchScreen`, so let's name it that! Once you create `SearchScreen.js`, go ahead and add our boilerplate for now:

```jsx
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const SearchScreen = () => {
  return (
    <View>
      <Text>Search Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default SearchScreen
```

Save this. Now we have a screen to pass to our `StackNavigator`. Inside App.js import your SearchScreen and pass it into our first argument as the key/route `Search`.

```jsx
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import SearchScreen from './src/screens/SearchScreen'

const navigator = createStackNavigator({
  Search: SearchScreen,
})
```

Now for the second argument of `createStackNavigator`. The second argument will also be an object with a few options inside.

```jsx
...
const navigator = createStackNavigator(
  {
    Search: SearchScreen,
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'Business Search',
    },
  }
)
```

`initialRouteName` = The screen to show on App load. We only have one screen for now, but that will change.
`defaultNavigationOptions` = The options used for every different screen. This is where we can customize the header used on every screen.
In our previous App, we displayed the `title` App on every screen. Here we might want to customize this a bit more, but for now we can have a default `title` of 'Business Search'

One last task inside our `App.js` is to export it, and create our App Container:

```jsx
export default createAppContainer(navigator)
```

App.js is a special file. Whatever is exported inside this file will be taken and displayed on the device when your app loads. We aren't exporting a component here, but a navigator object. `createAppContainer` takes our `navigator` and creates a react component out of it which displays whatever content the `navigator` is producing inside of it.

Now that we have our boilerplate set up from scratch, take a moment to test this on your device or emulator of choice. If you do not see the words `Search Screen`, you may have errors. Please note the `npm run web` command will probably break once we add in our navigator, so be sure to test on iOS or Android. If you are totally stumped, you can download the `navigation-boilerplate.zip` file inside todays class notes directory.

## Search Screen

Now, back to our App design. We know we will need a SearchBar containing a TextInput, maybe a search icon, and a reusable RestautantList component.

It makes most sense to start with the `SearchBar` component, so that we can start hitting the Yelp API and retrieving some results.

### SearchBar

Our `SearchBar` should be a reusable component, not a Screen. So let's start by adding a `components/` directory inside `src/`. Go ahead and create `SearchBar.js` inside of your components directory and add the usual boilerplate. Make sure you load your `SearchBar` component inside your `SearchScreen`.

```jsx
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const SearchBar = () => {
  return (
    <View style={styles.background}>
      <Text>SearchBar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#CCC',
    borderRadius: 5,
    marginHorizontal: 10,
    hieght: 50,
  },
})

export default SearchBar
```

You'll noticee the `View` component has some styling added. This is to group our search icon and our input, and make what we are working on a little more clear.

#### Icons

Next, let's add a maginfying glass Icon to our SearchBar. Since we used expo-cli to create our project, Icons will be a breeze since the [VectorIcons library](https://docs.expo.dev/guides/icons/) is already installed! More importantly, theres a nice icon library we can view and search for icons.

[Icon Search](https://icons.expo.fyi/Index)

You can pick any search icon you prefer, just make sure you take note of the icon name and what icon library it is from for when you import it. Actually, you can just click on the icon itself and get the import and usage code to copy!

```jsx
...
import FontAwesome from '@expo/vector-icons/FontAwesome'

const SearchBar = () => {
  return (
    <View style={styles.background}>
      <FontAwesome name="search" size={33} color="black" />
    </View>
  )
}
...
```

We can change the icon by changing its name prop, and its size using the size prop.

#### Input and Styling

Last class we took a look at the `TextInput` primitive, as well as some of React Natives styling defaults and some layout options. I'll leave the styles up to you, but more importantly is remembering how to `bind` our input component to a piece of local state.

```jsx
import React from 'react'
import {StyleSheet, TextInput, View} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const SearchBar = () => {
  return (
    <View style={styles.background}>
      <FontAwesome name="search" size={33} color="black" />
      <TextInput placeholder="Search" style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#CCC',
    borderRadius: 5,
    marginHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    height: 30,
    paddingHorizontal: 5,
    borderRadius: 5,
    flex: 1,
    backgroundColor: '#eee',
  },
})

export default SearchBar
```

Now that it is looking un-terrible. Let's wire up our input to some State. Remember, our `SearchScreen` is the component that will need to access this piece of state, so it needs to be defined there and the handler passed down as a prop to `SearchBar`. Don't forget our 2 important props for iOs to turn off autoCorrect and autoCapitalize!

SearchScreen:

```jsx
import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import SearchBar from '../components/SearchBar'

const SearchScreen = () => {
  const [term, setTerm] = useState('')
  return (
    <View>
      <SearchBar term={term} onTermChange={(newTerm) => setTerm(newTerm)} />
      <Text>{term}</Text>
    </View>
  )
}
...
```

SearchBar:

```jsx
...
const SearchBar = (props) => {
  const {term, onTermChange} = props
  return (
    <View style={styles.background}>
      <FontAwesome name="search" size={33} color="black" />
      <TextInput
        placeholder="Search"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
      />
    </View>
  )
}
...
```

#### One Last Gotcha

Obviously, we don't want to preform a search on every `onChangeText`. We would burn up our API class way too quickly. Since we are on a device, with a popup keyboard there is a better way.

`onEndEditing` is another prop we can use within our `TextInput`. Think hitting the enter/check/ok button when you are happy with your text. It begins with the word `on` so we know its a built in event listener. This is easier to demo/view with an Andriod Simulator. With iOS be sure to hit your `enter` key.

```jsx
<TextInput
  placeholder="Search"
  style={styles.input}
  autoCapitalize="none"
  autoCorrect={false}
  value={term}
  onChangeText={(newTerm) => onTermChange(newTerm)}
  onEndEditing={() => console.log(`submitted ${term}`)}
/>
```

Very cool, BUT the `SearchScreen` is the component we want to do the API call! Time for another callBack prop. How about `onTermSubmit`?

SearchScreen:

```jsx
...
const SearchScreen = () => {
  const [term, setTerm] = useState('')
  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => console.log(`${term} submitted!`)}
      />
      <Text>{term}</Text>
    </View>
  )
}
...
```

SearchBar:

```jsx
...
      <TextInput
        placeholder="Search"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        onChangeText={(newTerm) => onTermChange(newTerm)}
        onEndEditing={() => onTermSubmit()}
      />
...
```

Actually, we can shorten up our handlers inside SearchBar even further but simply passing a reference to the functions passed in as Props:

```jsx
<TextInput
  placeholder="Search"
  style={styles.input}
  autoCapitalize="none"
  autoCorrect={false}
  value={term}
  onChangeText={onTermChange}
  onEndEditing={onTermSubmit}
/>
```

Great! Our `SeachBar` is complete! Now let's work on making an API request to Yelp.

## Axios and Yelp API Call

We have used the Axios library before in our React projects in the first half of the semester. Luckily, we can use it again here! Don't forget to install it.

```jsx
npm install axios
```

Now, inside your `src/` directory, make a new folder called `api/` and inside it create a file names `yelp.js`. This is where we will preconfigure axios to work with the Yelp API.

yelp.js:

```jsx
import axios from 'axios'

export default axios.create({})
```

In the past we have used axios directly to make a request. Here, we will create an instance of axios with some configuration prebaked for use with Yelp.

`baseURL` - the root url to make the request to, without any params. If you scroll up or jump back to your API docs, you will see the common base URL between both requests is `https://api.yelp.com/v3/businesses`

```jsx
export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
})
```

Now in another file we can import yelp and call something like `yelp.get('/search')`. This saves us time and typos in other files.

`headers` - where we add in our Yelp API key and other config. Remember DONT PUBLISH YOUR API KEY! We will be creating a `.env` file to store it which is already in our `.gitignore` list. Be sure to add it! Luckily since we are using Expo, usage is already enabled... kinda.

yelp.js without .env file:

```jsx
export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer {API KEY HERE DO NOT PUBLISH}',
  },
})
```

To save our API key in our project, but in a file ignored by git/github, we need to install another package:

```bash
expo install react-native-dotenv
```

And update babel.config.js:

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-reanimated/plugin'],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
        },
      ],
    ],
  }
}
```

.env:

```js
REACT_APP_API_KEY = 'YOUR API KEY HERE MAKE SURE .ENV FILES ARE GITIGNORED'
```

updated yelp.js:

```jsx
import axios from 'axios'
import {REACT_APP_API_KEY} from '@env'

console.log(REACT_APP_API_KEY)

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: `Bearer ${REACT_APP_API_KEY}`,
  },
})
```

Now, back in `SearchScreen` import yelp at the top.

```jsx
import yelp from '../api/yelp'
```

We are going to need to hold on to, and watch for changes in our search results so we will need a new piece of state. We can initialize it as an empty array.

```jsx
const [results, setResults] = useState([])
```

Just to make sure we have a visual for if our search worked, replace the `Text` element below the `SearchBar` with:

```jsx
<Text>We have found {results.length} results!</Text>
```

For now, it will be stuck at 0 until we wire up our first request.

Inside SearchScreen.js let's add a new function called searchApi. Don;t forget to flag it as `async`:

```jsx
const searchApi = async () => {
  const response = await yelp.get('/search')
}
```

The info we want is stored inside `response.data`
If we jump back to our Yelp developer docs, we will see the Array of results we are interested in has the key `"businesses"`. So what we ultimately want to store is `response.data.businesses`. We can pass that into `setResults()`.

```jsx
const searchApi = async () => {
  const response = await yelp.get('/search')
  setResults(response.data.businesses)
}
```

OMG so close, but one more thing before we test this out. We need to add in some search parameters to our request. Any key value pairs we add to the `params` object will automatically be appended to the end of our request URL. We will add in our search term, a harcoded location, and up the limit to 50.

```jsx
const searchApi = async () => {
  const response = await yelp.get('/search', {
    params: {
      limit: 50,
      term: term,
      location: 'NYC',
    },
  })
  setResults(response.data.businesses)
}
```

Finally, we need to call our API request `onTermSubmit`.

```jsx
<SearchBar
  term={term}
  onTermChange={(newTerm) => setTerm(newTerm)}
  onTermSubmit={() => searchApi()}
/>
```

Much like before, we can clean this up a bit more and simply pass a reference to `setTerm` and `searchApi` here:

```jsx
<SearchBar term={term} onTermChange={setTerm} onTermSubmit={searchApi} />
```

Time for the big reveal (hopefully). Make sure all of your files are saved, and try searching for `pizza` or `pasta`. If it worked, you should see the results number jump from 0 to 50 after a brief delay. Remember, if you are on an iOS emulator, you need to press the enter key to submit your term.

#### Error handling. Why? Bad cell phone service is a thing.

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

PHEW! That was a lot. This looks like a great place to stop for the day. Next class, we can get back after it and start rendering our results and look at some more new topics!
