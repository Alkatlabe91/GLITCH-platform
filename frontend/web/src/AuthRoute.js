import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { isAuthenticated } from "./services/auth"; // Adjust path as per your file structure
import { Navigate } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("called");
      try {
        const authStatus = await isAuthenticated();
        console.log({ authStatus });
        setAuthenticated(authStatus);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Component /> : <Navigate to="/login" />;
};

export default AuthRoute;
