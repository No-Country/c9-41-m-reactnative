import { faBellConcierge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Theme from '../../theme/Theme'

export default function ({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        <FontAwesomeIcon icon={faBellConcierge} size={72} />
        <Text style={styles.notFound}>404</Text>
        <Text style={styles.secondaryText}>Ups!</Text>
        <Text style={styles.somethingWentWrong}>Algo salió mal!</Text>
      </View>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.goBackText}>Volver al Login</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.colorPrincipal,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notFound: {
    fontSize: 96,
    color: '#fff'
    // fontFamily: Theme.fontWeights.extrabold
  },
  secondaryText: {
    fontSize: 40,
    color: '#fff'
    // fontFamily: Theme.fontWeights.bold
  },
  somethingWentWrong: {
    fontSize: 20
  },
  goBackButton: {
    backgroundColor: '#000',
    width: 328,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 64
  },
  goBackText: {
    color: '#fff',
    fontSize: 20
  }
})
