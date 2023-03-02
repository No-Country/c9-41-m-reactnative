import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/components/Login'
import { Register } from './src/components/Register'
import Home from './src/components/Home/Home'
import Categories from './src/components/Categories'
import MedioDePago from './src/components/MedioDePago'
import { Favorites } from './src/components/Favorites/Favorites'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import NotFound from './src/components/NotFound'

const Stack = createNativeStackNavigator()

export default function App () {
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf')
  })

  useEffect(() => {
    async function prepare () {
      await SplashScreen.preventAutoHideAsync()
    }
    prepare()
  }, [])

  if (!fontsLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync()
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Registro' component={Register} />
        <Stack.Screen name='Inicio' component={Home} />
        <Stack.Screen name='Carta' component={Categories} />
        <Stack.Screen name='Carrito' component={MedioDePago} />
        <Stack.Screen name='Favoritos' component={Favorites} />
        <Stack.Screen name='Not Found' component={NotFound} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
// Exportar todas los componentes de la misma forma, se recomienda export default porque en los archivos solo se exporta una sola función, que es el componente
