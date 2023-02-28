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
        color={Theme.colors.colorTerciario}
      />
      <TouchableOpacity
        style={styles.button}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={24}
          color={Theme.colors.colorTerciario}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    bottom: 2,
    width: '60%',
    marginRight: 55
  },
  InputContainer: {
    backgroundColor: Theme.colors.colorPrincipal,
    height: 45,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    position: 'relative',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  button: {
    position: 'absolute',
    right: 5,
    bottom: 3,
    padding: 8
  }
})

export default Buscador
