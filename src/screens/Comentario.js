import React from "react";
import { StyleSheet, Text, View, TextInput, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { FlatList } from "react-native";

function Comentario() {
    const [comentarios, setComentarios] = useState([]);
    const [textoComentario, setTextoComentario] = useState("");
    const [photoComentario, setPhotoComentario] = useState(null);
 

    function agregarComentario() {
        db.collection("comentarios").add({
            texto: textoComentario,
            usuario: auth.currentUser.email,
            createdAt: Date.now(),
            photo: photoComentario
        })
        .then(() => {
            setTextoComentario("");
        })
        .catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        db.collection("comentarios").orderBy("createdAt", "desc").onSnapshot(
            docs => {
                let comentarios = [];
                docs.forEach(doc => {
                    comentarios.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setComentarios(comentarios);
            }
        )
    }, []);

    return (
        <View style={styles.container}>
            <Text>Comentarios</Text>
            <TextInput
                style={styles.input}
                placeholder="Escribe tu comentario"
                onChangeText={text => setTextoComentario(text)}
                value={textoComentario}

            />
            <Pressable style={styles.boton} onPress={() => agregarComentario()}>
                <Text style={styles.textoBoton}>Agregar Comentario</Text>
            </Pressable>
            <FlatList
                data={comentarios}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.comentario}>
                        <Text>{item.data.texto}</Text>
                          <Image  
                          source={{ uri: `data:image/jpeg;base64,${item.data.photo}`}} 
                          style={{ width: 200, height: 200 }} />
                        <Text>Creado por: {item.data.usuario}</Text>    
                        </View>
                )}  
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        paddingTop: 10,
    },
    comentario: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginHorizontal: 16,
        padding: 16,
        marginBottom: 10,
    },
});

export default Comentario;