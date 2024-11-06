# Quick Review and Some Differences in React Native

Tuesday's class will consist of a few in class exercises to refresh our memories on some React basics but with a React Native twist.

IMPORTANT NOTE: Some of you have had issues when pulling and opening a project from the repo. Rememeber, `Expo Go` versions and its dependencies are very tightly coupled.

Instead of running `npm install`:

```bash
npm install --legacy-peer-deps
```

## Exercise 1: Reducer Review

Last class, we refactored our `ColorMixerScreen` to utilize the Hook `useReducer` instead of `useState`. Before we move on to a new(ish) topic, let's do a simple in class exercise to reinforce these concepts. In the `Week10a` folder, you will see a `counter-state` project. This is a single screen app with a simple counter app.

#### In Class Exercise 1:

Based on last weeks notes, and reducer community conventions we learned last week, refactor the counter app to utilize `useReducer`. Remember, step one is to delete any/all references to `useState` and the values you destructured out of it.

## In Class Exercise 2: TextInput all React-Native

The next in class exercise will start with a demo of how to bind an input component to local State, and the starter code for showing a validation error message. Please switch to the `in-class-start` directory so that you can continue to add to our miscelaneous screens/notes app.

#### In Class Exercise 2:

Show a styled error message (maybe smaller font, orange text?) if the user enters a `password` that is less than 5 characters long.

## In Class Exercise 3: Layout Styling all React Native.

You have already noticed some default styles applied to our Screens and Primitives. We will explore some layout essentials using `box model`, `flexbox`, and `positioning` properties along with thier RN shortcut properties before you code your final in class exercise for the day.

#### In Class Exercise 3:

Based on what you just learned about default styling and shortcut style properties, create the following layout 3 different ways.

1. Box Model
2. Flexbox
3. Positioning

![Layout Exercise Diagram](./Screenshot%202024-11-04%20at%2010.06.30 PM.png)
