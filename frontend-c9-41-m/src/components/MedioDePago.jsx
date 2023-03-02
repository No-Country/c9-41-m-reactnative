import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCircle, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { CheckBox, Button } from 'react-native-elements'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'




const MedioDePago = ({ navigation }) => {
  const navigation = useNavigation()
  
  const [mercadoPago, setMercadoPago] = useState(false);
  const [efectivo, setEfectivo] = useState(false);
  const [retiroLocal, setRetiroLocal] = useState(false);

  

  return (
    <View>
      <View style={styles.flecha}>
        <FontAwesomeIcon style={styles.icon} icon={faArrowLeft} size={24} />
      </View>
      <Text style={styles.title}> Elige medio de pago </Text>
      <View style={styles.medios}>
        <View style={styles.tipoPago}>
        <CheckBox 
        style={styles.check}
        checked={mercadoPago}
        checkedColor={'#FB6D3B'}
        checkedIcon={"dot-circle-o"}
        uncheckedIcon="circle-o"
        onPress={() => {
          setMercadoPago(!mercadoPago);
          setEfectivo (false);
          setRetiroLocal (false);
        }}
      />
          <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
          <Text style={styles.text}> Mercado Pago </Text>
          <FontAwesomeIcon style={styles.icon} icon={faCreditCard} size={15} />
        </View>
        <View style={styles.tipoPago}>
        <CheckBox
        style={styles.check}
        checkedColor={'#FB6D3B'}
        checked={efectivo}
        checkedIcon={"dot-circle-o"}
        uncheckedIcon="circle-o"
        onPress={() => {
          setEfectivo(!efectivo);
          setMercadoPago(false);
          setRetiroLocal(false);
        }}
      />
          <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
          <Text style={styles.text}> Efectivo </Text>
        </View>
        <View style={styles.tipoPago}>
        <CheckBox
        style={styles.check}
        checkedColor={'#FB6D3B'}
        checked={retiroLocal}
        checkedIcon={"dot-circle-o"}
        uncheckedIcon="circle-o"
        onPress={() => {
          setRetiroLocal(!retiroLocal);
          setMercadoPago(false);
          setEfectivo(false)
        }}
      />
          <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
          <Text style={styles.text}> Retiro en el Local </Text>
        </View>
      </View>
      <View style={styles.total}>
        <Text style={styles.precio}> Total a Pagar</Text>
        <Text style={styles.precio}> $1800</Text>
      </View>
      <View style={styles.confirmar}>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.textConfirm} 
           onPress={() => navigation.navigate('ViewConfirmation')}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  flecha: {
    color: '#676767A6',
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 120,
    marginLeft: 18
  },
  precio: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  confirmar: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  registerButton: {
    borderColor: 'gray',
    width: 330,
    height: 50,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#FB6D3B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textConfirm: {
    color: '#FFFFFF'
  }

}

)

export default MedioDePago
