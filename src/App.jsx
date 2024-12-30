import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [users, setUsers] = useState([
    { username: "user1", password: "password" },
    { username: "user2", password: "password" },
  ]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/signin"
          element={<LoginPage users={users}></LoginPage>}
        ></Route>
        <Route
          path="/signup"
          element={<SignupPage users={users} setUsers={setUsers} />}
        ></Route>
        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
