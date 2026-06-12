import React from "react";
import {StyleSheet, Pressable, Text, View, FlatList, Image} from "react-native";
import { useState, useEffect } from "react";
import { db, auth} from "../config/firebase";

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
        <View>
                <FlatList
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.post}>
                            <Text>{item.data.titulo}</Text>
                            <Text>{item.data.descripcion}</Text>
                        </View>
                    )}
                />
             
        </View>
    )
}
const styles = StyleSheet.create({
    boton:{
        backgroundColor: '#ccc',
        textAlign: "center",
        padding: 10,
        bottomMargin: 10,
        borderRadius: 5
    }
})

export default HomePage; 