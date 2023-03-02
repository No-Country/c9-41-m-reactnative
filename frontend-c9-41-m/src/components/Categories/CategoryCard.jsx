import { Text, View, StyleSheet } from 'react-native'
import Theme from '../../../theme/Theme'

export default function CategoryCard ({ name }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ddd',
    width: 168,
    height: 80,
    borderRadius: 16,
    marginBottom: 24,
    marginHorizontal: 8
  },
  name: {
    fontFamily: Theme.fontWeights.bold,
    color: Theme.colors.colorLetras,
    marginTop: 12,
    marginLeft: 12
  }
})
