import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  registerToCourse,
  getModulesByInstanceId,
  getAllUserProgress,
} from "../../services/domines";
import NavigationHeader from "../NavigationHeader/NavigationHeader";

function Modules() {
  const navigation = useNavigation();
  const route = useRoute();
  const [modules, setModules] = useState([]);
  const { instance } = route.params || {};

  useEffect(() => {
    if (instance && instance.instance_id) {
      getModulesByInstanceId(instance.instance_id)
        .then((_modules) => {
          getAllUserProgress(_modules.map((mod) => mod.module_id))
            .then((response) => {
              _modules.forEach((el) => {
                el.activities = response.find((mod) =>
                  mod.some((e) => e.module_id === el.module_id)
                );
              });
              setModules(_modules);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [instance]);

  const registerModules = (module) => {
    registerToCourse(module.module_id)
      .then((response) => {
        console.log(response);
        navigation.navigate("Activities", { module });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const completeLearning = (module) => {
    navigation.navigate("Activities", { module });
  };

  const maxEarnedPointArray = Math.max(
    ...modules.map((module) => {
      return module.activities
        ? module.activities.reduce((a, i) => {
            if (i.passed) {
              a += i.point;
            }
            return a;
          }, 0)
        : 0;
    })
  );

  return (
    <View className="w-full">
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
                  modules && modules.length > 0 ? modules[0].course_id : null,
                course_name:
                  modules && modules.length > 0 ? modules[0].course_name : null,
                course_description:
                  modules && modules.length > 0
                    ? modules[0].course_description
                    : null,
              },
            },
            url: "Instances",
          },
          {
            display: "Modules",
            valueToPass: null,
            screen: "Modules",
            current: true,
          },
        ]}
      />
      <ScrollView className="p-6">
        <Text className="text-2xl font-bold mb-4">
          Modules
        </Text>
        <View className="flex flex-col space-y-4">
          {instance &&
            modules &&
            modules.map((module) => {
              const totalRequredPoints = module.required_point;
              const progressPoint =
                module.activities && module.activities.length > 0
                  ? module.activities.reduce((acc, item) => {
                      return (acc += item.point);
                    }, 0)
                  : 0;
              const earnedPoint =
                module.activities && module.activities.length > 0
                  ? module.activities.reduce((acc, item) => {
                      if (item.passed) {
                        acc += item.point;
                      }
                      return acc;
                    }, 0)
                  : 0;
              const completed = (earnedPoint / progressPoint) * 100;
              return (
                <View
                  key={module.module_id}
                  className="mb-4 border-b pb-4 bg-white rounded-lg shadow-md p-6 mb-4 border-b pb-4"
                >
                  <Text className="text-lg font-bold text-gray-900 mb-2">
                    <Text className="font-bold">Module Name:</Text> {module.module_name}
                  </Text>
                  <Text className="text-base text-gray-600">
                    <Text className="font-bold">Module Description:</Text>{" "}
                    {module.module_description}
                  </Text>
                  {!isNaN(completed) ? (
                    <View className="w-full bg-gray-200 rounded-full mt-6 mb-6">
                      <View
                        className="bg-green-600 text-xs leading-none py-1 text-center rounded-full"
                        style={{ width: `${completed}%` }}
                      >
                        <Text>{completed.toFixed(0)}%</Text>
                      </View>
                    </View>
                  ) : null}
                  {module.activities && module.activities.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        completeLearning(module);
                      }}
                      className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
                    >
                      <Text className="text-white text-center">Complete Learning</Text>
                    </TouchableOpacity>
                  ) : totalRequredPoints <= maxEarnedPointArray ? (
                    <TouchableOpacity
                      onPress={() => {
                        registerModules(module);
                      }}
                      className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
                    >
                      <Text className="text-white text-center">Start Learning</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600">
                      <Text className="text-white text-center">
                        You Need {totalRequredPoints} points to unlock this module
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}

export default Modules;
