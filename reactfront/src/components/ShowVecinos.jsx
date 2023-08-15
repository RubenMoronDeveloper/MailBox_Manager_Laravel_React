import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import Swal from "sweetalert2";
import "./ShowVecinos.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import default_profile_image from "./../img/default_profile_image.png";

//ENDPOINT
const endpoint = "http://localhost:8000/api";
const ShowVecinos = () => {
  const navigate = useNavigate();
  const [neighbors, setNeighbors] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const authHeader = useAuthHeader();

  useEffect(() => {
    const getAllNeighbors = async () => {
      const response = await axios.get(`${endpoint}/index`);
      setNeighbors(response.data);
    };
    getAllNeighbors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fireSwalError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You don't seem to have permissions to enter this mailbox! ",
    });
  };

  const accessMailboxHandler = async (e) => {
    const auth = { headers: { Authorization: authHeader() } };

    try {
      const response = await axios.get(`${endpoint}/user-profile/`, auth);
      response.data.data.id !== e
        ? fireSwalError()
        : navigate(`/VecinoCartas/${e}`);
    } catch (err) {
      fireSwalError();
      setError("You must be logged in to access the mailbox.");
    }
  };
  return (
    <div className="alinear">
      <div class="hero">
        <div class="hero-text">
          <h1>HOUSING COMMUNITY</h1>
          <h3>EL RUEDO</h3>
          <Link to={`/login`}>
            <i className="text-white">Log in</i>
          </Link>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "70%",
          margin: "0 auto",
          marginTop: "1em",
        }}
      >
        <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          fullWidth
          id="input-with-sx"
          label="Search by name"
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
      <ul className="cards">
        {neighbors
          .filter((neighbor) => neighbor.name.toLowerCase().includes(query))
          .map((neighbor) => (
            <div
              key={neighbor.id}
              className="card text-center bg-dark animate__animated animate__fadeInUp"
            >
              <div className="card">
                <img
                  src={
                    neighbor.image !== "undefined"
                      ? "http://localhost:8000/storage/" + neighbor.image
                      : default_profile_image
                  }
                  className="card__image"
                  alt=""
                />
                <div className="card__overlay">
                  <div className="card__header">
                    <svg className="card__arc" xmlns="">
                      <path />
                    </svg>
                    <img
                      className="card__thumb"
                      src={
                        neighbor.image !== "undefined"
                          ? "http://localhost:8000/storage/" + neighbor.image
                          : default_profile_image
                      }
                      alt=""
                    />
                    <div className="card__header-text">
                      <h3 className="card__title">{neighbor.name}</h3>
                      <span className="card__status">Floor {neighbor.floor}</span>
                      <Link to={`/createCarta/${neighbor.id}`}>
                        <i className="fa-regular fa-envelope fa-2x card__mailbox"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="containerButt">
                    <span
                      value={neighbor.id}
                      onClick={() => accessMailboxHandler(neighbor.id)}
                      className="button"
                    >
                      <div className="button__line"></div>
                      <div className="button__line"></div>
                      <span className="button__text">ENTER</span>
                      <div className="button__drow1"></div>
                      <div className="button__drow2"></div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default ShowVecinos;
