import { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Theme from '../../../theme/Theme'

const Buscador = () => {
  const [text, onChangeText] = useState('¿Qué estás buscando?')

  return (
    <View style={styles.InputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <TouchableOpacity
        style={styles.button}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={24}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: Theme.colors.colorPrincipal,
    borderRadius: 15,
    width: '90%',
    alignSelf: 'center'
  },
  InputContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    right: 35,
    bottom: 16,
    padding: 8
  }
})

export default Buscador
