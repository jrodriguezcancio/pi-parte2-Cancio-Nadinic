import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import {useState, useEffect} from "react";
import {useRef} from "react";
import {db, auth} from "../config/firebase";
import { Camera, CameraView} from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';

function Camara(props) {
    const [permisos, setPermisos] = useState(false);
    const [uri, setUri] = useState(null);
    let metodosCamara = useRef(null);

    useEffect(() => {
        Camera.requestCameraPermissionsAsync()
        .then(() => setPermisos(true))
        .catch((error) => {
            console.log(error);
        })
        }, [])

    function takePicture() {
        metodosCamara.current.takePictureAsync()
        .then((imgTemp)=> {
            return manipulateAsync(imgTemp.uri,
                [{resize: {width:200}}],
                {compress: 0.7, base64: true});
        })
        .then((imgManipulada) => {
            setUri(imgManipulada.base64);
        })
        .catch((error) => {
            console.log(error);
        })
       }

       function savePhoto() {
        props.setPhotoUri(uri);
         }

        function clearPhoto() {
                setUri(null);
            }
            
    return(
           <View style={styles.container}>
            {
                !permisos ?
                <View>
                    <Text> No tenés permisos para usar la cámara</Text>
                </View>
                :
                uri ? 
                <View>
                   <Image style = {styles.preview}
                   source={{uri: `data:image/jpeg;base64,${uri}`}} />
                   <View style={styles.buttonsContainer}>
                    <Pressable onPress={() => savePhoto()}>
                        <Text>Aceptar</Text>
                    </Pressable>
                    <Pressable onPress={() => clearPhoto()}>
                        <Text>Rechazar</Text>
                    </Pressable>
                </View>
                </View>
            
                :

                <>
                 <CameraView 
                 style={styles.camara}
                 facing='back'
                ref={metodosCamara}/>
    
                <Pressable
                style={styles.shootButton}
                onPress={() => {takePicture()}}>
                    <Text>Shoot</Text>
                </Pressable>
                </>
            }
    
    
    
    
           </View>
        )
}

   const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    camara: {
        width: "95%",
        height: 400,
        borderRadius: 15,
        overflow: "hidden",
        marginVertical: 20,
    },

    shootButton: {
        backgroundColor: "#28a745",
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 15,
        elevation: 3,
    },

    preview: {
        width: 250,
        height: 250,
        borderRadius: 15,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: "#ddd",
    },

    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: 250,
        marginTop: 10,
        paddingVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 2,
    }
});

export default Camara;

