import { View, Text, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell, faCartShopping, faClipboard, faHome } from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
  return (
    <View style={styles.container}>

      <View>
        <FontAwesomeIcon icon={faHome} size={34} />
        <Text>
          Inicio
        </Text>
      </View>
      <View>
        <FontAwesomeIcon icon={faCartShopping} size={34} />
        <Text>
          Pedidos
        </Text>
      </View>
      <View>
        <FontAwesomeIcon icon={faClipboard} size={34} />
        <Text>
          Carta
        </Text>
      </View>
      <View style={styles.Notification}>
        <FontAwesomeIcon icon={faBell} size={34} />
        <Text>
          Notificación
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  NavBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  Notification: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'

  },
  container: {
    display: 'flex',
    position: 'absolute',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default NavBar
