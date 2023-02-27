import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
const MedioPago = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container_elige}>
        <Text style={styles.text_elige}>Elige medio de pago</Text>
      </View>
      <View style={{ gap: 30 }}>
        <View style={styles.container_input}>
          <View style={styles.circle_s} />
          <TextInput style={styles.texts} placeholder='Agregar Tarjeta' placeholderTextColor='#D9D9D9' />
          <FontAwesomeIcon icon={faCreditCard} style={styles.icons} size={16} />
        </View>
        <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: 1, marginTop: -20 }} />

        <View style={styles.container_input}>
          <View style={styles.circle_s} />
          <TextInput style={styles.texts} placeholder='Efectivo' placeholderTextColor='#D9D9D9' />
        </View>
        <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: 1, marginTop: -20 }} />

        <View style={styles.container_input}>
          <View style={styles.circle_s} />
          <TextInput style={styles.texts.local} placeholder='Retiro en el Local' placeholderTextColor='#D9D9D9' />
        </View>
        <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: 1, marginTop: -20 }} />
      </View>

      <View style={styles.total_pagar}>
        <Text style={styles.total_text}>Total a Pagar</Text>
        <Text style={styles.total_text}> $1800</Text>
      </View>
      <TouchableOpacity style={styles.confirmar}>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 15

  },
  circle_s: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#D9D9D9'
  },
  container_input: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  container_elige: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    marginTop: 10
  },
  text_elige: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  icons: {
    color: '#D9D9D9'
  },
  texts: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: 120,
    local: {
      width: 150,
      fontSize: 16,
      color: 'black',
      fontWeight: 'bold'
    }
  },
  confirmar: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9E9E9',
    height: 50,
    borderRadius: 10
  },
  total_pagar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 195,
    marginTop: 250
  },
  total_text: {
    fontSize: 16,
    fontWeight: 'bold'
  }

})
export default MedioPago
