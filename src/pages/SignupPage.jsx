import React from "react";
import LoginArt from "../assets/LoginArt.png";
import SignupForm from "../components/SignupForm";
import "../css/SignupPage.css";

const SignupPage = ({ users, setUsers }) => {
  return (
    <div className="signup-container">
      <div className="signup-modal-section">
        <SignupForm users={users} setUsers={setUsers}></SignupForm>
      </div>
      <div className="signup-image-section">
        <img src={LoginArt} alt="Login Art Image" className="signup-image" />
      </div>
    </div>
  );
};

export default SignupPage;
