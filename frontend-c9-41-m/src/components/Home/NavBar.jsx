import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCartShopping, faClipboard, faHeart, faHome } from '@fortawesome/free-solid-svg-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import Theme from '../../../theme/Theme'
const NavBar = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const isActive = (screenName) => {
    return route.name === screenName
  }
  return (
    <View style={styles.Container}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Inicio')} style={styles.button}>
          <FontAwesomeIcon icon={faHome} size={24} style={isActive('Inicio') ? [styles.buttonText, styles.activeButton] : styles.buttonText} />
          <Text style={isActive('Inicio') ? [styles.buttonText, styles.activeButton] : styles.buttonText}>
            Inicio
          </Text>

        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Carrito')} style={styles.button}>
          <FontAwesomeIcon icon={faCartShopping} size={24} style={isActive('Carrito') ? [styles.buttonText, styles.activeButton] : styles.buttonText} />
          <Text style={isActive('Carrito') ? [styles.buttonText, styles.activeButton] : styles.buttonText}>
            Pedidos
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Carta')} style={styles.button}>
          <FontAwesomeIcon icon={faClipboard} size={24} style={isActive('Carta') ? [styles.buttonText, styles.activeButton] : styles.buttonText} />
          <Text style={isActive('Carta') ? [styles.buttonText, styles.activeButton] : styles.buttonText}>
            Carta
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Favoritos')} style={styles.button}>
          <FontAwesomeIcon icon={faHeart} size={24} style={isActive('Favoritos') ? [styles.buttonText, styles.activeButton] : styles.buttonText} />
          <Text style={isActive('Favoritos') ? [styles.buttonText, styles.activeButton] : styles.buttonText}>
            Favoritos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 4,
    marginTop: 4
  },
  button: {
    alignItems: 'center'
  },
  buttonText: {
    color: '#BBB',
    fontSize: 12
  },
  buttonIcon: {
    color: '#BBB'
  },
  activeButton: {
    color: Theme.colors.colorPrincipal
  }
})

export default NavBar
