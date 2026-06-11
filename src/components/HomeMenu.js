import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';

const Tab = createBottomTabNavigator();

function HomeMenu(){
    return(
        <Tab.Navigator>
       <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
    )
}
export default HomeMenu