import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
// import our screens for our route mapping
import SearchScreen from './src/screens/SearchScreen'

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

export default createAppContainer(navigator)
