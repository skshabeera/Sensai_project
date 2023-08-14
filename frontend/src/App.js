import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./Component/UserLogin";
import Dashboard from "./Component/Dashboard";
import UserRegister from "./Component/UserRegister";
import AdminLogin from "./Component/Adminlogin";
import AdminDashboard from "./Component/AdminDashboard";
import EditProfile from "./Component/EditProfile";
import AdminGenerateLink from "./Component/AdminLinkGenerate";
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRegister />}></Route>
        <Route path="/login" element={<UserLogin setToken={setToken} />} />
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        <Route path="/editprofile/:userId" element={<EditProfile />}></Route>
        <Route path="/generatelink" element={<AdminGenerateLink />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
