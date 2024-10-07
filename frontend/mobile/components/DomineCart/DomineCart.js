import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DomineCart = (
  domin = { domin_name: "", domin_id: "", courses: [], navigation }
) => {
  // const navigation = useNavigation();
  const registerCourse = (course) => {
    // navigation.navigate("Instances"
    //   , {
    //   state: { course },
    //   screen: "Instances",
    // });
    console.log({course})
    domin.navigation.navigate("Instances", {
      screen: "Instances",
      course,
    
    });
  };

  return (
    <View className="flex flex-col space-y-4">
      {domin.courses &&
        domin.courses.map((course, index) => {
          return (
            <View key={course.course_id} className="mb-4 border-b pb-4">
              <Text className="text-lg font-bold text-gray-900 mb-2">
                <Text className="font-bold">Course Name:</Text>{" "}
                {course.course_name}
              </Text>
              <Text className="text-base text-gray-600 mb-2">
                <Text className="font-bold">Course Description:</Text>{" "}
                {course.course_description}
              </Text>
              <TouchableOpacity
                onPress={() => registerCourse(course)}
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
              >
                <Text className="text-white text-center">Start Learning</Text>
              </TouchableOpacity>
            </View>
          );
        })}
    </View>
  );
};

export default DomineCart;
