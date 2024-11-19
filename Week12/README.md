# Diary App w/ CRUD and Context

This week we will be generating a new project via command line and building a digital diary/blog app. This will be very similar to our TODO app with React-DOM, but each task will have a separate Screen. We will conclude this app once we have learned how to use Context within a React Native project. Data persistence with an internal API will be our final project for the semester where we build an exercise route tracker.

What is CRUD? CRUD stands for Create Read Update Delete. AKA Add View Edit Destroy.

## Project Generation

CD to your Desktop or whereever you keep your notes for class. We will be creating a new project yet again using:

```bash
npx create-expo-app diary --template blank
```

Once the project generation is complete, `cd`/ `dir` into your project and start it up, don't forget to open the emulator of choice:

```bash
npm run start
```

You may see a note about logs being moved to React Dev Tools. Don't worry about that, you simply need to type `j` to open `Chrome` and `React Dev Tools`.

Now before we even get started, we know we need to install React Navigation. Kill your server/emulator, remember to open your code in VS code, and then enter the following commands:

install react-navigation:

```bash
 npm install react-navigation@4.4.4 --legacy-peer-deps
```

install dependencies:

```bash
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view -- --legacy-peer-deps
```

install react navigation stack

```bash
npm install react-navigation-stack @react-native-community/masked-view --legacy-peer-deps
```

and finally, update your `babel.config.js`. If you do not have a `babel.config.js` create one at the root of your project and add the following code:

```js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  }
}
```

Once again, run:

```bash
npm run start
```

At this point if you have any issues, there is a zip file with the boilerplate inside our class directory. Download and use that for this project or any other project ou wish to create that needs Stack Navigator.

### A note about data location:

So where should our data live? We have 4 screens, the index or `ListScreen` needs an array of posts, the others need only one post at a time, but if one of our screens manages the data that the others rely upon, it's going to get needlessly complicated rather quickly. The solution here is to introduce our old friend from React-DOM, the `Context Provider`. Unlike our ToDo list, where we introduced `Context` in a refactor, here we will start off our project with `Context` in mind.

It's important to note that our `Provider`, will be the parent of `React Navigation`. This is where we will centralize all of our data, and the functions to update it for our diary app. Remember, once we set up `Context` correctly, ANY component can have direct access to the data and callback functions to update the data within. This concept is known as `global state management`. We wont be using `Redux` in this application, but we will essentially rebuild something very close to `Redux` within our `Context Provider`.

## Setting up Home Screen and Stack Navigator

First, open up `App.js` and delete everything. This is where we will create and configure our Stack Navigator. Then, add an `src/` directory to the project, and within `src/` add `components/` and `screens/`. Add a file inside `src/screens/` named `IndexScreen.js`. We will be focusing on the home screen and our context first, before adding any other screens. Use the `rnfes` shortcut with React Snippets to create a boilerplate function for the `IndexScreen`.

Now back in `App.js` we will import our `IndexScreen` and wire it up to a new Stack Navigator to get the screen to show up in our App.

App.js:

```jsx
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import IndexScreen from './src/screens/IndexScreen'

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      // we have not messed with this much yet, but we will customize
      // the titles later on in this project!
      title: 'Diary',
    },
  }
)

export default createAppContainer(navigator)
```

At this point, we changed a LOT. You may see errors. I recommend killing your server and restarting your project and emulator using `npm run start`.

## Wiring up our Context Provider

Right now, our App.js has familiar code. Our `Provider` needs to become a parent of `navigator`. Next up we need to wrap our `navigator` along with all of its child screens it serves up with our Context Provider. This should feel slightly familiar to our ToDo app. The only difference here is we are starting off with Context in place rather than adding it as a refactor down the line!

Remember, `createAppContainer` is a function that wraps our navigator so that a React Component is created. This is one requirement of `App.js`. It MUST export a React component. We need to move a few things around so that we can wrap the component created here in our Provider.

```jsx
...

// make sure our navigator is wrapped in a React Component
const App = createAppContainer(navigator)
// now export our own custom component
export default () => {
  return <App />
}
```

At this point, you may get an error, this can be fixed by importing `React` up at the top. This is due to the fact that there is now JSX in this file, which requires the `React` library to make sense of.

```jsx
import React from 'react'
...
```

Now that we have this anonymous function returning `<App>`, we have the ability to wrap our `App` component with our `Provider`. Rememeber Provider is a component that allows us to share data and callback functions within it with any of its children directly. We don't remove Props, we just get to skip the `parent => child => child` props passing for certain data and callback functions. We still need Props here and there when it makes more sense.

1. Add a new directory inside `src/` named `context/`.
2. Create a new file inside `src/context/` called `DiaryContext.js`
3. Add the following starter code:

```jsx
import React, {createContext} from 'react'

// Create the context for wrapping
const DiaryContext = createContext()

// Create a Provider component which wraps all children DiaryContext.
// Remember children is a Prop we get for free with any component,
// We destructured it right away for direct access

// note, we are not exporting as default! We are saving that for DiaryContext!
export const DiaryProvider = ({children}) => {
  return <DiaryContext.Provider>{children}</DiaryContext.Provider>
}
```

4. Now inside App.js we need to import DiaryProvider to wrap our App:

```jsx
import {DiaryProvider} from './src/context/DiaryContext'
...

// make sure our navigator is wrapped in a React Component
const App = createAppContainer(navigator)
// now export our own custom component, App is children within DiaryProvider
export default () => {
  return (
    <DiaryProvider>
      <App />
    </DiaryProvider>
  )
}
```

At this point you will see a console warning about the `value` prop missing. That's OK, we are about to add it.

5. For now, we will add the `value` prop with the number `7`. Remember from our ToDoContext back around midterms, this value prop is super special and this is where we make all of the values and callback functions available to the rest of our App and all if its children etc. This is just a starting point so we can remember how to access values passed in via Context to any nested child component directly.To access Context elsewhere, we first need to export it as the default:

```jsx
...

export const DiaryProvider = ({children}) => {
  return <DiaryContext.Provider value={7}>{children}</DiaryContext.Provider>
}

export default DiaryContext
```

6. Now inside our `IndexScreen` we need to import `DiaryContext` and make use of the hook `useContext()`:

```jsx
import React, {useContext} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import DiaryContext from '../context/DiaryContext'

const IndexScreen = () => {
  const value = useContext(DiaryContext)
  return (
    <View>
      <Text>Index Screen</Text>
      <Text>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen
```

7. You may need to reload your emulator at this point because this was a major change despite it only being a few lines of code. Type `r` to reload inside terminal.
8. I highly recommend saving this project at this point (maybe zip it) because this is a great boilerplate for starting any project that utilizes `StackNavigator` as well as `Context`!

## Passing in Dummy Diary Posts via Context

Since our `IndexScreen`'s role is to render a list of all of our Diary `posts`, it might be helpful to get rolling with some dummy data so that we can work on `FlatList` that renders out the post's `title` and a delete icon. Out in the real world, you are almost always working off of dummy or `stub` data for some part of the project. Maybe someone else is in charge of the API and endpoints. Maybe you are waiting on approval for data access from some third party. All we really need to know is the `shape` of the data we need to recieve or create in the future to keep ourselves productive.

This will be a good exercise on how to receive more than just a single `value` from `Context` as well as a quick way to get some content on our `IndexScreen`. Our list of posts will be an `Array` of post `Objects`. Remember, we can now treat our Provider as a Parent component, the only difference is anything we wish to share needs to be passed in through that since `value` prop, and destructured on the recieving end using `useContext(DiaryContext)`.

Inside DiaryContext.js:

```jsx
...
export const DiaryProvider = ({children}) => {
  const diaryPosts = [
    {title: 'Dairy Post #1'},
    {title: 'Dairy Post #2'},
    {title: 'Dairy Post #3'},
    {title: 'Dairy Post #4'},
  ]
  return <DiaryContext.Provider value={diaryPosts}>{children}</DiaryContext.Provider>
}
...
```

At this point you will get an error on your emulator because `React` cannot render objects directly. That's fine, let's update our `IndexScreen.js` to use a FlatList and rename `value` to `diaryPosts`:

```jsx
import React, {useContext} from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native'
import DiaryContext from '../context/DiaryContext'

const IndexScreen = () => {
  const diaryPosts = useContext(DiaryContext)
  return (
    <View>
      <Text>Index Screen</Text>
      <FlatList
        data={diaryPosts}
        keyExtractor={(post) => post.title}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen
```

Fantastic! You may need to hit the `r` key a few times to reload it properly. But now we are rendering a static list of posts. Our posts of course are not static, so we know we will need some `State` to keep track of our posts and how they change over time and most importantly, to trigger re-renders when our data changes.

## Introducing State within Context

Now that we can see our posts on the screen, we need to make sure we can update our data. Just like our previous example of Context in React DOM, we can introduce `useState` and all of our `callback functions`. We just need to remember to pass everything down to our `value` prop as a single object. For now, let's move our posts into state and make a sort of placeholder `addDiaryPost()` function.

Rememeber we never directly mutate our `diaryPosts` piece of state, so in our setter, we make a copy of the existing array using `...diaryPosts` and then add our new post to the end. For now we will have a template string with a `#` that updates to give each new post a unique title. Why are we doing this? because we dont even have a `CreateDiaryPostScreen` yet, let alone a bound input on it. We are now passing a new object with `diaryPosts` with a key of `data` (easier to spell) and `addDiaryPost` function can be listed shorthand since the key and value are identical.

```jsx
import React, {createContext, useState} from 'react'

const DiaryContext = createContext()

export const DiaryProvider = ({children}) => {
  const [diaryPosts, setDiaryPosts] = useState([])

  const addDiaryPost = () => {
    setDiaryPosts([
      ...diaryPosts,
      {title: `Diary Post #${diaryPosts.length + 1}`},
    ])
  }
  return (
    <DiaryContext.Provider value={{data: diaryPosts, addDiaryPost}}>
      {children}
    </DiaryContext.Provider>
  )
}

export default DiaryContext
```

Now that our state and a function to add a new post is set up in `Context`, we can now add some code to our `IndexScreen` to invoke `addDiaryPost`. For now we can use our super dumb Primitive `Button` to wire up our callback. But first, let's not forget to update our code to pull values out of context. Remember, we need to destructure our keys individually out of our `useContext` call. Remember `diaryPosts` is passed in as `data`

```jsx
import React, {useContext} from 'react'
import {StyleSheet, Text, View, FlatList, Button} from 'react-native'
import DiaryContext from '../context/DiaryContext'

const IndexScreen = () => {
  const {data, addDiaryPost} = useContext(DiaryContext)
  return (
    <View>
      <Text>Index Screen</Text>
      <Button title="Add Post" onPress={addDiaryPost} />
      <FlatList
        data={data}
        keyExtractor={(post) => post.title}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen
```

Now, if you click on the [Add Post] button, we should see new posts with "smart" titles added to our screen via the `FlatList`! Before we continue, this is a great opportunity to refactor how we are doing thing. Please remember, all of the code we wrote is totally valid code! We could continue to write out our other helper functions just like we did `addBlogPost` and our final code would be just fine. However, since we have learned about the `useReducer` hook, and this is an excellent opportinuty to refactor our existing code with it before continuing further.

## useReducer Refactor

A few reminders on useReducer before we continue. When we call `useReducer()`, we destructure out two things: `state` and `dispatch`. `State` is a single object containing ALL of our app's global state, and we use `dispatch` to call an `action`. Actions contain two keys, a `type` and a `payload`. The `type` is how we tell our reducer how to update `state` within our `switch` statement. The `payload` is optional, and contains any data we need to complete that specific kind of `state` update.

Now it's time to replace `useState` with `useReducer` inside `DiaryContext`:

1. Replace `useState` import with `useReducer`
2. Create a `reducer` function. This is where our `switch` statement that checks by `action.type` resides. We pass our reducer function as the first argument in `useReducer`.
3. The second argument to `useReducer` is our starting state object. Rememeber this is all of our state! Right now our starting state is an empty array.
4. We can delete our `addDiaryPost` function since we no longer have a setter, and all of our updates will be handled by our `postReducer` function.

```jsx
import React, {createContext, useReducer} from 'react'

const DiaryContext = createContext()

const postReducer = (state, action) => {
  // todo: add switch statement w/ action.type
}

export const DiaryProvider = ({children}) => {
  const [state, dispatch] = useReducer(postReducer, [])

  return (
    <DiaryContext.Provider value={{data: state}}>
      {children}
    </DiaryContext.Provider>
  )
}

export default DiaryContext
```

Now it's time to flesh out our `postReducer`. We can make some assumptions about how our different `state` updated might work, before we even have a screen to call them. Our code for the `add_post` case will be basically identical to our `addDiaryPost` function we had written before. Just remember we are calling the array `state` now. Don't forget to return `state` as the `default` aka catch anything that didn't match a case. If we do not return `state`, we risk accidentally wiping out any data we had before and breaking our app.

```jsx
...

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      // copy existing array in state, then add the new post object with a 'smart' title
      return [...state, {title: `Diary Post #${state.length + 1}`}]
    default:
      return state
  }
}

...
```

Now we need to add back our helper function, but this time it will use `dispatch` and an `action type` instead of a state setter. We are adding this back in for now, before we discover a faster way to automate this process.

```jsx
import React, {createContext, useReducer} from 'react'

const DiaryContext = createContext()

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      // copy existing array in state, then add the new post object with a 'smart' title
      return [...state, {title: `Diary Post #${state.length + 1}`}]
    default:
      return state
  }
}

export const DiaryProvider = ({children}) => {
  const [state, dispatch] = useReducer(postReducer, [])

  const addDiaryPost = () => {
    dispatch({type: 'add_post'})
  }
  return (
    <DiaryContext.Provider value={{data: state, addDiaryPost}}>
      {children}
    </DiaryContext.Provider>
  )
}

export default DiaryContext
```

This code will work exactly the same as our version with `useState` earlier. Soon we will come up with a clever way of dispatching our actions without having to add a bunch of helper function code. That part is tedious and why we are opting for `useReducer` instead!

## Automating Some Context (another refactor)

One more refactor. Sometimes, our refactors seem like WHY? But the answer to that is we are future proofing our applications for if/when it grows past the original scope. What if we wanted to add in comments or images later down the road? Right now, our entire `state` is an array of posts. Down the line, we might need another context provider to handle comments or something different but related to our posts. This next refactor is going to create a function that will handle a lot of this context boilerplate for us.

1. Inside `/src/context/` create a new file named `createDataContext.js`.
2. Add imports at the top:

```jsx
import React, {useReducer} from 'react'
```

3. Export default a nameless/anonymous function that takes the 3 arguments we need to create a new Context: `reducer, actions, initialState`. `reducer` will be our reducer function. `actions` will be an array of action objects neccessary to update our state in any way we need. `initialState` will be our starting state. In this case, our initial state was an empty array.

```jsx
export default (reducer, actions, initialState) => {
  // coming soon!
}
```

4. Next we need to create 2 items which we will eventually return from this function. Notes explaining each piece are in the comments below;

```jsx
import React, {useReducer} from 'react'

export default (reducer, actions, initialState) => {
  // we didnt inport createContext, but since its part of React which we have imported,
  // we can call React.createContext()
  const Context = React.createContext()
  // notice we are using super generic variable names here, this is for reuse.
  // We can rename them when we destructure to be more specific
  const Provider = ({children}) => {
    // reducer here is the first argument passed in to our function
    // initialState is the third argument passed in to our function
    const [state, dispatch] = useReducer(reducer, initialState)

    // we are ignoring actions for the moment, and just returning our Context.Provider
    // we will pass state in to our special value prop
    return <Context.Provider value={{state}}>{children}</Context.Provider>
  }

  // finally, we return our generic values in a very specific order
  return {Context, Provider}
}
```

5. Before we address the `actions` that have not been used just yet, let's do a test and make sure we can re-create our `DiaryContext` using this function.
   Inside `DiaryContext`, we now need to import our `createDataContext` at the top. We can now delete the lines of code our new function takes care of for us:

```jsx
import createDataContext from './createDataContext'

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      // copy existing array in state, then add the new post object with a 'smart' title
      return [...state, {title: `Diary Post #${state.length + 1}`}]
    default:
      return state
  }
}

// we no longer need the old Provider code here except for the add_post helper,
// this dispatches an action type, no payload neccessary for this first one
const addDiaryPost = () => {
  dispatch({type: 'add_post'})
}

// now heres the magic, remember the two values we returned from our createDataContext function
export const {Context, Provider} = createDataContext(
  postReducer,
  {addDiaryPost},
  []
)
```

6. That refactor was a little strange, but now we can automate context creating. We are not done just yet! Remember, we need to utilize this Context somewhere in our code! That being said, that nasty refactor will serve us well. Every time we create a new `Context`, the steps are identical, so why not automate it! Now we can focus on writing code that changes the data, rather than the boilerplate stuff.
7. One last thing, we care calling `dispatch` inside `DairyContext` when we created `addDiaryPost` but dispatch is only available inside our `createDataContext` function at the moment. Update your `addDiaryPost` to match the code below.

```jsx
const addDiaryPost = (dispatch) => {
  return () => {
    dispatch({type: 'add_post'})
  }
}
```

8. Now back in `createDataContext` we need to make `dispatch` available to these helper functions that need to call it. Remember how we ignored the second argument `actions` earlier? Time to pay it some attention.

```jsx
import React, {useReducer} from 'react'

export default (reducer, actions, initialState) => {
  const Context = React.createContext()
  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    // Now for our actions argument
    // actions === { addDiaryPost: (dispatch) => { return () => {} } }
    // loop through each action object, and call it with the dispatch argument
    const boundActions = {} // these will be bound with dispatch
    for (let key in actions) {
      // key === 'addBlogPost' (for now just the one)
      // call each action with dispatch and pass it into boundActions
      boundActions[key] = actions[key](dispatch)
    }

    // we pass in each boundAction to our value prop
    return (
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
    )
  }
```

9. We are done with the nasty (but elegant) stuff. Next up is we need to update some of our references in our code.
   Inside `IndexScreen`:

```jsx
import React, {useContext} from 'react'
import {StyleSheet, Text, View, FlatList, Button} from 'react-native'
// we are exporting Context and Provider, we only care about Context here
import {Context} from '../context/DiaryContext'
// if we ever had more than one Context we can rename one or both of them:
// import {Context as AnotherContext} from '../context/AnotherContext'

const IndexScreen = () => {
  // update to pass Context into UseContext
  // data no longer exists, its called state now
  const {state, addDiaryPost} = useContext(Context)
  return (
    <View>
      <Text>Index Screen</Text>
      <Button title="Add Post" onPress={addDiaryPost} />
      <FlatList
        // data is now state
        data={state}
        keyExtractor={(post) => post.title}
        renderItem={({item}) => <Text>{item.title}</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default IndexScreen
```

10. One last update! We need to update `App.js` to import `Provider` NOT `DiaryProvider`:

```jsx
...

import {Provider} from './src/context/DiaryContext'

...

const App = createAppContainer(navigator)

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
}
```

OK! If you have no typos, your App should work the same as before and clicking the [Add Post] button should add sequentially numbered Diary Posts to the screen.

Why did we do all of this? Because this code is more elegant. If you feel more comfortable using a previous version of our code (`useState`, or with a single hardcoded `DiaryContext`), that is perfectly valid code. You will some day have a coworker, that wants to try a refactor like this. Might as well have some practice under your belt!

## A break from the hard stuff: Styling Pass

Now that we have finished our last refactor regarding Context, let's clean up our IndexScreen and render a delete icon next to each post title, and wire up a delete action.

Let's go shopping for a nice `trash` icon in the [Expo Vector Icons Library](https://icons.expo.fyi/Index). You can choose whichever icon you wish, just remember to take note of the name and the name of the library it came from.

IndexScreen.js:

```jsx
import React, {useContext} from 'react'
import {StyleSheet, Text, View, FlatList, Button} from 'react-native'
import {Context} from '../context/DiaryContext'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const IndexScreen = () => {
  const {state, addDiaryPost} = useContext(Context)
  return (
    <View>
      <Button title="Add Post" onPress={addDiaryPost} />
      <FlatList
        data={state}
        keyExtractor={(post) => post.title}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <MaterialIcons name="delete" size={24} color="#333" />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#666',
  },
  title: {
    fontSize: 18,
  },
})

export default IndexScreen
```

## Wiring up the Delete Icon

Now that we have a Delete Icon in place for each post, we can practice adding more actions to our Context by creating a delete action. Before we get to that, we should probably add in an ID property to each of our blog posts. That will make something like `deletePostById` possible.

DiaryContext.js:

```jsx
...

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 10000),
          title: `Diary Post #${state.length + 1}`,
        },
      ]
    default:
      return state
  }
}

...
```

Very briefly, let's print out our new ID property inside our render function within our `FlatList` inside `IndexScreen.js`.

```jsx
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.title}>
              {item.title}-{item.id}
            </Text>
            <MaterialIcons name="delete" size={24} color="#333" />
          </View>
        )}
```

Next up, we need to make our `Icon` Pressable. Since Button won't work, we need to use `TouchableOpacity`. For now, let's just log the `item.id` onPress.

```jsx
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.title}>
              {item.title}-{item.id}
            </Text>
            <TouchableOpacity onPress={() => console.log(item.id)}>
              <MaterialIcons name="delete" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        )}
```

Half way there. Now we need to head over to our `DiaryContext` file to add in an action, helper, and a case to our reducer:

```jsx
import createDataContext from './createDataContext'

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 10000),
          title: `Diary Post #${state.length + 1}`,
        },
      ]
    case 'delete_post':
      // remember filter takes a function, it only keeps values that that inner function returns as truthy
      return state.filter((post) => post.id !== action.payload)
    default:
      return state
  }
}

const addDiaryPost = (dispatch) => {
  return () => {
    dispatch({type: 'add_post'})
  }
}

const deleteDiaryPost = (dispatch) => {
  // agruments like id go here!
  return (id) => {
    dispatch({type: 'delete_post', payload: id})
  }
}

export const {Context, Provider} = createDataContext(
  postReducer,
  {addDiaryPost, deleteDiaryPost},
  []
)
```

Next up, we need to wire it up inside `IndexScreen`:

```jsx
...

const IndexScreen = () => {
  const {state, addDiaryPost, deleteDiaryPost} = useContext(Context)
  return (
    <View>
      <Button title="Add Post" onPress={addDiaryPost} />
      <FlatList
        data={state}
        keyExtractor={(post) => post.title}
        renderItem={({item}) => (
          <View style={styles.row}>
            <Text style={styles.title}>
              {item.title}-{item.id}
            </Text>
            <TouchableOpacity onPress={() => deleteDiaryPost(item.id)}>
              <MaterialIcons name="delete" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

...
```
