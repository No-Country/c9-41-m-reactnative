import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  ScrollView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image
} from 'react-native'
import Theme from '../../../theme/Theme'

export const MasPedidosCards = (props) => {
  return (
    <ScrollView horizontal>
      <View>
        <Text style={styles.text}>Los más pedidos</Text>
        <View>
          <View style={styles.card} key={props.id}>
            <TouchableOpacity>
              <FontAwesomeIcon style={styles.heart} icon={faHeart} size={16} />
            </TouchableOpacity>
            <Image
              style={styles.image}
              source={require('../../../assets/home-assets/fideos.png')}
            />
            <Text style={styles.title}>Pastas de especialidad</Text>
            <Text style={styles.price}>$1800</Text>
            <View style={styles.review}>
              <TouchableOpacity>
                <FontAwesomeIcon style={styles.star} icon={faStar} size={18} />
              </TouchableOpacity>
              <Text style={styles.point}>4.7</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: Theme.fontWeights.bold,
    color: Theme.colors.colorLetras,
    marginLeft: 25,
    marginBottom: 5
  },
  card: {
    width: '70%',
    height: '90%',
    marginTop: 10,
    marginLeft: 20,
    color: Theme.colors.colorTerciario,
    borderRadius: 15,
    borderWidth: 1
  },
  title: {
    fontSize: 14,
    color: Theme.colors.colorLetras,
    fontFamily: Theme.fontWeights.bold,
    alignSelf: 'center',
    marginTop: 6
  },
  price: {
    fontSize: 12,
    color: Theme.colors.colorLetras,
    fontFamily: Theme.fontWeights.bold,
    margin: 5,
    marginLeft: 10,
    verticalAlign: 'flex-start',
    position: 'absolute'
  },
  heart: {
    color: Theme.colors.colorPrincipal,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 30,
    right: 7
  },
  star: {
    color: Theme.colors.colorPrincipal
  },
  point: {
    color: Theme.colors.colorLetras,
    fontFamily: Theme.fontWeights.bold,
    fontSize: 10,
    marginLeft: 4,
    marginTop: 2
  },
  review: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 10,
    marginRight: 20,
    marginTop: -5
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 8
  }
})
