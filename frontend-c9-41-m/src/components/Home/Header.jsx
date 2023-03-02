import { Text, View, StyleSheet, Image } from 'react-native'
import Theme from '../../../theme/Theme'

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Hola, Claudia.</Text>
        <Text style={styles.saludo}>Buenos Días</Text>
      </View>
      <Image
        source={require('../../../assets/perfil.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20
  },
  header: {
    marginTop: 15,
    fontFamily: Theme.fontWeights.bold,
    color: Theme.colors.colorLetras,
    fontSize: 18
  },
  saludo: {
    fontFamily: Theme.fontWeights.extrabold,
    color: Theme.colors.colorPrincipal,
    fontSize: 30
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 20,
    marginTop: 10,
    marginLeft: 110,
    marginRight: 5
  }
})

export default Header
