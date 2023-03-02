import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Theme from '../../theme/Theme'

export default function RegisterModal ({ message, modal, setModal }) {
  return (
    <Modal
      animationType='slide'
      transparent
      visible={modal}
      onRequestClose={() => { setModal(!modal) }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => { setModal(!modal) }}
          >
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: Theme.colors.colorPrincipal,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#fff'
  },
  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    color: '#fff',
    fontSize: 24,
    textAlign: 'center'
  }
})
