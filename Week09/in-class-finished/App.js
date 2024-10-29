import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen'
import TutorialScreen from './src/screens/TutorialScreen'
import ListScreen from './src/screens/ListScreen'
import ImageScreen from './src/screens/ImageScreen'
import ColorScreen from './src/screens/ColorScreen'

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Tutorial: TutorialScreen,
    List: ListScreen,
    Image: ImageScreen,
    Color: ColorScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
)

export default createAppContainer(navigator)
