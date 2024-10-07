import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import {
  myProfile,
  updateProfile,
  uploadProfilePicture,
} from "../../services/auth";
import { URL } from "../../constent";

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = () => {
    myProfile()
      .then((profile) => {
        setProfile(profile);
      })
      .catch((error) => {
        // handle error
      });
  };

  const handleInputChange = (name, value) => {
    setProfile({ ...profile, [name]: value });
  };

  const handleProfilePicChange = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!pickerResult.cancelled) {
      setProfilePicFile(pickerResult.uri);
      setProfilePic(pickerResult.base64);
      const formData = new FormData();
      formData.append("file", {
        uri: pickerResult.uri,
        type: "image/jpeg",
        name: "profile.jpg",
      });
      uploadProfilePicture(formData)
        .then((response) => {
          Toast.show({
            position: "left",
            type: "success",
            text1: "Profile updated successfully",
          });
        })
        .catch((error) => {
          // handle error
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profile);
    updateProfile(profile)
      .then(() => {
        console.log("updated");
        getUserProfile();
        Toast.show({
          type: "success",
          text1: "Profile updated successfully",
        });
      })
      .catch((error) => {
        // handle error
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <ScrollView>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.form}>
            <View style={styles.profilePicContainer}>
              <Image
                source={require('../../assets/default-profile-pic.jpg')}
                 
                style={styles.profilePic}
              />
              <Button title="Change Picture" onPress={handleProfilePicChange} />
            </View>
            <Toast />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={profile.username}
                onChangeText={(text) => handleInputChange("username", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={profile.first_name}
                onChangeText={(text) => handleInputChange("first_name", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={profile.last_name}
                onChangeText={(text) => handleInputChange("last_name", text)}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 2,
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UserProfile;
