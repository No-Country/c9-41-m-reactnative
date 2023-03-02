import { View } from 'react-native'
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
    <View />

  )
}

export default ViewConfirmation
