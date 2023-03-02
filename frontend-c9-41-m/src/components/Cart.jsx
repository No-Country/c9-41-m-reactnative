import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import Theme from '../../theme/Theme'
import useCart from '../hooks/useCart'
import CartItemCard from './CartItemCard'
import NavBar from './Home/NavBar'

const Cart = () => {
  const navigation = useNavigation()
  const { cart, total, updateCart, loading } = useCart()
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={cart}
        renderItem={({ item }) => {
          return <CartItemCard itemId={item._id} product={item.productId} quantity={item.quantity} updateCart={updateCart} />
        }}
        keyExtractor={({ _id }) => _id}
        scrollEnabled
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: </Text>
        {loading && <Text style={styles.totalPrice}>Cargando...</Text>}
        {!loading && <Text style={styles.totalPrice}>${total}</Text>}
      </View>
      <TouchableOpacity style={styles.add} onPress={() => { navigation.navigate('Medio de pago', { total }) }}>
        <Text style={styles.goToPayText}>Ir a pagar</Text>
      </TouchableOpacity>
      <NavBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingVertical: 12,
    flexGrow: 1
  },
  add: {
    alignSelf: 'center',
    marginVertical: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.colorPrincipal,
    height: 50,
    borderRadius: 10,
    width: 330
  },
  goToPayText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Theme.fontWeights.regular
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  totalText: {
    fontSize: 18,
    fontFamily: Theme.fontWeights.bold
  },
  totalPrice: {
    fontSize: 22,
    fontFamily: Theme.fontWeights.regular
  }
})

export default Cart
