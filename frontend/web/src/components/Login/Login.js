import { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../SocketContext/SocketContext";

function Login() {
  const [getUserName, setUserName] = useState("user1");
  const [getPassword, setUserPassword] = useState("password1");
  const navigat = useNavigate();
  const socket = useSocket();

  const submit = () => {
    login(getUserName, getPassword)
      .then((response) => {
        console.log(response);
        console.log(response.user.isTeacher === 1);
        if (response.user.isTeacher === 1) {
          navigat("/teacher-dashboard/home");
        } else {
          navigat("/user-dashboard/home");
        }
        socket.emit("join_user_room", { room: response.user.user_id });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-column justify-center">
        <img width={200} height={200} src="/login.svg" alt="Your Company" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                value={getUserName}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#/"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={getPassword}
                onChange={(event) => {
                  console.log(event);
                  setUserPassword(event.target.value);
                }}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                submit();
              }}
              type="button"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>

            <button
              onClick={() => {
                submit();
              }}
              type="button"
              className="flex w-full justify-center mt-8 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in With Google
            </button>

            <button
              onClick={() => {
                navigat("/signUp");
              }}
              type="button"
              className="flex w-full justify-center mt-8 rounded-md bg-white-600 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              No Account Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
