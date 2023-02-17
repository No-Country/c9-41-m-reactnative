import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Categories } from './src/components/Categories'
import LoginFormikYup from './src/components/LoginFormikYup'
import { Register } from './src/components/Register'

const Stack = createNativeStackNavigator()
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Nuestra Carta'>
        <Stack.Screen name='Login' component={LoginFormikYup} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Nuestra Carta' component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
