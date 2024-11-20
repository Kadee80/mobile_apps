import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import IndexScreen from './src/screens/IndexScreen'

import {DiaryProvider} from './src/context/DiaryContext'

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      // we will customize titles per screen later on!
      title: 'Diary',
    },
  }
)

// make sure our navigator is wrapped in a React component
const App = createAppContainer(navigator)
// now we export our own custom component, App is children within DiaryProvider
export default () => {
  return (
    <DiaryProvider>
      <App />
    </DiaryProvider>
  )
}
