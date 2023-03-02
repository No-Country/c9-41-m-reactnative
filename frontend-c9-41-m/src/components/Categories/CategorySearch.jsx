import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Formik } from 'formik'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import Theme from '../../../theme/Theme'

export default function CategorySearch ({ handleSearch }) {
  return (
    <Formik
      initialValues={{ search: '' }}
      onSubmit={(values, { resetForm }) => {
        handleSearch(values.search)
        resetForm()
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            onChangeText={handleChange('search')}
            onBlur={handleBlur('search')}
            onSubmitEditing={handleSubmit}
            value={values.search}
            placeholder='¿Qué estás buscando?'
          />
          <TouchableOpacity style={styles.searchIcon} onPress={handleSubmit}>
            <FontAwesomeIcon icon={faSearch} size={24} color='#bbb' />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}
const styles = StyleSheet.create({
  searchContainer: {
    width: '100%',
    marginVertical: 16,
    alignItems: 'center',
    position: 'relative'
  },
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Theme.colors.colorPrincipal,
    width: '90%',
    height: 48,
    borderRadius: 12,
    paddingLeft: 8,
    paddingRight: 40
  },
  searchIcon: {
    position: 'absolute',
    right: '4%',
    padding: 12
  }
})
