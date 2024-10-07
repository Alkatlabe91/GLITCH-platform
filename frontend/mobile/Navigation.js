import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { isAuthenticated } from "./services/auth";
import Instances from "./components/Instances/Instances";
import Modules from "./components/Modules/Modules";
import UserActivity from "./components/UserActivity/UserActivity";
const Stack = createStackNavigator();

const AppNavigator = () => {
  const authLoader = async (navigation) => {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      navigation.navigate("Login");
    }
  };
  const authLogin = async (navigation) => {
    const isAuth = await isAuthenticated();
    if (isAuth) {
      navigation.navigate("UserDashboard");
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          listeners={({ navigation }) => ({
            state: () => authLogin(navigation),
          })}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="UserDashboard"
          options={{ headerTitle: "Your Dashboard" , headerLeft : ()=>null}}
          

          component={UserDashboard}
          listeners={({ navigation }) => ({
            state: () => authLoader(navigation),
          })}
        />
        <Stack.Screen
          name="Instances"
          component={Instances}
          listeners={({ navigation }) => ({
            state: () => authLoader(navigation),
          })}
        />
        <Stack.Screen
          name="Modules"
          component={Modules}
          listeners={({ navigation }) => ({
            state: () => authLoader(navigation),
          })}
        />
        <Stack.Screen
          name="Activities"
          component={UserActivity}
          listeners={({ navigation }) => ({
            state: () => authLoader(navigation),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
