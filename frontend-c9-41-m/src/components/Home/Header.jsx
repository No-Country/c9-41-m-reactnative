import { Text, View, StyleSheet, Image } from 'react-native'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hola, Claudia.</Text>
      <Image
        source={require('../../../assets/usuario.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  header: {
    marginTop: 30,
    marginLeft: 5,
    fontWeight: 'bold',
    fontSize: 18
  },
  image: {
    height: 37,
    width: 37,
    borderRadius: 20,
    marginTop: 25,
    marginLeft: 200,
    marginRight: 5
  }
})

export default Header
