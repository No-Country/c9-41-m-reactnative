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
              source={props.image}
            />
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>{props.price}</Text>
            <View style={styles.review}>
              <TouchableOpacity>
                <FontAwesomeIcon style={styles.star} icon={faStar} size={16} />
              </TouchableOpacity>
              <Text style={styles.point}>{props.review}</Text>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.añadir}>Añadir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 25,
    marginBottom: 5
  },
  card: {
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 15,
    width: '80%'
  },
  btn: {
    borderRadius: 15,
    backgroundColor: '#676767',
    width: '80%',
    height: 30,
    alignSelf: 'center',
    marginBottom: 10
  },
  añadir: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 3
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 6
  },
  price: {
    fontSize: 12,
    fontWeight: 'bold',
    margin: 5,
    marginLeft: 10
  },
  heart: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 7
  },
  point: {
    fontWeight: 'bold',
    fontSize: 10,
    marginLeft: 4
  },
  review: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: 10,
    marginRight: 20,
    marginTop: -5
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 2
  }
})
