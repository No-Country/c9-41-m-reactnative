import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { LoginMedia } from './LoginMedia'
import loginSubmit from '../utils/login/loginSubmit'
import RegisterModal from './RegisterModal'
const Login = ({ navigation }) => {
  const [passwordHidden, setpasswordHidden] = useState(true)
  const [modal, setModal] = useState(false)
  const [error, setError] = useState('')
  const handlePasswordVisibility = () => {
    setpasswordHidden(!passwordHidden)
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containertextwelcome}>
          <Text style={styles.textwelcome}>Te damos la bienvenida</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            password: Yup.string()
              .required('Password is required')
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            setSubmitting(true)
            setError('')
            loginSubmit(values)
              .then((data) => {
                if (data.error) {
                  setError(data.error)
                  window.setTimeout(() => { setError('') }, 3000)
                } else {
                  setModal(true)
                }
                resetForm()
              })
              .finally(() => { setSubmitting(false) })
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <View style={styles.containericons}>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder='E-mail'
                style={[styles.inputlogin, error && styles.inputError]}
                placeholderTextColor='#000'
              />

              <FontAwesomeIcon icon={faEnvelope} style={styles.icons.mail} size={24} />
              {touched.email && errors.email
                ? (
                  <Text style={styles.errorEmail}>{errors.email}</Text>
                  )
                : null}
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder='Contraseña'
                style={[styles.inputlogin, error && styles.inputError]}
                placeholderTextColor='#000'
                secureTextEntry={passwordHidden}
              />

              <FontAwesomeIcon icon={faLock} style={styles.icons.lock} size={24} />
              <TouchableOpacity onPress={handlePasswordVisibility} style={styles.icons.eye}>
                <FontAwesomeIcon icon={passwordHidden ? faEyeSlash : faEye} size={24} />
              </TouchableOpacity>
              {touched.password && errors.password
                ? (
                  <Text style={styles.errorPass}>{errors.password}</Text>
                  )
                : null}
              <Text style={styles.forgotText}>¿Olvidaste la contraseña?</Text>
              {error && <Text style={{ color: '#931B1B' }}>{error}</Text>}
              <View>
                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                  {isSubmitting ? <Text>Cargando...</Text> : <Text>Iniciar sesión</Text>}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
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
      <RegisterModal setModal={setModal} modal={modal} message='Iniciaste sesión correctamente!' />
    </>
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
  inputError: {
    borderColor: '#931B1B'
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
  },
  errorEmail: {
    fontSize: 10,
    color: '#931B1B',
    position: 'absolute',
    top: 64,
    left: 4
  },
  errorPass: {
    fontSize: 10,
    color: '#931B1B',
    position: 'absolute',
    top: 148,
    left: 4
  }
})

export default Login
