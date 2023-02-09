import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export function LoginMedia ({ large }) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={[styles.button, large ? styles.buttonLg : styles.buttonSm]}>
        <FontAwesomeIcon icon={faGoogle} />
        {large && <Text style={styles.text}>Google</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, large ? styles.buttonLg : styles.buttonSm]}>
        <FontAwesomeIcon icon={faFacebook} />
        {large && <Text style={styles.text}>Facebook</Text>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 12
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    borderRadius: 100,
    marginHorizontal: 16
  },
  buttonSm: {
    padding: 16
  },
  buttonLg: {
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  text: {
    color: '#555',
    paddingLeft: 16
  }
})
