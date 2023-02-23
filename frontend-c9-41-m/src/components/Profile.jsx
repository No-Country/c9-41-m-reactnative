import { View, Text, Image, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import NavBar from './NavBar'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ButtonProfile from './ButtonProfile'
const buttons = ['Privacidad', 'Métodos de pago', 'Ubicación', 'Ayuda']
const Profile = () => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon style={styles.icon} icon={faArrowLeft} size={24} />
      <View style={styles.header}>
        <Text style={styles.profile}> Perfil </Text>
        <Image
          style={styles.image}
          source={require('../../assets/profile.png')}
        />
        <Text style={styles.name}>Claudia Gomez</Text>
      </View>
      <View style={styles.seccion}>
        {
        buttons.map((b, key) => {
          return <ButtonProfile text={b} key={key} />
        })
       }
      </View>

      <NavBar />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  icon: {
    marginTop: 45,
    marginLeft: 15
  },
  profile: {
    fontSize: 20,
    marginTop: 60,
    display: 'flex',
    textAlign: 'center'
  },
  image: {
    margin: 10,
    width: 80,
    height: 80,
    borderRadius: 50
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center'
  },
  secciones: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 50,
    paddingStart: 50,
    width: 360,
    height: 55,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#D9D9D9'
  },
  seccion: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

})

export default Profile
