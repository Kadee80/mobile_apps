import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import CounterScreen from './src/screens/CounterScreen'

const navigator = createStackNavigator(
  {
    Home: CounterScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
)

export default createAppContainer(navigator)
