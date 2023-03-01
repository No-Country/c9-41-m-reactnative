
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
const Dishes = ({ name, description, price, imagen }) => {
  const [contador, setContador] = useState(1)
  const decrementar = () => {
    if (contador > 1) {
      setContador(contador - 1)
    }
  }

  const incrementar = () => {
    setContador(contador + 1)
  }
  const multipliedCount = contador * price

  return (
    <View style={styles.container}>
      <View style={styles.container_image}>
        <Image
          source={require(`./img/${imagen}.png`)}
          style={styles.image}
        />
      </View>
      <View style={styles.container_nombre}>
        <Text style={styles.nombre}>{name}</Text>
        <Text style={styles.multiplied}>${multipliedCount}</Text>
        <View style={styles.container_contador}>
          {/* contador */}
          <View style={styles.container_counter}>
            <TouchableOpacity style={styles.container_buttonminus} onPress={decrementar}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>-</Text>
            </TouchableOpacity>
            <Text style={styles.container_button}>{contador}</Text>
            <TouchableOpacity onPress={incrementar} style={styles.container_buttonplus}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>+</Text>
            </TouchableOpacity>
          </View>
          <Text />
        </View>
      </View>
      <View style={styles.container_description}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Descripcion del producto</Text>
        <Text>
          {description}
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.add}>
          <Text style={{ fontWeight: 600, color: 'white' }}>Agregar al carrito</Text>
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
    height: 190
  },
  container_image: {
    marginTop: 70,
    marginBottom: 30
  },
  container_nombre: {
    gap: 15
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 100

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
    height: 25,
    backgroundColor: '#FB6D3B',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  container_buttonminus: {
    height: 25,
    backgroundColor: '#FB6D3B',
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
    backgroundColor: '#FB6D3B',
    width: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    fontWeight: 'bolder'
  },
  multiplied: {
    fontSize: 18,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

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
    gap: 15
  }
})

export default Dishes
