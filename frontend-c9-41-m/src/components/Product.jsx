import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState } from 'react'

const Product = () => {
  const [contador, setContador] = useState(1)
  const decrementar = () => {
    if (contador > 1) {
      setContador(contador - 1)
    }
  }

  const incrementar = () => {
    setContador(contador + 1)
  }
  const Multiplier = 1800
  const multipliedCount = contador * Multiplier
  return (
    <View style={styles.container}>
      <View style={styles.circle_principal} />
      <View style={styles.container_menu}>
        <View style={styles.container_gray}>
          <Text style={styles.text_pedidos}>Los mas pedidos</Text>
          <Text style={styles.text_nombre}>Pasta de especialidad</Text>
          <Text style={styles.text_contenido}>Tallarines con salsa de carne o pollo + coca cola de 375ml</Text>
          <Text style={styles.text_nota}>Nota</Text>
          <TextInput style={styles.input_nota} />
          <Text style={styles.input_caracteres}>0/100</Text>
          <View style={styles.container_contador}>
            {/* contador */}
            <View style={styles.container_counter}>
              <TouchableOpacity style={styles.container_buttonminus} onPress={decrementar}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>-</Text>
              </TouchableOpacity>
              <Text style={styles.container_button}>{contador}</Text>
              <TouchableOpacity onPress={incrementar} style={styles.container_buttonplus}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
            </View>
            {/* precio */}
            <Text style={styles.multiplied}>${multipliedCount}</Text>
          </View>
          <TouchableOpacity style={styles.add}>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Anadir</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  container_menu: {
    backgroundColor: '#F0F0F0',
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    width: 375,
    height: 650,
    marginTop: 150,
    position: 'relative',
    padding: 12

  },
  circle_principal: {
    width: 145,
    height: 145,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
    marginTop: -550,
    position: 'absolute',
    zIndex: 1
  },
  container_gray: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    gap: 18
  },
  text_pedidos: {
    fontSize: 13,
    fontWeight: 600

  },
  text_nombre: {
    fontSize: 18,
    fontWeight: 600

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
    height: 90,
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
    marginTop: 100
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
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    fontWeight: 'bold'
  },
  container_buttonplus: {
    height: 25,
    backgroundColor: '#D9D9D9',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    fontWeight: 'bolder'
  },
  multiplied: {
    fontSize: 15,
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
    backgroundColor: '#E9E9E9',
    height: 40,
    borderRadius: 20

  }
})
export default Product
