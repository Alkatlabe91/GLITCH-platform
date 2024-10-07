import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getRegisteredModules } from "../../services/domines";
import { NativeWindStyleSheet } from "nativewind";

const Home = ({ navigation }) => {
  // const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    getRegisteredModules()
      .then((modules) => {
        setActivities(modules);
      })
      .catch((error) => {});
  }, []);

  const totalPassedPoints = activities.reduce((total, activity) => {
    return activity.passed ? total + activity.point : total;
  }, 0);

  const totalFinishedTasks = activities.filter(
    (activity) => activity.passed
  ).length;

  const activeCourses = {};
  activities.forEach((ele) => {
    if (!activeCourses[ele.domain_name]) {
      Object.assign(activeCourses, { [ele.domain_name]: ele });
    }
  });

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={(width, height) => {
          scrollViewRef.current.scrollToEnd({ animated: true });
          setTimeout(() => {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
          }, 1000);
        }}
        horizontal
        style={{ marginBottom: 16 }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            className="bg-green-500 text-white p-4 rounded-lg shadow-md"
            style={{ width: 160, height: 160 }}
          >
            <Text className="text-lg font-bold mb-2">Total Finished Tasks</Text>
            <Text className="text-xl">{totalFinishedTasks}</Text>
          </View>

          <View
            className="bg-blue-500 text-white p-4 rounded-lg shadow-md ml-4"
            style={{ width: 160, height: 160 }}
          >
            <Text className="text-lg font-bold mb-2">Total Passed Points</Text>
            <Text className="text-xl">{totalPassedPoints}</Text>
          </View>

          <View
            className="bg-red-500 text-white p-4 rounded-lg shadow-md ml-4"
            style={{ width: 160, height: 160 }}
          >
            <Text className="text-lg font-bold mb-2">Total Active Courses</Text>
            <Text className="text-xl">
              {Object.values(activeCourses).length}
            </Text>
          </View>
        </View>
      </ScrollView>

      {Object.values(activeCourses).map((activeCourse, index) => (
        <View
          key={index}
          className="bg-white rounded-lg shadow-md p-4 mb-4 border-b pb-4 mt-4"
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

      <View className="max-w bg-white text-black p-4 rounded-lg shadow-md mt-4">
        <Text className="text-xl font-semibold mb-4">
          Your Activity Breakdown
        </Text>
        <View className="list-disc">
          {activities.map(
            (activity, index) =>
              activity.reviwed_by && (
                <View key={index} className="mb-2 space-y-4">
                  <Text className="font-semibold">
                    {activity.domain_name} {activity.course_name}{" "}
                    {activity.module_name} {activity.activity_name}:
                  </Text>
                  <Text
                    className={
                      activity.passed ? "text-green-600" : "text-red-600"
                    }
                  >
                    {activity.passed ? "(Passed)" : "(Not Passed)"}
                  </Text>
                </View>
              )
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = NativeWindStyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  horizontalScroll: {
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: "row",
  },
  card: {
    width: 160,
    height: 160,
  },
});

export default Home;
