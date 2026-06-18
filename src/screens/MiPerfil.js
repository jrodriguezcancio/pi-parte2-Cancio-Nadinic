import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";

function MiPerfil(props) {

    const [users, setUsers] = useState([]);
    const [posts, setPost] = useState([]);

    useEffect(() => {
        db.collection("users")
        .onSnapshot((docs) => {
            let array = [];

            docs.forEach((doc) => {
                array.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            setUsers(array);
        });
    }, []);

    useEffect(() => {
        db.collection("posts")
        .where("owner", "==", auth.currentUser.email).
        orderBy('createdAt','desc')
        .onSnapshot((docs) => {
            let array = [];
            docs.forEach((doc) => {
                array.push(doc.data());
            });
            setPost(array);
        });
    }, []);

    function logout() {
        auth.signOut()
        .then(() => {
            props.navigation.navigate("Login");
        })
        .catch((err) => console.log(err));
    }

    return (
        <View style={styles.container}>

            <View style={styles.perfil}>
                <Text style={styles.nombreUsuario}>Mi Perfil</Text>
                <Text style={styles.email}>
                    {auth.currentUser.email}
                </Text>
                <Text style={styles.email}>
                    Posts creados: {posts.length}
                </Text>
            </View>

            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Image
                            source={{
                                uri: `data:image/jpeg;base64,${item.photo}`,
                                resize:'contain'
                            }}
                            style={styles.imagenPost}
                        />
                        <Text style={styles.tituloPost}>
                            {item.titulo}
                        </Text>
                        <Text style={styles.descripcionPost}>
                            {item.descripcion}
                        </Text>

                    </View>
                )}
            />

            <Pressable
                style={styles.botonLogout}
                onPress={() => logout()}
            >
                <Text style={styles.textoBoton}>
                    Cerrar sesión
                </Text>
            </Pressable>

        </View>
    );
}

export default MiPerfil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
        paddingTop: 15,
    },

    perfil: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 25,
        borderRadius: 25,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    nombreUsuario: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 10,
    },

    email: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 5,
    },

    post: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 25,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    imagenPost: {
        width: "100%",
        height: 280,
    },

    tituloPost: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#111827",
        paddingHorizontal: 18,
        paddingTop: 15,
        marginBottom: 8,
    },

    descripcionPost: {
        fontSize: 16,
        color: "#4B5563",
        paddingHorizontal: 18,
        paddingBottom: 18,
        lineHeight: 24,
    },

    botonLogout: {
        backgroundColor: "#EF4444",
        marginHorizontal: 20,
        marginBottom: 25,
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: "center",
    },

    textoBoton: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});