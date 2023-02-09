import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import * as Svg from "react-native-svg";
import React from "react";
const { width, height } = Dimensions.get("window");
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containertextwelcome}>
        <Text style={styles.textwelcome}>Te damos la bienvenida</Text>
      </View>

      <View>
        <TextInput
          placeholder="E-mail"
          style={styles.inputlogin}
          placeholderTextColor="#000"
        ></TextInput>
        <TextInput
          placeholder="Contraseña"
          style={styles.inputlogin}
          placeholderTextColor="#000"
        ></TextInput>
        <Text style={styles.forgotText}>¿Olvidaste la contraseña?</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.loginButton}>
          <Text>Iniciar sesion</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  containertextwelcome: {
    marginTop: 100,
    marginBottom: 80,
  },
  textwelcome: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 27,
  },
  inputlogin: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    paddingStart: 40,
    width: 300,
    height: 50,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    position: "relative",
  },
  forgotText: {
    marginLeft: 165,
    fontSize: 12,
    marginTop: 8,
  },
  loginButton: {
    borderColor: "gray",
    width: 300,
    height: 50,
    marginTop: 40,
    borderRadius: 30,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  mail: {
    position: "absolute",
  },
});
