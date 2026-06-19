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
            
            <Text style={styles.titulo}>Registrese</Text>

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
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 25,
        backgroundColor: "#F4F6F8",
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

    titulo: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2563EB",
        textAlign: "center",
        marginBottom: 25,
    },

});

export default Registrar;