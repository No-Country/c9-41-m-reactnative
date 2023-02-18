import { StyleSheet, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCartShopping, faClipboard, faHeart, faHome } from '@fortawesome/free-solid-svg-icons'
export default function Navbar () {
  return (
    <View style={styles.navbar}>
      <View style={styles.button}>
        <FontAwesomeIcon icon={faHome} />
        <Text>Inicio</Text>
      </View>
      <View style={styles.button}>
        <FontAwesomeIcon icon={faCartShopping} />
        <Text>Pedidos</Text>
      </View>
      <View style={styles.button}>
        <FontAwesomeIcon icon={faClipboard} />
        <Text>Carta</Text>
      </View>
      <View style={styles.button}>
        <FontAwesomeIcon icon={faHeart} />
        <Text>Favoritos</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  button: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
