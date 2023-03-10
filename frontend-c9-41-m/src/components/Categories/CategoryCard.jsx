import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Theme from '../../../theme/Theme'
import { useNavigation } from '@react-navigation/native'

export default function CategoryCard ({ name, image, id }) {
  const navigation = useNavigation()
  const [firstLetter, ...restOfName] = name
  return (
    <TouchableOpacity style={styles.card} onPress={() => { navigation.navigate('Productos', { id }) }}>
      <Image source={{ uri: image }} resizeMode='cover' style={styles.image} />
      <Text style={styles.name}>{firstLetter.toUpperCase() + restOfName.join('')}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 24,
    marginHorizontal: 8
  },
  image: {
    width: 168,
    height: 80,
    borderRadius: 10
  },
  name: {
   color: '#555',
    marginTop: 2,
    marginLeft: 12,
    textAlign: 'center',
    fontFamily: Theme.fontWeights.regular
  }
})
