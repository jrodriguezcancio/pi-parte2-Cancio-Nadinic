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
            <Text style={styles.PostHecho}>
                Posts hechos 
            </Text>
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
        paddingTop: 15,
    },

    post: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 15,
        marginBottom: 20,
        padding: 18,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    tituloPost: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 10,
        color: "#1F2937",
    },

    descripcionPost: {
        fontSize: 15,
        color: "#6B7280",
        marginBottom: 8,
        lineHeight: 22,
    },

    owner: {
        fontSize: 13,
        color: "#9CA3AF",
        marginTop: 5,
    },

    boton: {
        backgroundColor: "#2563EB",
        color: "#fff",
        padding: 10,
        borderRadius: 8,
        textAlign: "center",
        marginTop: 10,
    },
    PostHecho:{
fontSize: 30,
    fontWeight: "800",
    color: "#2563EB",
    textAlign: "center",
    marginVertical: 15,
    }
});

export default HomePage; 