import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCartShopping, faClipboard, faHeart, faHome } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  return (
    <View style={styles.Container}>
      <View>
        <TouchableOpacity style={styles.boton}>
          <FontAwesomeIcon icon={faHome} size={34} />
          <Text style={styles.inicio}>
            Inicio
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.boton}>
          <FontAwesomeIcon icon={faCartShopping} size={34} />
          <Text style={styles.pedidos}>
            Pedidos
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.boton}>
          <FontAwesomeIcon icon={faClipboard} size={34} />
          <Text style={styles.carta}>
            Carta
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.boton}>
          <FontAwesomeIcon icon={faHeart} size={34} />
          <Text style={styles.favoritos}>
            Favoritos
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 60,
    paddingTop: 5,
    marginLeft: -4,
    width: '93%'
  },
  boton: {
    position: 'absolute'
  },
  inicio: {
    top: 5,
    left: 3,
    fontSize: 10
  },
  pedidos: {
    top: 5,
    left: -3,
    fontSize: 10
  },
  carta: {
    top: 5,
    left: 1,
    fontSize: 10
  },
  favoritos: {
    top: 5,
    left: -8,
    fontSize: 10
  }
})

export default NavBar
