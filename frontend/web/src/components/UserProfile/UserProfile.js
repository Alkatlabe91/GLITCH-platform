import { useState, useEffect } from "react";
import {
  myProfile,
  updateProfile,
  uploadProfilePicture,
} from "../../services/auth";
import { URL } from "../../constent";
import { ToastContainer, toast } from "react-toastify";

function UserProfile() {
  const [profile, setProfile] = useState({});

  // eslint-disable-next-line no-unused-vars
  const [profilePic, setProfilePic] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    getUserProfile();
  }, []);
  const getUserProfile = () => {
    myProfile()
      .then((profile) => {
        setProfile(profile);
      })
      .catch((error) => {});
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      uploadProfilePicture(formData)
        .then((response) => {
          toast("Profile updated successfully");
        })
        .catch((error) => {});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(profile)
      .then(() => {
        getUserProfile();
        toast("Profile updated successfully");
      })
      .catch((error) => {});
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                src={
                  profile.profile_picture ?  `${URL}/users/load-picture/${profile.profile_picture}`:
                  "/default-profile-pic.jpg"
                }
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email 
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={profile.last_name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
