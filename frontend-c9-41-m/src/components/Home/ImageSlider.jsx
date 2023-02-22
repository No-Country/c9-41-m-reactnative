import { ScrollView, View, Text, StyleSheet } from 'react-native'
import ImagedCarouselCard from 'react-native-imaged-carousel-card'

export const ImageSlider = () => {
  return (
    <View>
      <Text style={styles.title}>Volvé a disfrutarlos</Text>
      <ScrollView horizontal style={styles.container}>
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={85}
          height={85}
          source={{
            uri: 'https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          }}
        />
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={85}
          height={85}
          source={{
            uri: 'https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg'
          }}
        />
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={85}
          height={85}
          source={{
            uri: 'https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          }}
        />
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={85}
          height={85}
          source={{
            uri: 'https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg'
          }}
        />
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={85}
          height={85}
          source={{
            uri: 'https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          }}
        />
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={85}
          height={85}
          source={{
            uri: 'https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg'
          }}
        />
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={85}
          height={85}
          source={{
            uri: 'https://images.unsplash.com/photo-1511994714008-b6d68a8b32a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          }}
        />
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={85}
          height={85}
          source={{
            uri: 'https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg'
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    marginBottom: 15
  }
})
