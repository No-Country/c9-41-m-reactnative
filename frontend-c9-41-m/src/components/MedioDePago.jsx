import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faCircle, faCreditCard, faCross, faXmark } from '@fortawesome/free-solid-svg-icons'


const MedioDePago = () => {
  return (
    <View style={styles.container}>
      <View>
      <View style={styles.flecha}>
        <TouchableOpacity style={styles.exit}>
          <FontAwesomeIcon style={styles.icon} icon={faArrowLeft} size={24} color={'#676767A6'} />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.title}> Elige medio de pago </Text>
      </View>
      <View style={styles.medios}>
        <View style={styles.tipoPago}>
          <TouchableOpacity style={styles.buttonTipoPago}>
           <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
            <Text style={styles.text}> Mercado Pago </Text>
            <Image style={styles.image} source={require('../../assets/mercadopago.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.tipoPago}>
          <TouchableOpacity style={styles.buttonTipoPago}>
            <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
            <Text style={styles.text}> Efectivo </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tipoPago}>
          <TouchableOpacity style={styles.buttonTipoPago}>
            <FontAwesomeIcon style={styles.icon} icon={faCircle} size={15} />
            <Text style={styles.text}> Retiro en el Local </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.total}>
        <Text style={styles.precio}> Total a Pagar</Text>
        <Text style={styles.valor}> $1800</Text>
      </View>
      <View  style = {styles.confirmarContainer}>
        <TouchableOpacity style={styles.confirmarButton}>
         <Text style={styles.confirmarText}> Confirmar </Text>
        </TouchableOpacity>
      </View>

    </View>

  )
}
const styles = StyleSheet.create({
buttonTipoPago:{
  flexDirection:'row'
},
exit:{
   flexDirection:'row'
},
  flecha: {
    marginLeft: 16,
    marginTop: 32
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 70,
    
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
    marginBottom: 18,
    color:'#00000080'

  },
  total: {
    
    flexDirection: 'row',
    marginTop: 120,
    marginLeft: 18
  },
  precio: {
    fontSize: 18,
    fontWeight: '700',
    marginRight:180
  },
  valor:{
    fontSize: 18,
    fontWeight: '800',
    marginRight:18
  },
  confirmarContainer:{
  alignItems:'center',
  marginTop:50
  },  
confirmarButton:{
  borderColor: 'gray',
    width: 328,
    height: 45,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#FB6D3B',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmarText:{
    color:'#FFFFFF'
  },
  icon:{
    color:'#00000000'
  },
  
},

)

export default MedioDePago
