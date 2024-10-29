# Buttons TouchableOpacity and Navigation

So far, we have explored a few of React Native's Primitives like `View` and `Text`, and then`FlatList`. We made new screens/views for each of these mini tutorials. Today we are going to do a deeper dive into our `App.js` and how to navigate between these screens. In order to do that, we must first look at Buttons with RN.

There are two ways we can achieve this. There is a `Button` Primitive, which is a simple component that can detect press events. There is also `TouchableOpacity` which allows us to make a custom component perusable. Notice we are using the term `Press` instead of `Click` now that we are now dealing with touch screens only.

Our first step is to add 2 buttons to our `HomeScreen`.

To make sure our `HomeScreen` loads first, be sure to change `initialRouteName` back to `HomeScreen` in `App.js`.

In `HomeScreen.js` be sure to import the Button Primitive at the very top. Our Button component from RN is very simple. Unlike our custom Button component in ReactDOM, we do not wrap our Button text with opening and closing `<Button>` tags. Instead, we assign a String value to the `title` prop. Instead of onClick, we now have an `onPress` event listener. For now we will just `console.log` something basic like "button pressed". You will see the output of a console.log inside your terminal window.

```jsx
import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title="Go to tutorial screen"
        onPress={() => console.log('button pressed!')}
      />
    </View>
  )
}
```

Great! The `Button` Primitive is simple to use, but not very customizable. If we want more control over a pressable component, we can use `TouchableOpacity`. Let's do that for our second button. Don't forget to import it up at the very top!

Unlike `Button`, `TouchableOpacity` has both an opening and closing tag and everything wrapped within it (children) will be pressable via the `onPress` event. You will also notice that unlike the `Button`, `TouchableOpacity` has no default styling, and is already more customizable.

```jsx
import React from 'react'
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native'

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title="Go to tutorial screen"
        onPress={() => console.log('button pressed!')}
      />
      <TouchableOpacity
        onPress={() => console.log('TouchableOpacity pressed!')}
      >
        <Text>Go to list screen</Text>
      </TouchableOpacity>
    </View>
  )
}
```

Take a look at your simulator, and click the "Go to list screen" text. You'll see some visual feedback has been added for the user onPress. This fade effect will be applied to any children elements within.

## Adding in navigation to our two Pressable Elements

Now that we have 2 different elements that detect an `onPress` event, let's wire them up to React Natives navigation system. Open up `App.js` and let's take a look at the Stack Navigator object. The Stack Navigator is responsible for deciding what screen to render, and when it does so, it passes along some configuration props to the appropriate Screen.

Let's take a look at the HomeScreen's Props with `console.log`

```jsx
const HomeScreen = (props) => {
  console.log(props)
...
```

Now when the HomeScreen first loads, we should see a large object logged in our terminal window:

```js
{
  "navigation": {
    "actions": {
	"dismiss": [Function dismiss],
   	 "goBack": [Function goBack],
   	 "navigate": [Function navigate],
    	"pop": [Function pop],
    	"popToTop": [Function popToTop],
    	"push": [Function push],
    	"replace": [Function replace],
    	"reset": [Function reset],
    	"setParams": [Function setParams]
  },
    "addListener": [Function addListener],
    "dangerouslyGetParent": [Function anonymous],
    "dismiss": [Function anonymous],
    "dispatch": [Function anonymous],
    "emit": [Function emit],
    "getChildNavigation": [Function getChildNavigation],
    "getParam": [Function anonymous],
    "getScreenProps": [Function anonymous],
    "goBack": [Function anonymous],
    "isFirstRouteInParent": [Function isFirstRouteInParent],
    "isFocused": [Function isFocused],
    "navigate": [Function anonymous],
    "pop": [Function anonymous],
    "popToTop": [Function anonymous],
    "push": [Function anonymous],
    "replace": [Function anonymous],
    "reset": [Function anonymous],
    "router": undefined,
    "setParams": [Function anonymous],
    "state": {
      "key": "id-1730161953958-0",
      "routeName": "Home"
    }},
    "screenProps": undefined
  }
```

Lot's of props are getting passed in because of our Stack Navigator. You'll notice that there is one called `navigate`. This is a function we can use to change what content is displayed on our device. When we call navigate() we need to pass it a string. If that string matches one of our Routes we defined in `App.js` we will load that Screen,

```jsx
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Tutorial: TutorialScreen,
    Lists: ListScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
)
```

In our current App, we can call navigate and pass in one of the strings `'Home' | 'Tutorial' | 'Lists'`. Let's replace our console.logs with the navigate function for the appropriate page:

```jsx
const HomeScreen = (props) => {
  return (
    <View>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title="Go to tutorial screen"
        onPress={() => props.navigation.navigate('Tutorial')}
      />
      <TouchableOpacity onPress={() => props.navigation.navigate('Lists')}>
        <Text>Go to list screen</Text>
      </TouchableOpacity>
    </View>
  )
}
```

When we test it out on our emulator or device, we will see that a blue back button automatically added to the header of our screen. This works great, but since we already know how to destructure props, let's go ahead an refactor our HomeScreen to do so and save us from some potential dot notation typos down the line. Also, this demo looked at both `Button` and `TouchableOpacity`, but in reality, we probably only need the `Button` Primitive here.

```jsx
const HomeScreen = (props) => {
  // this should be familiar
  const {navigation} = props
  // we can take it one step further an pull out just the navigate function
  const {navigate} = navigation

  return (
    <View>
      <Text style={styles.textStyle}>Home Screen</Text>
      <Button
        title="Go to tutorial screen"
        onPress={() => navigate('Tutorial')}
      />
      <Button title="Go to list screen" onPress={() => navigate('Lists')} />
    </View>
  )
}
```

## Image Primitives and Reusable Components with Props

Now that we have the ability to navigate between screens, let's add another Screen and take a look a making our own reusable components like we have in the past. This next screen, will show a series of 'Cards' with an image and some text for each.

We will call this Screen `ImageScreen` and each `ImageCard` will take a `name` and an `img` prop.

First, make a new file inside screens/ called `ImageScreen`:

```jsx
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const ImageScreen = () => {
  return (
    <View>
      <Text>Image Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ImageScreen
```

### In Class Exercise:

Now that we've looked at Buttons, Stack Navigator, and the navigator.navigate() function. Take a moment to wire up a button on our Home Screen that navigates to our starter ImageScreen.

## Image Primitive and our ImageCard component

This will be our first time creating a reusable component for use in our screens. We need to create a `components/` directory inside `src/`.

Create a new file inside `components/` named `ImageCard` and add the starter boilerplate for a new RN component.

`ImageScreen` is the parent component for `ImageCard`. Import the `ImageCard` component at the top of your screen so we can start thinking about how to render multiple different `ImageCards`.

```jsx
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import ImageCard from '../components/ImageCard'
const ImageScreen = () => {
  return (
    <View>
      <Text>Image Screen</Text>
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <ImageCard />
    </View>
  )
}

const styles = StyleSheet.create({})

export default ImageScreen
```

If you navigate to the ImageScreen you should see the words Image Card 4 times. Now it's time to customize them with props.

ImageScreen:

```jsx
<ImageCard name="Castor Troy" />
```

ImageCard:

```jsx
const ImageCard = (props) => {
  const {name} = props
  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}
```

This whole process is the same as with ReactDOM. Now it's time for the image. First, we need some images for our ImageCards. Please download the images.zip from this week's directory in the class repo and copy and paste them into the `assets` folder of our project. This is where we put any static content (like images that don't change).

For our first pass, we will hardcode in the same image for each ImageCard just to get the hang of using the `Image` Primitive.

```jsx
import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

const ImageCard = (props) => {
  const {name} = props
  return (
    <View>
      <Image source={require('../../assets/cameron-poe.png')} />
      <Text>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default ImageCard
```

Notice how Image takes a prop called `source` which uses the require keyword to load the relative path to an image in our `assets/` folder.

Now we need to pass in the image source as a prop in ImageScreen:

```jsx
<ImageCard
  name="Bilbo Baggins"
  src={require('../../assets/bilbo-baggins.png')}
/>
```

If you see a ridiculous chicken in your emulator, you did it correctly.

## In Class Exercise:

Now that our `ImageCard` component is rendering correctly, take a moment to make an Array of prop/data objects for all of our `ImageCards` in `ImageScreen`. Use a `FlatList` to iterate through this array and render each individual `ImageCard`.
