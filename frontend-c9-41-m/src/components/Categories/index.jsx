import { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'
import getCategories from '../../utils/categories/getCategories'
import CategoryCard from './CategoryCard'
import CategorySearch from './CategorySearch'
import Navbar from '../Home/NavBar'
export default function Categories () {
  const [categories, setCategories] = useState([])
  const [categoriesFilter, setCategoriesFilter] = useState([])
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    getCategories()
      .then((data) => {
        setCategories(data)
        setCategoriesFilter(data)
      })
      .finally(() => setLoader(false))
  }, [])
  const handleSearch = (search) => {
    setCategoriesFilter(
      categories.filter(category => category.name.toLowerCase().includes(search.toLowerCase()))
    )
  }
  const resetCategories = () => { setCategoriesFilter(categories) }
  return (
    <View style={styles.container}>
      <CategorySearch handleSearch={handleSearch} />
      {loader && <Text>Cargando categorías...</Text>}
      {!loader && !categoriesFilter.length && <Text>No se encontraron categorías para la búsqueda.</Text>}
      {categoriesFilter.length < categories.length &&
        <TouchableOpacity onPress={resetCategories}>
          <Text style={styles.showAll}>Mostrar Todas las Categorías</Text>
        </TouchableOpacity>}
      <FlatList
        contentContainerStyle={styles.contentContainer}
        numColumns={2}
        data={categoriesFilter}
        renderItem={({ item }) => {
          return <CategoryCard name={item.name} image={item.image.url} />
        }}
        keyExtractor={({ _id }) => _id}
        scrollEnabled
      />
      <Navbar />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8

  },
  showAll: {
    color: '#2392CA',
    textDecorationLine: 'underline'
  }
})
