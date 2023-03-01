import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function ButtonProfile ({ text }) {
  return (
    <TouchableOpacity onPress={(e) => console.log('touch')}>
      <View style={styles.secciones}><Text>{text}</Text></View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  secciones: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingLeft: 50,
    paddingStart: 50,
    width: 328,
    height: 55,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FB6D3B'
  }
})
