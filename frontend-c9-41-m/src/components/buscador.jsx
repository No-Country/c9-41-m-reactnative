
import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'

const Buscador = () => {
  const [text, onChangeText] = React.useState('Buscar')

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {

    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    width: '85%',
    alignSelf: 'center'

  }
})

export default Buscador
