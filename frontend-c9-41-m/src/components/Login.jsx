import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'

import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { LoginMedia } from './LoginMedia'
export default function Login ({ navigation }) {
  const [passwordHidden, setpasswordHidden] = useState(true)
  const handlePasswordVisibility = () => {
    setpasswordHidden(!passwordHidden)
  }
  return (
    <View style={styles.container}>
      <View style={styles.containertextwelcome}>
        <Text style={styles.textwelcome}>Te damos la bienvenida</Text>
      </View>

      <View style={styles.containericons}>
        <TextInput
          placeholder='E-mail'
          style={styles.inputlogin}
          placeholderTextColor='#000'
        />
        <FontAwesomeIcon icon={faEnvelope} style={styles.icons.mail} size={24} />

        <TextInput
          placeholder='Contraseña'
          style={styles.inputlogin}
          placeholderTextColor='#000'
          secureTextEntry={passwordHidden}
        />
        <FontAwesomeIcon icon={faLock} style={styles.icons.lock} size={24} />
        <TouchableOpacity onPress={handlePasswordVisibility} style={styles.icons.eye}>
          <FontAwesomeIcon icon={passwordHidden ? faEyeSlash : faEye} size={24} />
        </TouchableOpacity>
        <Text style={styles.forgotText}>¿Olvidaste la contraseña?</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.loginButton}>
          <Text>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <View style={styles.divider} />
      </View>
      <StatusBar style='auto' />
      <LoginMedia large />
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿No tienes cuenta todavía?</Text>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
          <Text>Registro</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  containertextwelcome: {
    marginTop: 80,
    marginBottom: 80
  },
  textwelcome: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27
  },
  inputlogin: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    paddingStart: 50,
    width: 330,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#D9D9D9'
  },
  forgotText: {
    marginLeft: 190,
    fontSize: 12,
    marginTop: -40
  },
  loginButton: {
    borderColor: 'gray',
    width: 330,
    height: 50,
    marginTop: 40,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containericons: {
    position: 'relative'
  },
  icons: {
    position: 'absolute',
    mail: {
      bottom: 37,
      left: 10,
      zIndex: 1
    },
    lock: {
      bottom: 37,
      left: 10,
      zIndex: 1
    },
    eye: {
      bottom: 60,
      left: 290,
      zIndex: 1
    }
  },
  registerContainer: {
    alignItems: 'center',
    marginTop: 16
  },
  registerText: {
    fontSize: 10,
    color: '#555'
  },
  registerButton: {
    borderColor: 'gray',
    width: 330,
    height: 50,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dividerContainer: {
    flexDirection: 'row',
    marginVertical: 16
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    width: 88,
    marginHorizontal: 16
  }
})
