import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import IndexScreen from './src/screens/IndexScreen'
import ViewScreen from './src/screens/ViewScreen'
import CreateScreen from './src/screens/CreateScreen'
import EditScreen from './src/screens/EditScreen'
// renaming a generic import to something more specific
import {Provider as DiaryProvider} from './src/context/DiaryContext'

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    View: ViewScreen,
    Create: CreateScreen,
    Edit: EditScreen,
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
