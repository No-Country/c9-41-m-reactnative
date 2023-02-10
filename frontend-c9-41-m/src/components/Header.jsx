
import { Text, View, StyleSheet, Image } from 'react-native'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hola, Claudia.</Text>
      <Image
        source={require('../../assets/usuario.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  header: { marginTop: 30, marginLeft: 5, fontWeight: 'bold', fontSize: 20 },
  image: { height: 40, width: 40, borderRadius: 20, marginTop: 30, marginLeft: 230, marginRight: 5 }
})

export default Header
