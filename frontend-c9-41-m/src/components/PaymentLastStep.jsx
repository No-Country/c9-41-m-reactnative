import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import Theme from '../../theme/Theme.j'

const order = [
  {
    id: 1,
    name: 'Pastas de especialidades',
    price: 1800
  },
  {
    id: 2,
    name: 'Delivery',
    price: 250
  },
  {
    id: 3,
    name: 'Comisión',
    price: 50
  }
]
export default function PaymentLastStep () {
  const total = order.reduce((acc, curr) => acc + curr.price, 0)

  return (
    <View style={styles.container}>
      <View style={styles.orderContainer}>
        <View style={styles.orderBox}>
          {order.map(({ name, price, id }) => (
            <View key={id} style={styles.productCard}>
              <Text>
                {name}
              </Text>
              <Text>
                ${price}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalText}>${total}</Text>
      </View>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyText}>Pedir</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight + 24,
    paddingHorizontal: 16,
    flex: 1
  },
  orderContainer: {
    flexGrow: 1
  },
  orderBox: {
    borderWidth: 1,
    borderColor: '#00000036',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  totalText: {
    fontSize: 16
  },
  buyButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.colorPrincipal,
    borderRadius: 10,
    marginVertical: 40
  },
  buyText: {
    fontSize: 16,
    color: Theme.colors.colorTerciario,
    paddingVertical: 12
  }
})
