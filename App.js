import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator } from "@react-navigation/native-stack";

import Registrar from "./src/screens/Registrar";
import Login from "./src/screens/Login";
import { Image, Text, View } from 'react-native';
import HomePage from "./src/screens/HomePage";
import HomeMenu from "./src/components/HomeMenu";
import Comentario from "./src/screens/Comentario";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Registrar" component={Registrar} options={{ headerShown: false }}/>
      <Stack.Screen name="HomePage" component={HomeMenu} options={{ headerShown: false }}/>
      <Stack.Screen name="Comentario" component={Comentario} options={{ headerShown: true }}/>
    </Stack.Navigator>          
    </NavigationContainer>
  );
}