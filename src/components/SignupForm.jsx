import React, { useState } from "react";
import { Button, Divider, TextField } from "@mui/material";
import "../css/SignupForm.css";
import { useNavigate, Link } from "react-router-dom";

const SignupForm = ({ users, setUsers }) => {
  const [userid, setUserid] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To display error message
  const navigate = useNavigate();
  const handleSignin = (e) => {
    e.preventDefault();

    // Validate password length
    if (userPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    // Validate password and confirm password match
    if (userPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Check if username already exists
    console.log(users);
    const existingUser = users.find((user) => user.username === userid);
    if (existingUser) {
      setErrorMessage("Username already exists.");
      return;
    }
    const test = [...users, { username: userid, password: userPassword }];
    console.log(test);
    setUsers([...users, { username: userid, password: userPassword }]);

    // Redirect to the signin page after successful signup
    navigate("/signin");
  };
  return (
    <div className="signupForm-container">
      <h1>Welcome to IMDB👋</h1>
      <p>Today is a new day. It's your day. You shape it. Sign up to start.</p>
      <form className="form" onSubmit={handleSignin}>
        <label htmlFor="username">Email</label>
        <TextField
          id="username"
          label="example@email.com"
          variant="outlined"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
          sx={{ marginBottom: "10px" }}
        ></TextField>
        <label htmlFor="password">Password</label>
        <TextField
          id="password"
          label="Atleast 8 characters"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          sx={{ marginBottom: "10px" }}
        ></TextField>
        <label htmlFor="confirm-password">Confirm Password</label>
        <TextField
          id="confirm-password"
          label="Atlest 8 characters"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ marginBottom: "10px" }}
        ></TextField>
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
        Existing user?
        <Link to="/signin" className="link sign">
          Sign in
        </Link>
      </p>
      <p className="copyright">© 2023 ALL RIGHTS RESERVED</p>
    </div>
  );
};

export default SignupForm;
