import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useState } from 'react'
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { LoginMedia } from '../LoginMedia'

export function Register () {
  const [passwordHidden, setPasswordHidden] = useState(true)
  const handlePasswordVisibility = () => { setPasswordHidden(!passwordHidden) }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder='Nombre' placeholderTextColor='#aaa' />
        <TextInput style={styles.input} placeholder='E-mail' placeholderTextColor='#aaa' />
        <View style={styles.passwordInputContainer}>
          <TextInput style={styles.input} placeholder='Contraseña' placeholderTextColor='#aaa' secureTextEntry={passwordHidden} />
          <TouchableOpacity onPress={handlePasswordVisibility} style={styles.passwordInput}>
            <FontAwesomeIcon icon={passwordHidden ? faEye : faEyeSlash} size={24} />
          </TouchableOpacity>
        </View>
        <TextInput style={styles.input} placeholder='Confirmar Contraseña' placeholderTextColor='#aaa' secureTextEntry={passwordHidden} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Registrate</Text>
        </TouchableOpacity>
        <Text style={styles.text}>O continuar con</Text>
        <LoginMedia />
        <Text style={styles.terms}>Términos y condiciones</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  formContainer: {
    backgroundColor: '#ddd',
    alignItems: 'center',
    paddingTop: 80,
    height: '80%',
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50
  },
  input: {
    width: '90%',
    height: 48,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingRight: 36
  },
  button: {
    width: '90%',
    margin: 12,
    backgroundColor: '#bbb',
    paddingVertical: 12,
    borderRadius: 9999
  },
  buttonText: {
    textAlign: 'center',
    color: '#555'
  },
  text: {
    color: '#888'
  },
  terms: {
    color: '#888',
    fontSize: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 8
  },
  passwordInputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  passwordInput: {
    position: 'absolute',
    right: 24,
    bottom: 16,
    padding: 8
  }

})
