import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { CheckBox, Button } from 'react-native-elements'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const MedioDePago = ({ route }) => {
  const { total } = route.params
  const navigation = useNavigation()
  const [mercadoPago, setMercadoPago] = useState(false)
  const [efectivo, setEfectivo] = useState(false)
  const [retiroLocal, setRetiroLocal] = useState(false)

  const confirmar = () => {
    if (mercadoPago) {
      navigation.navigate('ConfirmationView')
    } else if (efectivo) {
      navigation.navigate('ConfirmationView')
    } else if (retiroLocal) {
      navigation.navigate('ConfirmationView')
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}> Elige medio de pago </Text>
      </View>
      <View style={styles.medios}>
        <View style={styles.tipoPago}>
          <CheckBox
            style={styles.check}
            checked={mercadoPago}
            checkedColor='#FB6D3B'
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => {
              setMercadoPago(!mercadoPago)
              setEfectivo(false)
              setRetiroLocal(false)
            }}
          />

          <Text style={styles.text}> Mercado Pago </Text>
          <Image style={styles.image} source={require('../../assets/mercadopago.png')} />
        </View>
        <View style={styles.tipoPago}>
          <CheckBox
            style={styles.check}
            checkedColor='#FB6D3B'
            checked={efectivo}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => {
              setEfectivo(!efectivo)
              setMercadoPago(false)
              setRetiroLocal(false)
            }}
          />
          <Text style={styles.text}> Efectivo </Text>
        </View>
        <View style={styles.tipoPago}>
          <CheckBox
            style={styles.check}
            checkedColor='#FB6D3B'
            checked={retiroLocal}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => {
              setRetiroLocal(!retiroLocal)
              setMercadoPago(false)
              setEfectivo(false)
            }}
          />

          <Text style={styles.text}> Retiro en el Local </Text>
        </View>
      </View>
      <View style={styles.total}>
        <Text style={styles.precio}> Total a Pagar</Text>
        <Text style={styles.valor}> ${total}</Text>
      </View>
      <View style={styles.confirmarContainer}>
        <TouchableOpacity>
          <Button
            title='Confirmar'
            disabled={!mercadoPago && !efectivo && !retiroLocal}
            onPress={confirmar}
            containerStyle={styles.confirmarContainer}
            buttonStyle={styles.confirmarButton}
          />
          <Text style={styles.confirmarText}> Confirmar </Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  check: {
    alignItems: 'center'
  },
  buttonTipoPago: {
    flexDirection: 'row'
  },
  exit: {
    flexDirection: 'row'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 35

  },

  tipoPago: {
    flexDirection: 'row',
    margin: 52,
    marginLeft: 18,
    marginTop: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#FB6D3B',
    alignItems: 'center',
    textAlign: 'center'

  },
  medios: {
    marginLeft: 5,
    marginRight: 5
  },
  text: {
    marginBottom: 18,
    color: '#00000080',
    textAlign: 'center'

  },
  total: {
    flexDirection: 'row',
    marginTop: 80,
    marginLeft: 18
  },
  precio: {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 180
  },
  valor: {
    fontSize: 18,
    fontWeight: '800',
    marginRight: 18
  },
  confirmarContainer: {
    alignItems: 'center'

  },
  confirmarButton: {
    borderColor: 'gray',
    width: 328,
    height: 45,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#FB6D3B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmarText: {
    color: '#FFFFFF'
  }

}

)

export default MedioDePago
