import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { db, auth} from "../config/firebase";
import firebase from "firebase"
import { useState } from "react";
import {arrayRemove, arrayUnion} from "firebase/firestore";

function Post(props) {

    const likes = props.data.likes || [];
    const usuarioLikeo = likes.includes(auth.currentUser.email);

    function like() {
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(
                    auth.currentUser.email
                ),
            })
            .catch(() => console.log("Error al dar like"));
    }

    function dislike() {
        db.collection("posts")
            .doc(props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(
                    auth.currentUser.email
                ),
            })
            .catch(() => console.log("Error al quitar like"));
    }

    return (
        <View style={styles.container}>
            <Text>{props.data.descripcionPost}</Text>
            <Text>{props.data.email}</Text>

            <Text>Likes: {likes.length}</Text>

            {usuarioLikeo ? (
                <Text onPress={dislike}>Dislike</Text>
            ) : (
                <Text onPress={like}>Like</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        padding: 10,
        margin: 10,
    },
});

export default Post;