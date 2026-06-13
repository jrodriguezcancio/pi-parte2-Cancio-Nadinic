import React from "react";
import {StyleSheet, Pressable, Text, View, FlatList, Image} from "react-native";
import { useState, useEffect } from "react";
import { db, auth} from "../config/firebase";
import Post from "../components/Post";

function HomePage() {

    const [posts, setPost] = useState([]);

    useEffect(() => {
        db.collection("posts").onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                console.log(posts);
                setPost(posts);
            }
        )
    }, []);

    return(
        <View style={styles.container}>
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Image 
                    source={{ uri: `data:image/jpeg;base64,${item.data.photo}`}} 
                    style={{ width: 200, height: 200 }} 
                />
                            <Text style={styles.tituloPost}>{item.data.titulo}</Text>
                            <Text style={styles.descripcionPost}>{item.data.descripcion}</Text>
                            <Post id={item.id} data={item.data} />
                        </View>
                    )}
                />
             
        </View>
    )
}
const styles = StyleSheet.create({
container: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Fondo gris muy claro, resalta las tarjetas blancas
        paddingTop: 10,
    },
post: {
    backgroundColor: '#FFFFFF', // Tarjeta blanca
        borderRadius: 16, // Bordes bien redondeados y modernos
        marginBottom: 20,
        marginHorizontal: 16,
        padding: 16,
        alignItems: 'center', // Centra el contenido dentro de la tarjeta
},
tituloPost: {
        fontSize: 18,
        fontWeight: '700', // Negrita tipográfica moderna
        color: '#1E293B', // Azul oscuro casi negro (más elegante que negro puro)
        marginBottom: 6,
        textAlign: 'center'
    },
    descripcionPost: {
        fontSize: 14,
        color: '#64748B',
        lineHeight: 20,
        // CLAVE 3: Centra el texto de la descripción
        textAlign: 'center', 
    }
})

export default HomePage; 