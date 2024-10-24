# Hello Mobile World!

For the first half of the semester, we learned React basics. Concepts like `Props`, `State` components and file organization are all still applicable in React Native, but some fundamentals like navigation, and styling will be slightly different. Think of it like this, we learned the Spanish language for the first half of the semester, but now we are going to start learning Italian. Tons of overlap, but just enough differences for it to be confusing if we don’t pay close attention.

## Getting a project on your phone using Expo

For today, we will learn how to get a simple boilerplate project up and running on our phone. We will take a look at what’s similar and what’s different from our previous developer experience using React-DOM. First up, we need to download and `cd`/`dir` into the starter project. We will be using a starter boilerplate for the next week or so before diving into creating our own project from scratch.

IMPORTANT NOTE:
Windows users will need to download and use PowerShell. Some of you have been using Git Bash or VS Codes built in terminal. Expo may/will not work correctly with these other applications. Please download and install PowerShell before continuing. Mac users should be using Terminal and NOT the command line in VS Code.

1- Download the starter .zip file from this week’s directory in the class repo. Unzip it.

2- Change into the boilerplate folder in Terminal or PowerShell.

3- In terminal, run `npm install --legacy-peer-deps`
If you have any errors, make sure you have a recent version of Node installed.

4- Run `npm start`. Instead of opening up your browser like before, this script opens the React Native Bundler (bundles up your code to run on a mobile device).

5- Install `Expo` app on your phone or mobile device.

6- Open up Expo Go on your device and scan the QR code in terminal!

7- You should see a very minimal App load on your device! If you make any changes to your code, Expo will take a brief second to re-bundle and your changes should show up on the screen.

8- CNTRL/Command + C kills your build in terminal and a message should display on your device.

9- In the event that you save your code with errors and the bundler gets 'stuck', you can shake your device to pull up an options menu to reload. (Obviously don't bother reloading until the errors have been fixed in your code). Code errors and location are usually displayed on the screen of your device with some very helpful error messages!

## Similar but Different

Now that we have our project up and running on our device, let's take a look at the code and see what looks familiar and what is new and confusing.

Open up `HomeScreen.js`:

```jsximport React from 'react'
import {Text, StyleSheet} from 'react-native'
```

As you can see, we are still importing React from 'react' just as we did in previous projects, but instead of importing elements from `react-dom` we are importing `react-native` on line 2.

You will see we are importing a React Native `Primitive` component called Text. We can use this whenever we need text to appear in our component. Any text placed outside of a `Text` primitive will cause an error.

```jsx
const HomeScreen = () => {
  return <Text style={styles.text}>HomeScreen</Text>
}
```

Other 'primitives' we will be utilizing soon are:

View - element used to group other elements or styling.

Image - shows an image

Button - renders a button a user can press. It gives us feedback when pressed.

We still have a React functional component which is returning some JSX. This should look familiar!

```jsx
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
})
```

In line 2, we imported `{ StyleSheet } ` from 'react-native' as well. After our component is defined, we use `StyleSheet.create()` to `validate` a set of styling rules. Using this is optional, aka we can also pass styles directly into our JSX.

Now let's take a look at `App.js`:

This is all new stuff! For now let's just make sure we know that `appNavigator` is a tool from another library called `React Navigation` which allows us to show different screens to the user.

### In Class Exercise: Adding a new 'screen'

Together we will add a new file to the `screens/ ` directory and load it instead of the HomeScreen. This will be to review everything covered so far.

## Lists with FlatList

I highly recommend installing the plugin `React Snippets` into your VS code if you have not already done so! Once you have created your new ListScreen.js file type `rnfes` and hit enter. Boom! you should have some really useful boilerplate code containing everything we just discussed!

```jsx
import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

const ListScreen = () => {
  return (
    <View>
      <Text>ListScreen</Text>
    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({})
```

Personally, I like to change the import order at the top and change the export default to be the last line, but all the starter pieces are there for us which can help us avoid some common/simple errors.

In the past, we have used a mapping function to iterate over some data and render some JSX on the screen. In React Native, we have access to another primitive called `FlatList` which uses props to turn an array of data into a list of JSX elements.

#### FlatList Props:

data - an array of data we will use to create multiple elements from

renderItem - a function that turns each data item into a JSX element.

To get started, make sure you import {FlatList} along with the rest of your primitives.

Next up, we will need some data, we can define this inside our component:

```jsx
const chickens = [
  {name: 'Silky Johnson'},
  {name: 'Bilbo Baggins'},
  {name: 'Castor Troy'},
  {name: 'Pollux Troy'},
  {name: 'Sean Archer'},
  {name: 'Cameron Poe'},
  {name: 'Nikki Cage'},
]
```

Now for the JSX part:

```jsx
<FlatList
  data={chickens}
  renderItem={(element) => {
    console.log(element)
    // NOTE: element contains item, and index much like our mapping function in the past!
  }}
/>
```

Since we are already destructuring pros, let's pull out just the item for our `renderItem` function:

```jsx
<FlatList
  data={chickens}
  renderItem={({item}) => {
    console.log(item)
  }}
/>
```

Great! Now let's return some JSX instead of console.logging:

```jsx
renderItem={({item}) => {
          return <Text>{item.name}</Text>
        }}
```

What about Keys? Yup! We still need them. First, let's take a second to talk about why we need a key prop at all.

Without keys, our list will continue to work just fine. But what happens if we want to delete an item in our Array? Behind the scenes, React Native deletes the ENTIRE LIST and then re-renders the entire thing based on the new Array. By Providing a key, React now knows exactly which item was deleted, and proceeds to delete just the one item.

The key prop allows React to tie an item of data in a list to a particular element rendered on the screen! This is a great performance optimization when we begin updating our list on the fly!

Instead of modifying our data to contain a key for each item, or even using the `index` we have access to in our renderItem function, we can use a keyExtractor prop!

```jsx
<FlatList
  keyExtractor={(chicken) => chicken.name}
  data={chickens}
  renderItem={({item}) => {
    return <Text>{item.name}</Text>
  }}
/>
```

Now we are assigning the name (which should be unique) as the key as well! Just another example of how 'similar' but 'different' React Native land is!

Let's take a look at some other optional `props` we can add in to our FlatList. First, Let's add some styling to each Text element so that we need to scroll to see all of our items.

```jsx
const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 60,
  },
})
```

Don't forget to apply the style in your JSX!

```jsx
<Text style={styles.textStyle}>{item.name}</Text>
```

Optional Props:

**horizontal:** boolean, makes the list scroll horizontally

**showsHorizontalScrollIndicator:** boolean, shows/hides the scrollbar on the screen when scrolling horizontally
