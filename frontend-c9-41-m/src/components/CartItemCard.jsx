import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Theme from '../../theme/Theme'
import { deleteItemToCart } from '../utils/user/cart'

export default function CartItemCard ({ product, itemId, quantity, updateCart }) {
  const [loading, isLoading] = useState(false)
  const handleDelete = () => {
    isLoading(true)
    deleteItemToCart(itemId)
      .then(() => {
        updateCart(isLoading)
      })
  }
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.images[0].url }} resizeMode='contain' style={{ width: 90, height: 90 }} />
      <View style={styles.rightSection}>
        <View style={styles.nameContainer}>
          <Text style={styles.productInfo}>{product.name.toUpperCase()}</Text>
          <Text style={styles.quantity}> - x{quantity}</Text>
        </View>
        <Text style={styles.price}>${product.price * quantity}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} disabled={loading} onPress={handleDelete}>
        {loading ? <Text style={styles.removeText}>Eliminando...</Text> : <Text style={styles.removeText}>Quitar del Carrito</Text>}
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative'
  },
  rightSection: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  productInfo: {
    textAlign: 'center',
    fontFamily: Theme.fontWeights.bold,
    fontSize: 14
  },
  quantity: {
    fontFamily: Theme.fontWeights.regular,
    fontSize: 12
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  price: {
    fontFamily: Theme.fontWeights.regular,
    fontSize: 12,
    alignSelf: 'flex-end'
  },
  removeButton: {
    position: 'absolute',
    right: 8,
    top: 0
  },
  removeText: {
    color: '#990909',
    textDecorationLine: 'underline',
    fontSize: 10,
    fontFamily: Theme.fontWeights.bold
  }
})
