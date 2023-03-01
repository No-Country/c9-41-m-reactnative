import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/components/Login'
import { Register } from './src/components/Register'
import Home from './src/components/Home/Home'
import Categories from './src/components/Categories'
import MedioDePago from './src/components/MedioDePago'
import { Favorites } from './src/components/Favorites/Favorites'
import Dishes from './src/components/Carousel/Dishes'

// const Stack = createNativeStackNavigator()
export default function App () {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Login'>
    //     <Stack.Screen name='Login' component={Login} />
    //     <Stack.Screen name='Register' component={Register} />
    //     <Stack.Screen name='Home' component={Home} />
    //     <Stack.Screen name='Categories' component={Categories} />
    //     <Stack.Screen name='MediodePago' component={MedioDePago} />
    //     <Stack.Screen name='Favorites' component={Favorites} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <Dishes name='Pastas salsa roja de especialidad' description='Salsa roja bolonesa o carne cortado cuchillo y Salsa roja con pollo.' price='1700' imagen='pasta1' />
  )
}
// Exportar todas los componentes de la misma forma, se recomienda export default porque en los archivos solo se exporta una sola función, que es el componente
