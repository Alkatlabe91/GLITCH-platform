import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function NavigationHeader(props) {
  const navigation = useNavigation();
  return (
    <View className="bg-gray-800 p-4">
      <View className="flex flex-row space-x-2">
        {props.navigations.map((nav, index) => {
          console.log(nav);
          return (
            <TouchableOpacity
              key={index}
              className={`${
                nav.current
                  ? "text-white hover:text-yellow-300 text-yellow-300"
                  : "text-white hover:text-yellow-300"
              }`}
              onPress={() => {
                if (nav.current) {
                  return;
                }
                navigation.navigate(nav.url, nav.valueToPass);
              }}
            >
              <Text className="text-white">
                {nav.display}
                {!nav.current && <Text>{" >"}</Text>}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default NavigationHeader;
