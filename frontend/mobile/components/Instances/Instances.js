import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getInstancesByCourseId } from "../../services/domines";
import NavigationHeader from "../NavigationHeader/NavigationHeader";

function Instances() {
  const navigation = useNavigation();
  const route = useRoute();
  const [instances, setInstances] = useState([]);
  const { course } = route.params;

  useEffect(() => {
    console.log({ course });
    if (course && course.course_id) {
      getInstancesByCourseId(course.course_id)
        .then((instances) => {
          setInstances(instances);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [course]);

  const registerModules = (instance) => {
    navigation.navigate("Modules", { instance });
  };

  return (
    <ScrollView className="max-w bg-white rounded-xl shadow-md">
      <NavigationHeader
        navigations={[
          {
            display: "Domains & Courses",
            valueToPass: null,
            url: "UserDashboard",
          },
          {
            display: "Instances",
            valueToPass: null,
            url: "/",
            current: true,
          },
        ]}
      />
      <View className="p-6">
        <Text className="text-2xl font-bold mb-4">{course?.course_name}</Text>
        <Text className="text-base text-gray-600 mb-10">
          {course?.course_description}
        </Text>

        <View className="flex flex-col space-y-4">
          {instances &&
            instances.map((instance) => {
              return (
                <View
                  key={instance.instance_id}
                  className="bg-white rounded-lg shadow-md p-6 mb-4 border-b pb-4"
                >
                  <Text className="text-lg font-bold text-gray-900 mb-2">
                    {instance.instance_name}
                  </Text>
                  <Text className="text-base text-gray-600">
                    <Text className="font-bold">Start Date: </Text>
                    {instance.start_date}
                  </Text>
                  <Text className="text-base text-gray-600">
                    <Text className="font-bold">End Date: </Text>
                    {instance.end_date}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      registerModules(instance);
                    }}
                    className="flex w-full justify-center text-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
                  >
                    <Text className="text-white  text-center">GO</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
}

export default Instances;
