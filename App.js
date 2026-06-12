import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator } from "@react-navigation/native-stack";

import Registrar from "./src/screens/Registrar";
import Login from "./src/screens/Login";
import { Image, Text, View } from 'react-native';
import HomePage from "./src/screens/HomePage";
import HomeMenu from "./src/components/HomeMenu";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Registrar" component={Registrar}/>
      <Stack.Screen name="HomePage" component={HomeMenu}/>
    </Stack.Navigator>          
    </NavigationContainer>
  );
}