import React, { use, useEffect, useState } from "react";
import { StyleSheet, Pressable, Text, View, TextInput } from "react-native";
import {auth} from "../config/firebase";


function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    
   useEffect(() => {
        const rememberMe = auth.onAuthStateChanged((user) => {
            if(user){
                props.navigation.navigate("HomePage");
            }
        });

        return rememberMe;
    }, []);

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
            <Text style={styles.bien}>Bienvenidos</Text>
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
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 25,
        backgroundColor: "#F4F6F8",
    },

    bien: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2563EB",
        textAlign: "center",
        marginBottom: 10,
    },

    input: {
        height: 50,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        marginVertical: 8,
        fontSize: 16,
    },

    boton: {
        backgroundColor: "#2563EB",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 12,
    },

    textoBoton: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },

});

export default Login;