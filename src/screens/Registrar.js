import React, { useState } from "react";
import { StyleSheet, Pressable, Text, View, TextInput } from "react-native";
import {db, auth } from "../config/firebase";

function Registrar(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usuario, setUsuario] = useState("");

    
    function onSubmit() {
        if(email === ""){
    alert("El email es obligatorio");
    return;
}

if(password.length < 6){
    alert("La contraseña debe tener al menos 6 caracteres");
    return;
}

if(usuario === ""){
    alert("El usuario es obligatorio");
    return;
}

        auth.createUserWithEmailAndPassword(email, password)
        .then((response) => {
            db.collection("users").add({
                owner: auth.currentUser.email,
                usuario: usuario,
                createdAt: Date.now(),
            })
            .then(() => {
                props.navigation.navigate("Login");
            })
            })
        .catch((error) => {
        alert("Error al registrar usuario");
        })
    }

    return(
        <View style={styles.container}>
            
            <Text>Registro</Text>

            <TextInput style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />
             <TextInput 
             style={styles.input}
                keyboardType="default"
                placeholder="Usuario"
                onChangeText={text => setUsuario(text)}
                value={usuario}
             />

            <Pressable
                style={styles.boton}
                onPress={() => onSubmit()} >
                <Text style={styles.textoBoton}>
                    Registrarse
                </Text>
            </Pressable>
           
         <Pressable
    style={styles.boton}
    onPress={() => props.navigation.navigate("Login")}>
    <Text style={styles.textoBoton}>
        ¿Ya tenés cuenta? Inicia sesión
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

export default Registrar;