import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { refreshUser } from "./redux/slices/userSlice/userThunk";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((e) => e.user);

  useEffect(() => {
    if (!user.role) {
      dispatch(refreshUser());
    }
  }, []);

  return (
    <div className="App">
      {user.role === "admin" || user.role === "superadmin" ? (
        <Dashboard user={user} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
