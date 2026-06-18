import React from "react";
import {StyleSheet, Pressable, Text, View, FlatList, Image} from "react-native";
import { useState, useEffect } from "react";
import { db, auth} from "../config/firebase";
import Post from "../components/Post";

function HomePage(props) {

    const [posts, setPost] = useState([]);

    useEffect(() => {
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot(
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
                            <Text style={styles.descripcionPost}>Creado por: {item.data.owner}</Text>
                            <Post id={item.id} data={item.data} />
                            <Pressable onPress={() => props.navigation.navigate("Comentario", { postId: item.id,
                                post: item.data
                             })}>
                                <Text>Ver comentarios</Text>
                            </Pressable>
                
                        </View>
                    )}
                />
             
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F8",
        paddingTop: 10,
    },

    post: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 15,
        borderRadius: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 4,
    },

    tituloPost: {
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 8,
        color: "#222",
    },

    descripcionPost: {
        fontSize: 15,
        color: "#555",
        marginBottom: 6,
        lineHeight: 22,
    },
});

export default HomePage; 