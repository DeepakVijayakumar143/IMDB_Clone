import React from "react";
import LoginArt from "../assets/LoginArt.png";
import LoginForm from "../components/LoginForm";
import "../css/LoginPage.css";

const LoginPage = ({ users }) => {
  return (
    <div className="login-container">
      <div className="login-modal-section">
        <LoginForm users={users}></LoginForm>
      </div>
      <div className="login-image-section">
        <img src={LoginArt} alt="Login Art Image" className="login-image" />
      </div>
    </div>
  );
};

export default LoginPage;
