import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getUserProgress,
  submitModuleActivity,
  createPost,
} from "../../services/domines";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import { ToastAndroid } from "react-native";
import SocialMediaShare from "../SocialMediaShare/SocialMediaShare";
function UserActivity() {
  const navigation = useNavigation();
  const route = useRoute();
  const [activities, setActivities] = useState([]);
  const { module } = route.params || {};

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = () => {
    if (module && module.module_id) {
      getUserProgress(module.module_id)
        .then((response) => {
          setActivities(response);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const createNewPost = (activity, content) => {
    createPost(activity.user_progress_module_id, content)
      .then(() => {
        getActivities();
        ToastAndroid.show("Your post has been published", ToastAndroid.SHORT);
      })
      .catch((error) => {
        ToastAndroid.show("Failed to publish post", ToastAndroid.SHORT);
      });
  };

  const onSubmit = (activity) => {
    submitModuleActivity(activity.user_progress_module_id)
      .then((response) => {
        getActivities();
        ToastAndroid.show("Your activity has been submitted and it is wil be reviwed", ToastAndroid.SHORT);
      })
      .catch((error) => {
        ToastAndroid.show("Failed to submit activity", ToastAndroid.SHORT);
      });
  };

  const getActivityImage = (type) => {
    if (type.includes("concept")) {
      return require("../../assets/concept-challenge.png");
    } else if (type.includes("point")) {
      return require("../../assets/point-challenge.png");
    } else {
      return require("../../assets/task.png");
    }
  };

  return (
    <View className="w-full bg-white">
      <NavigationHeader
        navigations={[
          {
            display: "Domains & Courses",
            valueToPass: null,
            url: "UserDashboard",
          },
          {
            display: "Instances",
            valueToPass: {
              course: {
                course_id:
                  activities && activities.length > 0
                    ? activities[0].course_id
                    : null,
                course_name:
                  activities && activities.length > 0
                    ? activities[0].course_name
                    : null,
                course_description:
                  activities && activities.length > 0
                    ? activities[0].course_description
                    : null,
              },
            },
            url: "Instances",
          },
          {
            display: "Modules",
            valueToPass: {
              instance: {
                instance_id:
                  activities && activities.length > 0
                    ? activities[0].instance_id
                    : null,
                instance_name:
                  activities && activities.length > 0
                    ? activities[0].instance_name
                    : null,
              },
            },
            url: "Modules",
          },
          {
            display: "Activities",
            valueToPass: null,
            screen: "UserActivity",
            current: true,
          },
        ]}
      />
      <ScrollView className="w-full">
        <Text className="text-2xl font-bold mt-4 mb-4">
          Activities
        </Text>
        <View className="p-6 pt-14 flex flex-col space-y-4">
          {activities.map((activity, index) => (
            <View
              key={index}
              className={`p-4 border rounded-lg ${
                activity.type === "Task"
                  ? "bg-white border-gray-300"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <View
                className="flex justify-between"
                style={{ position: "relative" }}
              >
                <View className="flex items-center mt-2">
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                    }}
                    source={getActivityImage(activity.type)}
                    className="w-6 h-6 mr-2"
                  />
                </View>
                <View>
                  <Text className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                    {activity.type.includes("task")
                      ? "Task"
                      : activity.type.includes("point")
                      ? `POINT CHALLENGE EARN  ${activity.point} POINTS`
                      : `CONCEPT CHALLENGE EARN  ${activity.point} POINTS`}
                  </Text>
                  <View className="uppercase tracking-wide text-lg text-black font-semibold">
                    <Text> {activity.activity_name}</Text>
                  </View>
                </View>
                
              </View>
              {activity.passed && activity.user_post_id === null ? (
                <View className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                  <Text className="text-xl font-semibold text-center text-gray-800">
                    Share Your Progress
                  </Text>
                  <Text className="text-gray-600 text-center mb-4">
                    Congratulations! You earned {activity.point} points for
                    completing this task.
                  </Text>
                  <View className="text-center">
                    <TouchableOpacity
                      onPress={() => {
                        createNewPost(
                          activity,
                          `Hello everyone, I have completed a task and earned ${activity.point} points!`
                        );
                      }}
                      className="bg-pink-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <Text className="text-white text-center">Share Task</Text>
                    </TouchableOpacity>

                    <View className="flex justify-center mt-8 mb-4">
                      <SocialMediaShare
                        defaultTitle={`Hello everyone, I have completed a task and earned ${activity.point} points!`}
                      />
                    </View>
                  </View>
                </View>
              ) : null}

              {activity.passed && activity.user_post_id ? (
                <View className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                  <Text className="text-xl font-semibold text-center text-gray-800">
                    Check This Out!
                  </Text>
                  <Text className="text-gray-600 text-center mb-4">
                    {activity.post_content}
                  </Text>
                  <View className="flex justify-center">
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("UserDashboard", {
                          screen: "Community",
                        })
                      }
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      <Text className="text-blue-500 text-center">
                        Go to community to see reactions
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}

              <View className="mt-4 space-x-2 flex flex-row flex-wrap space-x-2">
                {activity.reviwed_by ? (
                  <Text
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      activity.passed
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {activity.passed ? "Passed" : "Not Passed"}
                  </Text>
                ) : null}
                <Text className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  Points: {activity.point}
                </Text>
                <Text
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    activity.reviwed_by
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {activity.reviwed_by
                    ? `Reviewed by: ${activity.first_name} ${activity.last_name}`
                    : "Not Reviewed"}
                </Text>
                <Text
                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                    activity.submited
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {activity.submited ? "Submitted" : "Not Submitted"}
                </Text>
              </View>

              {!activity.submited ? <TouchableOpacity onPress={() => onSubmit(activity)} className="mt-6 mb-6 bg-pink-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <Text className="text-white text-center">SUBMIT</Text>
              </TouchableOpacity> :null }
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default UserActivity;
