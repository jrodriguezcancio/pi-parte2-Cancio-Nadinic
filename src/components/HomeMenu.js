import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CrearPost from '../screens/CrearPost';
import HomePage from '../screens/HomePage';
import MiPerfil from '../screens/MiPerfil';

const Tab = createBottomTabNavigator();

function HomeMenu(){
    return(
        <Tab.Navigator>
        <Tab.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Tab.Screen name="CrearPost" component={CrearPost} options={{ headerShown: false }}/>
        <Tab.Screen name="MiPerfil" component={MiPerfil} options={{ headerShown: false }}/>
        
        </Tab.Navigator>
    )
}
export default HomeMenu