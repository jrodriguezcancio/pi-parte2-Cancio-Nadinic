import React, { useState } from "react";
import { StyleSheet, Pressable, Text, View, TextInput } from "react-native";
import {auth, db} from "../config/firebase";
import Camara from "../components/Camara";


function CrearPost(props) {


    const [photouri, setPhotoUri] = useState(null);
    const [posts, setPosts] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    function onSubmit() {
        db.collection("posts").add({
            owner: auth.currentUser.email,
            titulo: titulo,
            descripcion: descripcion,
            createdAt: Date.now(),
            likes: [],
            photo: photouri
        })
        .then(()=> {
            setTitulo("");
            setDescripcion("");
                props.navigation.navigate("HomePage");
        })
        .catch((error) => {
            console.log(error);
        })
       alert("Post creado con éxito");
    }
    return(
        <View style={styles.container}>
            {
                photouri === null ?
                <Camara setPhotoUri={uri => setPhotoUri(uri)} />
                :
               
            <View style={styles.container}>
            <Text style={styles.titulo}>Crear Post</Text>
            <TextInput style={styles.input}
                placeholder="Título"
                onChangeText={text => setTitulo(text)}
                value={titulo} />
            <TextInput style={styles.input}
                placeholder="Descripción"
                onChangeText={text => setDescripcion(text)}
                value={descripcion} />
            <Pressable style={styles.boton}
                onPress={() => onSubmit()} >
                <Text style={styles.textoBoton}>
                      Crear Post
                </Text>
            </Pressable>

        </View>
}
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

    titulo: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2563EB",
        textAlign: "center",
        marginBottom: 25,
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
export default CrearPost