import { useState, useEffect, useRef } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
function Login() {
  const [getUserName, setUserName] = useState("user1");
  const [getPassword, setUserPassword] = useState("password1");
  const [passwordValid, setUserPasswordValid] = useState(true);
  const navigat = useNavigate();
  const passwordRef = useRef(null);

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
      })
      .catch((err) => {
        console.error(err);
      });
  };
 
  useEffect(() => {
    if (getPassword.length < 6 && getPassword != "") {
      setUserPasswordValid(false);
    } else {
      setUserPasswordValid(true);
    }
  }, [getPassword]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
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
                  href="#"
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
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
