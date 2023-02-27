import Header from './Header'
import Buscador from './Buscador'
import NavBar from './NavBar'
import { ImageSlider } from './ImageSlider'
import { OfertaSlider } from './OfertaSlider'
import { MasPedidosCards } from './MasPedidosCards'
import { ScrollView, View } from 'react-native'
import useLogin from '../../hooks/useLogin'

export default function Home () {
  const { user } = useLogin()
  console.log(user)
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Header />
        <Buscador />
        <OfertaSlider />
        <ImageSlider />
        <MasPedidosCards />
      </ScrollView>
      <View>
        <NavBar />
      </View>
    </View>
  )
}
