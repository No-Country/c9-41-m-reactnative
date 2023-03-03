import { Formik } from 'formik'
import * as Yup from 'yup'
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Theme from '../../theme/Theme'
import useLogin from '../hooks/useLogin'
import useAddress from '../hooks/useAddress'
import { addAddress, editAddress } from '../utils/user/address'
import useCart from '../hooks/useCart'

export default function Address () {
  const navigation = useNavigation()
  const { total } = useCart()
  const { user } = useLogin()
  const { address, loadingAddress } = useAddress()
  if (loadingAddress) {
    return (
      <View style={styles.container}>
        <Text style={{ marginVertical: 24 }}>Cargando...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          street: address?.street || '',
          city: address?.city || '',
          zipCode: address?.zipCode || '',
          province: address?.province || '',
          number: String(address?.number) || ''
        }}
        validationSchema={Yup.object({
          street: Yup.string()
            .required('El domicilio es obligatorio'),
          city: Yup.string()
            .required('La ciudad es obligatoria'),
          zipCode: Yup.string()
            .required('El código postal es obligatorio'),
          province: Yup.string()
            .required('La provincia es obligatoria'),
          number: Yup.string()
            .required('El número de calle es obligatorio')
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(true)
          if (address) {
            editAddress({ ...values, id: address._id })
              .then(() => { navigation.navigate('Medio de pago', { total }) })
              .finally(() => setSubmitting(false))
          } else {
            addAddress({ ...values, userId: user.id })
              .then(() => { navigation.navigate('Medio de pago', { total }) })
              .finally(() => setSubmitting(false))
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.formikContainer}>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={handleChange('street')}
                  onBlur={handleBlur('street')}
                  value={values.street}
                  placeholder='Calle...'
                  style={styles.input}
                  placeholderTextColor='#555'
                />
                {touched.street && errors.street
                  ? (
                    <Text style={styles.error}>{errors.street}</Text>
                    )
                  : null}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={handleChange('number')}
                  onBlur={handleBlur('number')}
                  value={values.number}
                  placeholder='Número de calle...'
                  style={styles.input}
                  placeholderTextColor='#555'
                />
                {touched.number && errors.number
                  ? (
                    <Text style={styles.error}>{errors.number}</Text>
                    )
                  : null}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={handleChange('province')}
                  onBlur={handleBlur('province')}
                  value={values.province}
                  placeholder='Provincia...'
                  style={styles.input}
                  placeholderTextColor='#555'
                />
                {touched.province && errors.province
                  ? (
                    <Text style={styles.error}>{errors.province}</Text>
                    )
                  : null}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                  placeholder='Ciudad...'
                  style={styles.input}
                  placeholderTextColor='#555'
                />
                {touched.city && errors.city
                  ? (
                    <Text style={styles.error}>{errors.city}</Text>
                    )
                  : null}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  onChangeText={handleChange('zipCode')}
                  onBlur={handleBlur('zipCode')}
                  value={values.zipCode}
                  placeholder='Código Postal...'
                  style={styles.input}
                  placeholderTextColor='#555'
                />
                {touched.zipCode && errors.zipCode
                  ? (
                    <Text style={styles.error}>{errors.zipCode}</Text>
                    )
                  : null}
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
                {
                    isSubmitting
                      ? <Text style={{ color: '#fff' }}>Cargando...</Text>
                      : <Text style={{ color: '#fff' }}>Guardar</Text>
                  }
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  formikContainer: {
    flex: 1
  },
  formContainer: {
    flexGrow: 1,
    paddingVertical: 32
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    fontSize: 18,
    height: 64
  },
  inputContainer: {
    marginVertical: 16
  },
  button: {
    width: 330,
    height: 50,
    marginVertical: 80,
    borderRadius: 10,
    backgroundColor: Theme.colors.colorPrincipal,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    fontSize: 12,
    color: '#931B1B'
  }
})
