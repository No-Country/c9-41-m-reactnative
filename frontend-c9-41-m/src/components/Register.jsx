import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useState } from 'react'
import { Formik } from 'formik'
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { LoginMedia } from './LoginMedia'
import validationSchemaRegister from '../utils/register/validation'
import registerSubmit from '../utils/register/registerSubmit'
import RegisterModal from './RegisterModal'

export function Register () {
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState('')
  const handlePasswordVisibility = () => { setPasswordHidden(!passwordHidden) }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ fullName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchemaRegister}
            onSubmit={(values, { resetForm }) => {
              registerSubmit(values)
                .then(({ message }) => {
                  const msgFromAPI = message === 'Email in use' ? 'El email ya tiene una cuenta asociada!' : 'Recibió un mail para verificar su usuario!'
                  setMessage(msgFromAPI)
                  setModal(!modal)
                })
                .finally(() => {
                  resetForm()
                })
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
                <TextInput
                  style={styles.input}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  placeholder='Nombre'
                  placeholderTextColor='#999'
                />
                {touched.fullName && errors.fullName
                  ? (
                    <Text style={styles.error}>{errors.fullName}</Text>
                    )
                  : null}
                <TextInput
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder='E-mail *'
                  placeholderTextColor='#999'
                />
                {touched.email && errors.email
                  ? (
                    <Text style={styles.error}>{errors.email}</Text>
                    )
                  : null}
                {/* <TextInput
                style={styles.input}
                value={values.birthday}
                onChangeText={handleChange('birthday')}
                placeholder='Fecha de Nacimiento (AAAA-MM-DD)'
                placeholderTextColor='#999'
              />
              {touched.birthday && errors.birthday
                ? (
                  <Text style={styles.error}>{errors.birthday}</Text>
                  )
                : null} */}
                <TextInput
                  style={styles.input}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  placeholder='Teléfono'
                  placeholderTextColor='#999'
                />
                {touched.phoneNumber && errors.phoneNumber
                  ? (
                    <Text style={styles.error}>{errors.phoneNumber}</Text>
                    )
                  : null}
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.input}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder='Contraseña *'
                    placeholderTextColor='#999'
                    secureTextEntry={passwordHidden}
                  />
                  <TouchableOpacity onPress={handlePasswordVisibility} style={styles.passwordInput}>
                    <FontAwesomeIcon icon={passwordHidden ? faEye : faEyeSlash} size={24} />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password
                  ? (
                    <Text style={styles.error}>{errors.password}</Text>
                    )
                  : null}
                <TextInput
                  style={styles.input}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder='Confirmar Contraseña *'
                  placeholderTextColor='#999' secureTextEntry={passwordHidden}
                />
                {touched.confirmPassword && errors.confirmPassword
                  ? (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                    )
                  : null}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Registrate</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <Text style={styles.text}>O continuar con</Text>
          <LoginMedia />
          <Text style={styles.terms}>Términos y condiciones</Text>
        </View>
      </View>
      <RegisterModal setModal={setModal} modal={modal} message={message} />
    </>
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
    backgroundColor: '#eee',
    alignItems: 'center',
    paddingTop: 48,
    height: '90%',
    width: '100%',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80
  },
  input: {
    width: '90%',
    height: 36,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingRight: 36
  },
  button: {
    width: '90%',
    margin: 12,
    backgroundColor: '#bbb',
    paddingVertical: 8,
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
    bottom: 12,
    padding: 8
  },
  error: {
    fontSize: 8,
    color: '#931B1B',
    alignSelf: 'flex-start',
    paddingLeft: '5%'
  }

})
