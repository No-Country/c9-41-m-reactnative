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
  searchInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Theme.colors.colorPrincipal,
    bottom: 2,
    width: '60%',
    marginRight: 55
  },
  searchContainer: {
    backgroundColor: Theme.colors.colorTerciario,
    height: 45,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: Theme.colors.colorPrincipal,
    borderWidth: 2,
    position: 'relative',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  searchIcon: {
    position: 'absolute',
    right: '1%',
    padding: 12
  }
})
