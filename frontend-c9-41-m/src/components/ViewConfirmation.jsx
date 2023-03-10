import { View, Text, StyleSheet } from 'react-native'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const ViewConfirmation = () => {
  const Gohome = () => {
    const navigation = useNavigation()
    navigation.navigate('Inicio')
  }
  useEffect(() => {
    const timer = setTimeout(() => { Gohome() }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <View style={styles.container}>
      <Text> Se confirmo con exito tu </Text>
      <Text> pedido </Text>
    </View>

  )
}

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: 160
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }

})

export default ViewConfirmation
