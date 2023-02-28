import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useState } from 'react'
import { Formik } from 'formik'
import { TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { LoginMedia } from './LoginMedia'
import validationSchemaRegister from '../utils/register/validation'
import registerSubmit from '../utils/register/registerSubmit'
import RegisterModal from './RegisterModal'
import Theme from '../../theme/Theme'

library.add(faSpinner)
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
            onSubmit={(values, { resetForm, setSubmitting }) => {
              setSubmitting(true)
              registerSubmit(values)
                .then(({ message }) => {
                  const msgFromAPI = message === 'Email in use' ? 'El email ya tiene una cuenta asociada!' : 'Recibió un mail para verificar su usuario!'
                  setMessage(msgFromAPI)
                  setModal(!modal)
                })
                .finally(() => {
                  setSubmitting(false)
                  resetForm()
                })
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
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
                    <FontAwesomeIcon icon={passwordHidden ? faEyeSlash : faEye} size={24} color={Theme.colors.colorPrincipal} />
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
                  {
                    isSubmitting
                      ? <View style={{ flexDirection: 'row' }}><FontAwesomeIcon icon={faSpinner} size={24} spin color='#fff' /><Text style={{ marginLeft: 8, color: '#fff' }}>Cargando...</Text></View>
                      : <Text style={styles.buttonText}>Registrate</Text>
                  }
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
    backgroundColor: Theme.colors.colorPrincipal,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  formContainer: {
    backgroundColor: Theme.colors.colorTerciario,
    alignItems: 'center',
    paddingTop: 48,
    height: '85%',
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
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
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
    backgroundColor: Theme.colors.colorPrincipal,
    paddingVertical: 12,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff'
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
