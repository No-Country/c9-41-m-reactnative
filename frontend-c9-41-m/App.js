import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/components/Login'
import { Register } from './src/components/Register'
import Home from './src/components/Home/Home'
import Categories from './src/components/Categories/Index'
const Stack = createNativeStackNavigator()
export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Categories' component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// Exportar todas los componentes de la misma forma, se recomienda export default porque en los archivos solose exporta una sola función, que es el componente
