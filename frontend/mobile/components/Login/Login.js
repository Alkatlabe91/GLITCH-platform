import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { login } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
// import { useSocket } from '../SocketContext/SocketContext';

const Login = () => {
  const [getUserName, setUserName] = useState("user1");
  const [getPassword, setUserPassword] = useState("password1");
  const navigation = useNavigation();
  //   const socket = useSocket();

  const submit = () => {
    login(getUserName, getPassword)
      .then((response) => {
        if (response.user.isTeacher === 1) {
          navigation.navigate("TeacherDashboard", { screen: "Home" });
        } else {
          navigation.navigate("UserDashboard", { screen: "Home" });
        }
        // socket.emit('join_user_room', { room: response.user.user_id });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <View className="flex-1 justify-start px-6 py-2">
      <View className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          source={{
            uri: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
          }}
          alt="Your Company"
        />
        <Text className="mt-10 text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </Text>
      </View>

      <View className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <View className="space-y-6">
          <View>
            <Text className="block text-sm font-medium text-gray-900">
              User Name
            </Text>
            <TextInput
              className=" w-full border-bottom-1  border-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              value={getUserName}
              onChangeText={setUserName}
            />
          </View>

          <View>
            <View className="flex items-start justify-between">
              <Text className="block text-sm font-medium text-gray-900">
                Password
              </Text>
             
            </View>
            <TextInput
              className="block mt-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              secureTextEntry
              value={getPassword}
              onChangeText={setUserPassword}
            />
             <TouchableOpacity>
                <Text className="font-semibold text-indigo-600">
                  Forgot password?
                </Text>
              </TouchableOpacity>
          </View>

          <TouchableOpacity
            title="Sign in"
            onPress={submit}
            className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Text className="flex text-center w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </Text>
          </TouchableOpacity>

          {/* <Button
            title="Sign in With Google"
            onPress={submit}
            color="#2563EB"
            className="flex w-full justify-center mt-8 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          /> */}

          <Button
            title="No Account Sign Up"
            onPress={() => navigation.navigate("SignUp")}
            color="#2563EB"
            className="flex w-full justify-center mt-8 rounded-md bg-white-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
