import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SvgUri } from 'react-native-svg'
import Theme from '../../theme/Theme'

export function LoginMedia ({ large }) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={[styles.button, large ? styles.buttonLg : styles.buttonSm]}>
        <SvgUri
          width={24}
          height={24}
          uri='https://cdn.svgporn.com/logos/google-icon.svg'
        />
        {large && <Text style={styles.text}>Google</Text>}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, large ? styles.buttonLg : styles.buttonSm]}>
        <SvgUri
          width={24}
          height={24}
          uri='https://cdn.svgporn.com/logos/facebook.svg'
        />
        {large && <Text style={styles.text}>Facebook</Text>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 4
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
    marginHorizontal: 8
  },
  buttonSm: {
    padding: 8
  },
  buttonLg: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: Theme.colors.colorPrincipal
  },
  text: {
    color: '#555',
    paddingLeft: 16,
    fontFamily: Theme.fontWeights.regular
  }
})
