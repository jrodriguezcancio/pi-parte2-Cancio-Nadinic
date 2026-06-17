import React from 'react';
import { StyleSheet, Text, View, Image,Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import { FlatList } from 'react-native-web';



function MiPerfil(props) {

    const [users, setUsers] = useState([]);
    const [posts, setPost] = useState([]);
 
    useEffect(() => {
        db.collection("users").onSnapshot(
            docs => {
                let users = [];
                docs.forEach(doc => {
                    users.push({ ...doc.data(), id: doc.id });
                });
                setUsers(users);
            }
        )
    }, []);
    useEffect(() => {
        db.collection("posts").where("owner", "==", auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(doc => {
                    posts.push({ ...doc.data(), id: doc.id });
                });
                setPost(posts);
            }
        )
    }, []);
    function logout() {
    auth.signOut()
        .then(() => {
            console.log("Sesión cerrada");
            props.navigation.navigate("Login");
        })
        .catch(error => {
            console.log(error);
        });
}

    return(
        <View style={styles.container}>
            <Text>Mi Perfil</Text>
            <Text>Usuario: {auth.currentUser.email}</Text>
            <Text>Posts creados: {posts.length}</Text>
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
        <View>
            <Image
                source={{ uri: `data:image/jpeg;base64,${item.photo}` }}
                style={{ width: 200, height: 200 }}
            />

            <Text>{item.titulo}</Text>
            <Text>{item.descripcion}</Text>
                        </View>
            )}
            />
            <Pressable onPress={() => logout()}>
                <Text>Cerrar sesión</Text>
            </Pressable>
        </View>
    
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MiPerfil;