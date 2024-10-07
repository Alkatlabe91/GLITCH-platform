import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { getAllDomines } from "../../services/domines";
import { logout } from "../../services/auth";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home/Home";
import UserProfile from "../UserProfile/UserProfile";
import Domines from "../Domines/Domines";
import Community from "../Community/Community";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const UserDashboard = () => {
  // const [domines, setDomines] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {}, []);

  const handleLogout = () => {
    logout().then(() => {
      navigation.navigate("Login");
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Learning") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Community") {
              iconName = focused ? "people" : "people-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
        })}
      >
        <Tab.Screen name="Home" options={{ headerShown: false }}>
          {() => <Home navigation={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={UserProfile}
        />
        <Tab.Screen options={{ headerShown: false }} name="Learning">
          {() => <Domines navigation={navigation}></Domines>}
        </Tab.Screen>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Community"
          component={Community}
        />
        <Tab.Screen options={{ headerShown: false }} name="Logout">
          {({ navigation }) => (
            <View className="flex-1 justify-center items-center">
              <Text className="mt-8 mb-8"> Are you sure you want to logout</Text>
              <Button title="Yes" onPress={() => handleLogout(navigation)} />
            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default UserDashboard;
