import React from "react";
import Page404 from "../assets/PageNotFound.svg";
import "../css/PageNotFound.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="section">
      <img src={Page404}></img>
      <Link to="/">
        <Button variant="contained" sx={{ margin: "50px" }}>
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default PageNotFound;
