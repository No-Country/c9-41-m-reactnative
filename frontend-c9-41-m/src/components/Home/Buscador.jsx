import { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Theme from '../../../theme/Theme'

const Buscador = () => {
  const [text, onChangeText] = useState('¿Qué estás buscando?')

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        onChangeText={onChangeText}
        value={text}
        color={Theme.colors.colorSecundario}
      />
      <TouchableOpacity
        style={styles.searchIcon}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={24}
          color={Theme.colors.colorSecundario}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  searchInput: {
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
    right: 5,
    padding: 8
  }
})

export default Buscador
