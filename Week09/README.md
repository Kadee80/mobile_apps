# Hello Reducers

We ended last class with a random color swatch generator just to prove that local state within components works in React Native the same way it does in React DOM. Today we will build a Screen that allows a user to adjust the Red Green and Blue values for a single swatch by clicking increase and decrease buttons. Basically, a really fancy `counter` example. We will use local State, callback functions, and introduce a new concept: Reducers.

To begin, we will add a new screen named `ColorMixerScreen` and a reusable component named `ColorCounter`. The first part of this demo is full of concepts we have already covered, but please follow along in class for a refresher. Notes for today will pick up when we introduce our first `Reducer`.

Our first pass at this app works, and is totally valid, but just like our ToDo app, there are many ways to solve the same problem.

Things to keep in mind before we introduce useReducer:

- Our app works as is. Totally valid, but could be better.
- We currently have 3 pieces of separate, but very much related state. (we need all three working together for our app to make sense)
- We have defined 2 ways to update each piece of state. So 6 total precise ways of updating state total.
- This is a great learning opportunity!

## What is a reducer?

A reducer is a function that manages changes to an object.

Reducers take 2 arguments:

- an object that contains ALL of our state
- an object that describes the updates to state we wish to make

We use argument 2 to decide how to update argument 1.

We should never change argument 1 (current state) directly. We know this already - don't mutate that state! We need to make a copy of it, make the changes, and then replace argument 1 with it.

NEVER:

```jsx
const state = {red: 0, green: 0, blue: 0}
state.red = 10
```

## Refactor Time!

First things first. We should never use the `useState` hook and `useReducer` to update the same pieces of state. So we will first delete our usage of `useState` and write our reducer from scratch. Because we are doing this to perfectly valid code, I recommend making a copy of this project so that you still have version 1 in your notes!

After deleting anything referencing our `useState` from our `ColorMixerScreen` it should look something like this:

```jsx
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import ColorCounter from '../components/ColorCounter'

const COLOR_INCREMENT = 10

const ColorMixerScreen = () => {
  return (
    <View>
      <Text style={styles.title}>Mix-O-Matic</Text>
      <ColorCounter onIncrease={() => {}} onDecrease={() => {}} color="Red" />

      <ColorCounter onIncrease={() => {}} onDecrease={() => {}} color="Green" />
      <ColorCounter onIncrease={() => {}} onDecrease={() => {}} color="Blue" />
      <View
        style={{
          height: 150,
          width: '100%',
          backgroundColor: `rgb(${red},${green},${blue})`,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#006FFF',
    textAlign: 'center',
  },
})

export default ColorMixerScreen
```

Now, we need to import `useReducer` on line one, and add this line right at the beginning of our ColorMixerScreen function:

```jsx
const [state, dispatch] = useReducer(reducer, {red: 0, green: 0, blue: 0})
```

state: the variable to access our state in one single object

dispatch: coming soon!

inside useReducer:

- This first argument is the reducer function we have yet to write.
- The second is our initial state.

Now let's get started writing our reducer function. By convention, we usually define this outside of our component function.

```jsx
const reducer = (state, howToChangeStateObject) => {
	...
}
```

`state` here is our current state object, the second argument which defines how we want to update argument 1. The name above is long and silly, but super descriptive. Conventionally, the second argument is called `action`.

```jsx
const reducer = (state, action) => {
  // state = {red: number, green: number, blue: number}
  // action = {colorToChange: 'red' | 'green' | 'blue, amount: COLOR_INCREMENT | -COLOR_INCREMENT}
}
```

We take a look at what's inside out `action` and update `state accordingly. We will have several different actions, so we can list out possible changes in a `switch` statement.

```jsx switch(action.colorToChange){
    case 'red':
    case 'green':
    case 'blue':
   default:
  }
```

Now let's add in some logic. We will skip our validation for the first round. Remember NEVER directly update state! We have to rebuild the entire state object with the change we want to make present. This syntax should look pretty familiar, we copy the current state, and then update the new value.

```jsx
const reducer = (state, action) => {
  // state = {red: number, green: number, blue: number}
  // action = {colorToChange: 'red' | 'green' | 'blue, amount: COLOR_INCREMENT | -COLOR_INCREMENT}
  switch (action.colorToChange) {
    case 'red':
      return {...state, red: state.red + action.amount}
    case 'green':
      return {...state, green: state.green + action.amount}
    case 'blue':
      return {...state, blue: state.blue + action.amount}
    default:
      return state
  }
}
```

Now it's time to wire up our new reducer to our existing code. Now it's time to use `dispatch`.

dispatch = run my reducer with the appropriate action object

Here's what that would look like for our `Red` buttons:

```jsx
<ColorCounter
  onIncrease={() => dispatch({colorToChange: 'red', amount: COLOR_INCREMENT})}
  onDecrease={() =>
    dispatch({colorToChange: 'red', amount: -1 * COLOR_INCREMENT})
  }
  color="Red"
/>
```

Cool! Before we test this out, be sure to update your `green` and `blue` buttons accordingly.

One last thing we need to do is update our RGB value of our color swatch at the bottom to use our new state values: The easiest way to do this is to destructure out our colors from our state object:

```jsx
const {red, green, blue} = state
```

## Bringing back Validation

This will be similar to our validation before when we used `useState`. We will start with a classic conditional and refactor to a nice clean ternary. Remember, we ALWAYS need to return a state object, otherwise we wind up wiping out our state altogether!

```jsx
    case 'red':
      if (state.red > 255 || state.red < 0) {
        return state
      }
...
```

That works just fine, but we can make it even cleaner:

```jsx
      return state.red + action.amount > 255 || state.red + action.amount < 0
        ? state
        : {...state, red: state.red + action.amount}
...
```

We cannot use a return statement within a ternary, so we need to place it at the very begining. Do a test with your `red` buttons, and make sure it works before moving on to update `green` and `blue` reducer logic. If you get an error, you have a typo, or forgot to change the color name inside your ternaries.

This may seem a bit overkill to refactor such a small app to use `useReducer`, but this is a nice small contained example of `useReducer` which we can expand upon while building more complex applications.

## One last note about community conventions

We named the properties inside our action object `colorToChange` and `amount`. If you want to read/write code that other developers understand, these to properties within our action object are named:

type: String to describe which change operation we want

payload: the data necessary to make this change

Please note how the `action.type` strings change!

First, in your JSX be sure to update the object keys:

```jsx
      <ColorCounter
        onIncrease={() =>
          dispatch({action: 'change_red', payload: COLOR_INCREMENT})
        }
        onDecrease={() =>
          dispatch({action: 'change_red', payload: -1 * COLOR_INCREMENT})
        }
        color="Red"
      />

...
```

and inside your reducer:

```jsx
  switch (action.type) {
    case 'change_red':
      return state.red + action.payload > 255 || state.red + action.payload < 0
        ? state
        : {...state, red: state.red + action.payload}
...
```

Go through these changes slowly, color by color. If some or none of your Buttons work, you have a typo. There are many opportunities for a typo here! The final code will be posted as soon as we finish the in class demo.
