import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import NavBar from '../Home/NavBar'
import Theme from '../../../theme/Theme'

export const Favorites = (props) => {
  return (
    <View style={styles.componentContainer}>
      <ScrollView style={styles.favoritesContainer}>
        <View>
          <Text style={styles.text}>Mis Favoritos</Text>
          <View>
            <View style={styles.card}>
              <TouchableOpacity>
                <FontAwesomeIcon
                  style={styles.heart}
                  icon={faHeart}
                  size={16}
                />
              </TouchableOpacity>
              <View style={styles.container}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={require('../../../assets/carneroja.png')}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>Carnes</Text>
                  <Text style={styles.description}>
                    Pollo o carne roja con guarnición a elección ( papas o
                    ensalada )
                  </Text>
                </View>
              </View>
              <Image
                style={styles.line}
                source={require('../../../assets/line.png')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <NavBar />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flexDirection: 'column'
  },
  componentContainer: {
    flex: 1,
    backgroundColor: 'hsla(0, 0%, 100%, 1)'
  },
  favoritesContainer: {
    flexGrow: 1
  },
  text: {
    fontSize: 16,
    color: Theme.colors.colorLetras,
    fontFamily: Theme.fontWeights.bold,
    marginLeft: 25,
    marginBottom: 5,
    marginTop: 10
  },
  card: {
    marginTop: 10,
    marginLeft: 20,
    paddingBottom: 20,
    width: '90%'
  },
  title: {
    fontFamily: Theme.fontWeights.bold,
    color: Theme.colors.colorLetras,
    fontSize: 15,
    margin: 15
  },
  heart: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 7
  },
  description: {
    fontFamily: Theme.fontWeights.regular,
    fontSize: 12,
    margin: 15,
    marginTop: -15,
    width: '60%'
  },
  image: {
    width: 60,
    height: 60,
    margin: 5
  },
  imageContainer: {
    borderRadius: 10,
    backgroundColor: Theme.colors.colorPrincipal,
    width: 70,
    height: 70,
    marginTop: 10
  },
  line: {
    position: 'absolute',
    top: 118,
    right: 22
  }
})
