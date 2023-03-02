import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';

const ConfirmationView = () => {

/*   const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
 */
  return (
    <View style={styles.container}>
       <Image
          style={styles.image}
          source={require('../../assets/check.png')}
        />
      <Text style={styles.text}>Se confirmo con exito tu
      </Text>
      <Text style={styles.text}> pedido
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    margin:38,
    width: 160,
    height: 160,
  },
  text:{
    fontSize:20,
    fontWeight:'400'
  }
})

export default ConfirmationView;