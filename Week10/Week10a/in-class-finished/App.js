import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomeScreen from './src/screens/HomeScreen'
import TutorialScreen from './src/screens/TutorialScreen'
import ListScreen from './src/screens/ListScreen'
import ImageScreen from './src/screens/ImageScreen'
import ColorScreen from './src/screens/ColorScreen'
import ColorMixerScreen from './src/screens/ColorMixerScreen'
import TextInputScreen from './src/screens/TextInputScreen'
import BoxModelScreen from './src/screens/BoxModelScreen'
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Tutorial: TutorialScreen,
    List: ListScreen,
    Image: ImageScreen,
    Color: ColorScreen,
    Mix: ColorMixerScreen,
    Input: TextInputScreen,
    Box: BoxModelScreen,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: 'App',
    },
  }
)

export default createAppContainer(navigator)
