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
            <Text>Crear Post</Text>
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
        paddingHorizontal: 10,
        marginTop: 20,
        flex: 1,
    },
    input: {    
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    boton: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    textoBoton: {
        color: "#fff",
        fontWeight: "bold",
    },
});
export default CrearPost