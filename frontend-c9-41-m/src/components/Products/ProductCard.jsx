import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Theme from '../../../theme/Theme'

export default function ProductCard ({ product }) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: product.images[0].url }} style={{ width: 90, height: 90 }} resizeMode='contain' />
      <View style={styles.cardInfo}>
        <Text style={styles.text}>{product.name.toUpperCase()}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#777'
  },
  cardInfo: {
    flexGrow: 1
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Theme.fontWeights.bold
  },
  price: {
    textAlign: 'right',
    fontSize: 10,
    fontFamily: Theme.fontWeights.bold
  }

})
