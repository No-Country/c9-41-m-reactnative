import { View, Text, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons'

const MedioDePago = () => {
  return (
    <View>
      <FontAwesomeIcon style={styles.icon} icon={faArrowLeft} size={24} />
      <Text style={styles.title}> Elige medio de pago </Text>
      <View style={styles.pagos}>
        <View style={styles.line}>
          <Text style={styles.tipoPago}>
            <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
            Agregar Tarjeta
            <FontAwesomeIcon style={styles.icon} icon={faCreditCard} size={15} />
          </Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.tipoPago}>
            <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
            Efectivo
          </Text>
        </View>
        <View style={styles.line}>
          <Text style={styles.tipoPago}>
            <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
            Retiro en el Local
          </Text>
        </View>
      </View>
      <View style={styles.containerTotal}>
        <Text style={styles.total}>Total a pagar                                      $1800</Text>
      </View>
      <View>
        <Text styel={styles.añadir}>Añadir</Text>
      </View>

    </View>

  )
}
const styles = StyleSheet.create({
  icon: {
    marginTop: 45,
    marginLeft: 15

  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  tipoPago: {
    fontSize: 17,
    marginBottom: 20
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  pagos: {
    marginTop: 50
  },
  total: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center'
  }
}

)

export default MedioDePago
