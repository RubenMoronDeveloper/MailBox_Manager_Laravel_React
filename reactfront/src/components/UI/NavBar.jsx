import React, { useState } from "react";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import default_profile_image from "./../../img/default_profile_image.png";
const NavBar = () => {
  const signOut = useSignOut();
  const auth = useAuthUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const showError = () => {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Only administrators can access the administration area!",
    });
  };

  const isAdminHandler = () => {
    if (auth() !== null && auth().is_admin === "0") {
      navigate("/admin");
    } else {
      showError();
    }
  }
  const signOutHandler = () => {
    signOut();
    localStorage.removeItem("ACCESS_TOKEN");
  }
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-2">
        <Link className="navbar-brand" to="/">
          MailboxManager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Togglenavigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <span
                style={{ cursor: "pointer" }}
                className="nav-link pe-auto"
                onClick={isAdminHandler}
              >
                {" "}
                Admin{" "}
              </span>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                {" "}
                Sign In{" "}
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/register" className="nav-link">
                {" "}
                Register{" "}
              </Link>
            </li> */}
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={signOutHandler}>
                {" "}
                Sign Out{" "}
              </Link>
            </li>
          </ul>
        </div>
        {auth() != null && (
          <>
            <img
              width="300"
              height="300"
              className="card__thumb"
              src={
                auth().image !== "undefined"
                  ? "http://localhost:8000/storage/" + auth().image
                  : default_profile_image
              }
              alt=""
            />
          </>
        )}
      </nav>
      {error && <div className="btn btn-danger mt-2">{error}</div>}
    </div>
  );
};

export default NavBar;
