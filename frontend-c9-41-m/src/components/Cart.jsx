import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Theme from '../../theme/Theme'
import useCart from '../hooks/useCart'
import NavBar from './Home/NavBar'

const Cart = () => {
  const { cart } = useCart()
  console.log({ cart })
  return (
    <View style={styles.container}>
      <View style={styles.container_pedido}>
        <Text style={styles.text_pedidos}>Tu pedido</Text>
        <Text>Felipe Vallece 478-Argentina</Text>
        <TextInput style={styles.input_nota} />
        <Text style={styles.text_nombre}>Pastas de especialidades</Text>
        <Text style={styles.text_contenido}>Tallarines con salsa de carne o pollo + coca cola de 375 ml</Text>
        <View style={styles.container_contador}>
          <Text style={styles.multiplied}>$1800</Text>
          <View style={styles.container_counter}>
            <TouchableOpacity style={styles.container_buttonminus}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
            </TouchableOpacity>
            <Text style={styles.container_button}>1</Text>
            <TouchableOpacity style={styles.container_buttonplus}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.container_algomas}>
          <Text style={styles.text_mas}>¿Querés agregar algo más?</Text>
          <View style={styles.container_carrusel}>
            <TextInput style={styles.input_mas} />
            <TextInput style={styles.input_mas} />
            <TextInput style={styles.input_mas} />
          </View>
        </View>
        <TouchableOpacity style={styles.add}>
          <Text style={styles.goToPayText}>Ir a pagar</Text>
        </TouchableOpacity>
      </View>
      <NavBar />
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container_pedido: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexGrow: 1
  },
  text_pedidos: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  text_nombre: {
    fontSize: 16,
    fontWeight: 'bold'

  },
  text_contenido: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400'

  },
  text_nota: {
    fontSize: 18,
    color: 'black',
    fontWeight: 600

  },
  input_nota: {
    backgroundColor: '#E2E2E2',
    height: 120,
    borderRadius: 20

  },
  input_caracteres: {
    fontSize: 11,
    color: 'black',
    marginLeft: 310,
    marginTop: -10

  },
  container_contador: {
    display: 'flex',
    flexDirection: 'row',
    gap: 200,
    marginTop: 15
  },
  container_counter: {
    display: 'flex',
    flexDirection: 'row'
  },
  container_button: {
    height: 25,
    backgroundColor: '#D9D9D9',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  container_buttonminus: {
    height: 25,
    backgroundColor: '#D9D9D9',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    fontWeight: 'bold'
  },
  container_buttonplus: {
    height: 25,
    backgroundColor: '#D9D9D9',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    fontWeight: 'bolder'
  },
  multiplied: {
    fontSize: 16,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

  },
  add: {
    marginTop: 50,
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
  container_algomas: {
    marginTop: 50,
    gap: 30
  },
  container_carrusel: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30
  },
  input_mas: {
    height: 140,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#E9E9E9'
  },
  text_mas: {
    fontWeight: 'bold',
    fontSize: 16
  }

})

export default Cart
