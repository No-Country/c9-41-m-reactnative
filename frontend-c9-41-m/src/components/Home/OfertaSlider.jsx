import { ScrollView, View, StyleSheet } from 'react-native'
import ImagedCarouselCard from 'react-native-imaged-carousel-card'

export const OfertaSlider = () => {
  return (
    <View>
      <ScrollView horizontal style={styles.container}>
        <ImagedCarouselCard
          style={{ marginLeft: 20 }}
          overlayHeight={0}
          width={370}
          height={130}
          source={{
            uri: 'https://i.ibb.co/yyB353T/Ofertas-Especiales.png'
          }}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 30
  }
})
