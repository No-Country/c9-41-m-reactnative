
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Theme from '../../../theme/Theme'
import { addItemToCart } from '../../utils/user/cart'

const Dishes = ({ route }) => {
  const { product } = route.params
  const navigation = useNavigation()
  const [quantity, setQuantity] = useState(1)
  const [loading, isLoading] = useState()
  const more = () => { setQuantity(quantity + 1) }
  const less = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleCart = () => {
    isLoading(true)
    addItemToCart({
      productId: product._id,
      quantity
    })
      .then(() => { isLoading(false) })
      .finally(() => { navigation.navigate('Carrito') })
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.images[0].url }}
        style={styles.image}
      />

      <Text style={styles.nombre}>{product.name.toUpperCase()}</Text>
      <Text style={styles.price}>${product.price * quantity}</Text>
      <View style={styles.container_contador}>
        {/* contador */}
        <View style={styles.container_counter}>
          <TouchableOpacity style={styles.container_buttonminus} onPress={less}>
            <Text style={styles.addorDegreeText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.container_button}>{quantity}</Text>
          <TouchableOpacity style={styles.container_buttonplus} onPress={more}>
            <Text style={styles.addorDegreeText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text />
      </View>
      <View style={styles.container_description}>
        <Text style={styles.description}>Descripcion del producto</Text>
        <Text style={styles.descriptionInfo}>
          {product.description}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.add} onPress={handleCart} disabled={loading}>
          {
            loading ? <Text style={{ color: 'white' }}>Agregando....</Text> : <Text style={{ color: 'white' }}>Agregar al carrito</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  image: {
    width: 190,
    height: 190,
    resizeMode: 'contain'
  },
  nombre: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: Theme.fontWeights.bold
  },
  container_contador: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  container_counter: {
    display: 'flex',
    flexDirection: 'row'
  },
  container_button: {
    height: 40,
    backgroundColor: '#FB6D3B',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white'
  },
  container_buttonminus: {
    height: 40,
    backgroundColor: '#FB6D3B',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  addorDegreeText: {
    color: '#fff',
    fontFamily: Theme.fontWeights.bold,
    fontSize: 20
  },
  container_buttonplus: {
    height: 40,
    backgroundColor: '#FB6D3B',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5
  },
  price: {
    fontSize: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: Theme.fontWeights.extrabold,
    marginVertical: 18

  },
  add: {
    marginTop: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB6D3B',
    height: 40,
    width: 330,
    borderRadius: 10

  },
  container_description: {
    marginTop: 50,
    alignSelf: 'flex-start'
  },
  description: {
    fontSize: 16,
    fontFamily: Theme.fontWeights.extrabold
  },
  descriptionInfo: {
    fontSize: 14,
    fontFamily: Theme.fontWeights.regular,
    marginVertical: 12
  }
})

export default Dishes
