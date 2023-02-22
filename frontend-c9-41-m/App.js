import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Car from './src/components/Car'
import Login from './src/components/Login'
import Product from './src/components/Product'
import { Register } from './src/components/Register'

const Stack = createNativeStackNavigator()
export default function App () {
  return (
    <Car />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Login'>
    //     <Stack.Screen name='Login' component={Login} />
    //     <Stack.Screen name='Register' component={Register} />
    //   </Stack.Navigator>
    // </NavigationContainer>

  )
}
