import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Loader from "./Loader";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Loader />;
  }
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />; //if logged in show contents otherwise redirect to sign in page
}
