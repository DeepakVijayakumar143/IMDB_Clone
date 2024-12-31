import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Divider, TextField } from "@mui/material";
import "../css/LoginForm.css";
import { encryptData } from "../modules/encryptionService";
import Cookies from "js-cookie";
const LoginForm = ({ users }) => {
  const [userid, setUserid] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e, username, password) => {
    e.preventDefault();

    // Check if the user exists
    const user = users.find((u) => u.username === userid);
    if (!user) {
      setErrorMessage("Username not found.");
      return;
    }

    // Validate password
    if (user.password !== userPassword) {
      setErrorMessage("Incorrect password.");
      return;
    }

    // Encrypt session data
    const userData = { username, sessionToken: "exampleToken" }; // Replace with real token
    const encryptedToken = encryptData(userData);

    // Set cookie
    Cookies.set("authToken", encryptedToken, {
      domain: "imdb-clone-ruddy-pi.vercel.app/",
      secure: true, // Ensure cookies are secure
      expires: 1 / 144, // 10 minutes
    });

    // Verify and navigate
    if (Cookies.get("authToken")) {
      setErrorMessage("");
      navigate("/movies");
    } else {
      setErrorMessage("Login failed. Please try again");
    }
  };
  return (
    <div className="loginForm-container">
      <h1>Welcome Back👋</h1>
      <p>Today is a new day. It's your day. You shape it. Sign in to start.</p>
      <form className="form" onSubmit={() => handleLogin(event)}>
        <label htmlFor="username" className="label">
          Email
        </label>
        <TextField
          id="username"
          label="example@email.com"
          variant="outlined"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          sx={{ marginBottom: "10px" }}
        ></TextField>
        <label htmlFor="password" className="label">
          Password
        </label>
        <TextField
          id="password"
          label="Enter your password"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          sx={{ marginBottom: "10px" }}
        ></TextField>
        <Link href="#" className="link">
          Forgot Password?
        </Link>
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#2046cf", marginBottom: "10px" }}
        >
          Sign in
        </Button>
      </form>
      <Divider>Or</Divider>
      <p>
        Don't have a account?
        <Link to="/signup" className="link sign">
          Sign up
        </Link>
      </p>
      <p className="copyright">© 2023 ALL RIGHTS RESERVED</p>
    </div>
  );
};

export default LoginForm;
