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
                   source={{uri: `data:image/png;base64,${uri}`}} />
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
                    <Text>Soy la camara</Text>
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
            justifyContent: "center",
            alignItems: "center",
        },
        camara: {
            width: 800,
            height: 300,
        },
        shootButton: {
            backgroundColor: "#ccc",
            textAlign: "center",
            padding: 10,
            borderRadius: 5,
        },
        preview: {
            width: 200,
            height: 200,
        },
        buttonsContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: 200,
        }
        
    })

export default Camara;

