const { URL } = require("../constent");

const getAllDomines = async () => {
  try {
    const response = await fetch(`${URL}/domains/get_all`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const registerToCourse = async (module_id) => {
  try {
    const response = await fetch(`${URL}/domains/register_user_course`, {
      method: "POST",
      body: JSON.stringify({ module_id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error during request:", error);
    throw error;
  }
};

const getUserProgress = async (module_id) => {
  try {
    const response = await fetch(
      `${URL}/domains/module_progress/${module_id}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAllUserProgress = async (module_ids) => {
  try {
    const progressPromises = module_ids.map((id) => getUserProgress(id));
    const results = await Promise.all(progressPromises);
    return Promise.resolve(results);
  } catch (error) {
    return Promise.reject(error)
  }
};

const submitModuleActivity = async (user_progress_module_id) => {
  try {
    const response = await fetch(
      `${URL}/domains/submit_user_progress_module/${user_progress_module_id}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getRequestedTasksToReview = async () => {
  try {
    const response = await fetch(`${URL}/domains/get_requested_tasks`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
const markUserProgressModuleAsFailed = async (user_progress_module_id) => {
  try {
    const response = await fetch(
      `${URL}/domains/mark_user_progress_module_as_failed/${user_progress_module_id}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const markUserProgressModuleAsPassed = async (user_progress_module_id) => {
  try {
    const response = await fetch(
      `${URL}/domains/mark_user_progress_module_as_passed/${user_progress_module_id}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getRegisteredModules = async () => {
  try {
    const response = await fetch(`${URL}/domains/get_registered_modules`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getModulesByInstanceId = async (instance_id) => {
  try {
    const response = await fetch(
      `${URL}/domains/get_modules_by_instance_id/${instance_id}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getInstancesByCourseId = async (course_id) => {
  try {
    const response = await fetch(
      `${URL}/domains/get_instances_by_course_id/${course_id}`,
      {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return Promise.resolve(responseJson);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const createPost = async (user_progress_module_id, content) => {
  try {
    const response = await fetch(`${URL}/domains/create_user_progress_post`, {
      method: "POST",
      body: JSON.stringify({ user_progress_module_id, content }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error during request:", error);
    throw error;
  }
};

const createPostComment = async (user_post_id, comment) => {
  try {
    const response = await fetch(`${URL}/domains/create_userpostcomments`, {
      method: "POST",
      body: JSON.stringify({ user_post_id, comment }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Response:", data);
   return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(new Error("Error during request:", error));
  }
};

const community = async () => {
  try {
    const response = await fetch(`${URL}/domains/community`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Response:", data);
    return data;
  } catch (error) {
    console.error("Error during request:", error);
    throw error;
  }
};

module.exports = {
  getAllDomines,
  registerToCourse,
  getUserProgress,
  submitModuleActivity,
  getRequestedTasksToReview,
  markUserProgressModuleAsFailed,
  markUserProgressModuleAsPassed,
  getRegisteredModules,
  getModulesByInstanceId,
  getInstancesByCourseId,
  createPost,
  createPostComment,
  community,
  getAllUserProgress
};
