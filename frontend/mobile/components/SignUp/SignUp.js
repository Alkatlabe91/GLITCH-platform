import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { signUp } from '../../services/auth';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [getFirstName, setFirstName] = useState('');
  const [getLastName, setLastName] = useState('');
  const [getUserName, setUserName] = useState('');
  const [getPassword, setUserPassword] = useState('');
  const [getEmail, setEmail] = useState('');
  const [passwordValid, setUserPasswordValid] = useState(true);
  const navigation = useNavigation();

  const submit = () => {
    signUp(getFirstName, getLastName, getEmail, getUserName, getPassword)
      .then((response) => {
        if (response.user.isTeacher === 1) {
          navigation.navigate('TeacherDashboard', { screen: 'Home' });
        } else {
          navigation.navigate('UserDashboard', { screen: 'Home' });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (getPassword.length < 6 && getPassword !== '') {
      setUserPasswordValid(false);
    } else {
      setUserPasswordValid(true);
    }
  }, [getPassword]);

  return (
    <View className="flex-1 justify-center px-6 py-12">
      <View className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          source={{ uri: 'https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600' }}
          alt="Your Company"
        />
        <Text className="mt-10 text-center text-2xl font-bold text-gray-900">
          Sign Up
        </Text>
      </View>

      <View className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <View className="space-y-6">
          <View>
            <Text className="block text-sm font-medium text-gray-900">Email</Text>
            <TextInput
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              value={getEmail}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text className="block text-sm font-medium text-gray-900">First Name</Text>
            <TextInput
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              value={getFirstName}
              onChangeText={setFirstName}
            />
          </View>

          <View>
            <Text className="block text-sm font-medium text-gray-900">Last Name</Text>
            <TextInput
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              value={getLastName}
              onChangeText={setLastName}
            />
          </View>

          <View>
            <Text className="block text-sm font-medium text-gray-900">User Name</Text>
            <TextInput
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              value={getUserName}
              onChangeText={setUserName}
            />
          </View>

          <View>
            <View className="flex items-center justify-between">
              <Text className="block text-sm font-medium text-gray-900">Password</Text>
            </View>
            <TextInput
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              secureTextEntry
              value={getPassword}
              onChangeText={setUserPassword}
            />
            {!passwordValid && (
              <Text className="text-red-500 text-xs">Password must be at least 6 characters</Text>
            )}
          </View>

          <Button
            title="Sign Up"
            onPress={submit}
            color="#4F46E5"
          />
        </View>
      </View>
    </View>
  );
};

export default SignUp
