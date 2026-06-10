import React, { useState } from "react";
import { StyleSheet, Pressable, Text, View, TextInput } from "react-native";
import {auth} from "../config/firebase";

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    
    function onSubmit() {
       auth.signInWithEmailAndPassword(email, password)
       .then((response) => {
        setLogin(true);
        props.navigation.navigate("HomePage");
    })
       .catch((error) => {
       alert("Error al iniciar sesión");
       })
    }
    return(
        <View style={styles.container}>
            
            <Text>Login</Text>

            <TextInput style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email} />

            <TextInput style={styles.input}
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password} />

            <Pressable style={styles.boton}
                onPress={() => onSubmit()} >
                <Text style={styles.textoBoton}>
                      Iniciar sesión
                </Text>
            </Pressable>
  <Pressable
    style={styles.boton}
    onPress={() => props.navigation.navigate("Registrar")}>
    <Text style={styles.textoBoton}>
        ¿No tenés cuenta? Regístrate
    </Text>
</Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 10,
        marginTop: 20,
    },

    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },

    boton: {
      backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#28a745',
    marginTop: 10,
    },

    textoBoton: {
        color: '#fff',
    },

});

export default Login;