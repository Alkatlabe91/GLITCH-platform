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

const signUp = async (
  first_name = "",
  last_name = "",
  email = "",
  user_name = "",
  password = ""
) => {
  const response = await fetch(`${URL}/users/signup`, {
    method: "POST",
    body: JSON.stringify({ first_name, last_name, email, user_name, password }),
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

 const isAuthenticated = async () => {
  try {
    const response = await fetch(`${URL}/users/check-auth`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const json =await response.json();
      console.log({json})
      return Promise.resolve(json.auth);
    } else {
      throw Promise.resolve(false);
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    Promise.resolve(false);
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

const getAllUsers = async () => {
  const response = await fetch(`${URL}/users/get_all_users`, {
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

module.exports = {
  login,
  myProfile,
  uploadProfilePicture,
  updateProfile,
  logout,
  signUp,
  getAllUsers,
  isAuthenticated,
};
