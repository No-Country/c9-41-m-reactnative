import { View, Text, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons'

const MedioDePago = () => {
  return (
    <View>
      <View style={styles.flecha}>
        <FontAwesomeIcon style={styles.icon} icon={faArrowLeft} size={24} />
      </View>
      <Text style={styles.title}> Elige medio de pago </Text>
      <View style={styles.medios}>
        <View style={styles.tipoPago}>
          <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
          <Text style={styles.text}> Mercado Pago </Text>
          <FontAwesomeIcon style={styles.icon} icon={faCreditCard} size={15} />
        </View>
        <View style={styles.tipoPago}>
          <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
          <Text style={styles.text}> Efectivo </Text>
        </View>
        <View style={styles.tipoPago}>
          <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
          <Text style={styles.text}> Retiro en el Local </Text>
        </View>
      </View>
      <View style={styles.total}>
        <Text style={styles.precio}> Total a Pagar</Text>
        <Text style={styles.precio}> $1800</Text>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  flecha: {
    marginLeft: 16,
    marginTop: 32
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 70
  },

  tipoPago: {
    flexDirection: 'row',
    margin: 52,
    marginLeft: 18,
    marginTop: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#FB6D3B'
  },
  medios: {
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    marginBottom: 18
  },
  total: {
    flexDirection: 'row',
    marginTop: 120,
    marginLeft: 18
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold'
  }

}

)

export default MedioDePago
