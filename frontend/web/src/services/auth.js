const { URL } = require("../constent");

const login = async (user_name = "", password = "") => {
  const response = await fetch(`${URL}/users/login`, {
    method: "POST",
    body: JSON.stringify({ user_name, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.status === 200) {
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } else {
    return Promise.reject(Error("Could not login"));
  }
};
const logout = async () => {
  const response = await fetch(`${URL}/users/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.status === 200) {
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } else {
    return Promise.reject(Error("Could not login"));
  }
};

const myProfile = async () => {
  const response = await fetch(`${URL}/users/my_profile`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.status === 200) {
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } else {
    return Promise.reject(Error("Could not login"));
  }
};

const uploadProfilePicture = async (formData) => {
  fetch(`${URL}/users/my_profile_pic`, {
    method: "POST",
    body: formData,
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(Error("Could not upload profile picture"));
      }
      return Promise.resolve();
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      return Promise.reject(Error("Could not upload profile picture"));
    });
};

const updateProfile = async (profile) => {
  const response = await fetch(`${URL}/users/update_profile`, {
    method: "PUT",
    body: JSON.stringify(profile),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (response.status === 200) {
    const responseJson = await response.json();
    return Promise.resolve(responseJson);
  } else {
    return Promise.reject(Error("Could not login"));
  }
};

module.exports = { login, myProfile, uploadProfilePicture, updateProfile, logout };
