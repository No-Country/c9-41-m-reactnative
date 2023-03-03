import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View, Text } from 'react-native'
import { getProductsByCategory } from '../../utils/products'
import ProductCard from './ProductCard'

export default function Products ({ route }) {
  const { id } = route.params
  const [products, setProducts] = useState([])
  const [loading, isLoading] = useState(false)
  useEffect(() => {
    isLoading(true)
    getProductsByCategory(id)
      .then(setProducts)
      .finally(() => { isLoading(false) })
  }, [id])
  return (
    <View style={styles.container}>
      {loading && <Text style={{ textAlign: 'center' }}>Productos Cargando...</Text>}
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={products}
        renderItem={({ item }) => {
          return <ProductCard product={item} />
        }}
        keyExtractor={({ _id }) => _id}
        scrollEnabled
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
