import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator } from "@react-navigation/native-stack";

import Registrar from "./src/screens/Registrar";
import Login from "./src/screens/Login";
import { Image, Text, View } from 'react-native';
import HomePage from "./src/screens/HomePage";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Registrar" component={Registrar}/>
      <Stack.Screen name="HomePage" component={HomePage}/>
    </Stack.Navigator>          
    </NavigationContainer>
  );
}