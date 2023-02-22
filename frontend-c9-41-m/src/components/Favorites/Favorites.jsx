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

export const Favorites = (props) => {
  return (
    <View styles={{ flex: 1 }}>
      <ScrollView>
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
                <Image
                  style={styles.image}
                  source={{
                    uri: 'https://www.recetaslamasia.es/wp-content/uploads/2012/10/foto_plato-equilibrado-scaled.jpg'
                  }}
                />
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
  text: {
    fontSize: 18,
    fontWeight: 'bold',
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
    fontSize: 14,
    margin: 10
  },
  heart: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 7
  },
  description: {
    fontSize: 12,
    margin: 5,
    width: '60%'
  },
  image: {
    width: 80,
    height: 80,
    margin: 10
  },
  line: {
    position: 'absolute',
    top: 118,
    right: 22
  }
})
