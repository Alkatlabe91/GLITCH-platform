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
    return Promise.reject(error);
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

const getAllDomaines = async () => {
  try {
    const response = await fetch(`${URL}/domains/get_all_domaines`, {
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

const addNewDomain = async (domain_name) => {
  try {
    const response = await fetch(`${URL}/domains/domin_new`, {
      method: "POST",
      body: JSON.stringify({ domain_name }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(new Error("Couldn't add domain"));
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(new Error("Couldn't add domain"));
  }
};

const addNewCourse = async (course_name, description, domain_id) => {
  try {
    const response = await fetch(`${URL}/domains/domin_course_new`, {
      method: "POST",
      body: JSON.stringify({ course_name, description, domain_id }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(new Error("Couldn't add domain"));
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(new Error("Couldn't add domain"));
  }
};

const addNewInstace = async (
  course_id,
  instance_name,
  start_date,
  end_date
) => {
  try {
    const response = await fetch(`${URL}/domains/instance_course_new`, {
      method: "POST",
      body: JSON.stringify({ course_id, instance_name, start_date, end_date }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(new Error("Couldn't add domain"));
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(new Error("Couldn't add domain"));
  }
};

const addNewModule = async (
  instance_id,
  module_name,
  description,
  required_point
) => {
  try {
    const response = await fetch(`${URL}/domains/modules_new`, {
      method: "POST",
      body: JSON.stringify({
        instance_id,
        module_name,
        description,
        required_point,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(new Error("Couldn't add domain"));
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(new Error("Couldn't add domain"));
  }
};

const addNewActivity = async (
  module_id,
  activity_name,
  description,
  level,
  point,
  type
) => {
  try {
    const response = await fetch(`${URL}/domains/activity_new`, {
      method: "POST",
      body: JSON.stringify({
        module_id,
        activity_name,
        description,
        level,
        point,
        type,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return Promise.reject(new Error("Couldn't add domain"));
    }
    const data = await response.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(new Error("Couldn't add domain"));
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
// @domains_bp.route('/domains/analytics', methods=['GET'])
// def analytics():
//     results = DomainTable().get_analytics_data()
//     return jsonify(results), 200
const analytics = async () => {
  try {
    const response = await fetch(`${URL}/domains/analytics`, {
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
  getAllUserProgress,
  getAllDomaines,
  addNewActivity,
  addNewCourse,
  addNewDomain,
  addNewInstace,
  addNewModule,
  analytics,
};
