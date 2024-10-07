import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { getRegisteredModules, getAllDomines } from "../../services/domines";
import DomineCart from "../DomineCart/DomineCart";

const Domines = ({ navigation }) => {
  const [activities, setActivities] = useState([]);
  const [domines, setDomines] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const [modules, _domaines] = await Promise.all([
        getRegisteredModules(),
        getAllDomines(),
      ]);
      console.log({ modules, _domaines });
      setActivities(modules);
      setDomines(_domaines);
    }
    fetchData();
  }, []);

  const activeCourses = {};
  activities.forEach((ele) => {
    if (!activeCourses[ele.domain_name]) {
      Object.assign(activeCourses, { [ele.domain_name]: ele });
    }
  });

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {Object.values(activeCourses).map((activeCourse, index) => (
        <View
          key={index}
          className="bg-white rounded-lg shadow-md p-4 mb-4 border-b pb-4 mt-2"
        >
          <Text className="text-lg font-semibold text-gray-700 mb-4 mt-2">
            Complete your course
          </Text>
          <Text className="text-sm font-semibold text-gray-700 mb-1">
            <Text className="font-bold">Domine :</Text>{" "}
            {activeCourse.domain_name}
          </Text>
          <Text className="text-lg font-bold text-gray-900 mb-2">
            <Text className="font-bold">Module Name:</Text>{" "}
            {activeCourse.module_name}
          </Text>
          <Text className="text-base text-gray-600">
            <Text className="font-bold">Course Name:</Text>{" "}
            {activeCourse.course_name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const module = {
                module_name: activeCourse.module_name,
                module_id: activeCourse.module_id,
              };
              console.log({ module });
              navigation.navigate("Activities", { module });
            }}
            className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
          >
            <Text className="text-white text-center">Complete Learning</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text className="text-2xl font-bold mb-4">Courses</Text>
      <View className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {domines?.map((domin, index) => {
          if (domin.courses && domin.courses.length > 0) {
            return (
              <View
                key={index}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                <Text className="text-xl font-semibold mb-2">
                  {domin.domain_name}
                </Text>
                <DomineCart
                  key={index}
                  domin_id={domin.domain_id}
                  domin_name={domin.domain_name}
                  courses={domin.courses}
                  navigation={navigation}
                />
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
};

export default Domines;
