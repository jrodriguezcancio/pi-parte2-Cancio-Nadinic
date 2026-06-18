import React from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { FlatList } from "react-native";

function Comentario(props) {
    const [comentarios, setComentarios] = useState([]);
    const [textoComentario, setTextoComentario] = useState("");
    const [photoComentario, setPhotoComentario] = useState(null);
    const postId = props.route.params.postId
    const post = props.route.params.post

    function agregarComentario() {
        db.collection("comentarios").add({
            texto: textoComentario,
            usuario: auth.currentUser.email,
            createdAt: Date.now(),
            photo: photoComentario,
            postId: postId,
        })
        .then(() => {
            setTextoComentario("");
        })
        .catch((error) => {
            console.log(error);
        });
    };
   useEffect(() => {
    db.collection("comentarios")
        .where("postId", "==", props.route.params.postId)
        .onSnapshot(
            docs => {
                let comentarios = [];

                docs.forEach(doc => {
                    comentarios.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });

                setComentarios(comentarios);
            },
            error => {
                console.log(error);
            }
        );
}, []);
    return (
        <View style={styles.container}>

        <View style={styles.comentario}>
            <Image
                source={{ uri: `data:image/jpeg;base64,${post.photo}` }}
                style={{ width: 200, height: 200 }}
            />
            <Text>{post.titulo}</Text>
            <Text>{post.descripcion}</Text>
            <Text>Creado por: {post.owner}</Text>
        </View>

        <TextInput
            style={styles.input}
            placeholder="Escribe tu comentario"
            onChangeText={text => setTextoComentario(text)}
            value={textoComentario}
        />

        <Pressable
            style={styles.boton}
            onPress={() => agregarComentario()}
        >
            <Text style={styles.textoBoton}>
                Agregar Comentario
            </Text>
        </Pressable>

        <FlatList
            data={comentarios}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.comentario}>
                    <Text>{item.data.texto}</Text>
                    <Text>
                        Creado por: {item.data.usuario}
                    </Text>
                </View>
            )}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        paddingTop: 10,
    },

    comentario: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginHorizontal: 16,
        padding: 16,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 3,
    },

    input: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#DADADA",
        marginBottom: 10,
    },

    boton: {
        backgroundColor: "#007AFF",
        marginHorizontal: 16,
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 15,
    },

    textoBoton: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
    },

    imagenPost: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 10,
    },

    tituloPost: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },

    descripcionPost: {
        fontSize: 16,
        color: "#444",
        marginBottom: 8,
    },

    ownerPost: {
        fontSize: 14,
        color: "gray",
        fontStyle: "italic",
    },

    usuarioComentario: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 5,
    },

    textoComentario: {
        fontSize: 16,
        color: "#333",
    },
});

export default Comentario;