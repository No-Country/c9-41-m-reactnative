import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ImagedCarouselCard from 'react-native-imaged-carousel-card'
import Theme from '../../../theme/Theme'

export const ImageSlider = () => {
  return (
    <View>
      <Text style={styles.title}>Volvé a disfrutarlos</Text>
      <ScrollView horizontal style={styles.container}>
        <TouchableOpacity>
          <ImagedCarouselCard
            style={{ marginLeft: 20 }}
            overlayHeight={0}
            width={85}
            height={85}
            source={require('../../../assets/home-assets/burguer.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ImagedCarouselCard
            style={{ marginLeft: 20 }}
            overlayHeight={0}
            width={85}
            height={85}
            source={require('../../../assets/home-assets/fanta.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ImagedCarouselCard
            style={{ marginLeft: 20 }}
            overlayHeight={0}
            width={85}
            height={85}
            source={require('../../../assets/home-assets/combo.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ImagedCarouselCard
            style={{ marginLeft: 20 }}
            overlayHeight={0}
            width={85}
            height={85}
            source={require('../../../assets/home-assets/burguer.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ImagedCarouselCard
            style={{ marginLeft: 20 }}
            overlayHeight={0}
            width={85}
            height={85}
            source={require('../../../assets/home-assets/fanta.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <ImagedCarouselCard
            style={{ marginLeft: 20 }}
            overlayHeight={0}
            width={85}
            height={85}
            source={require('../../../assets/home-assets/combo.png')}
          />
        </TouchableOpacity>
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
    fontFamily: Theme.fontWeights.bold,
    color: Theme.colors.colorLetras,
    marginLeft: 25,
    marginBottom: 15
  }
})
