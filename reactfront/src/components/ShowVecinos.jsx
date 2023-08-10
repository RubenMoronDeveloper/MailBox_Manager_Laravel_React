import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import Swal from "sweetalert2";
import "./ShowVecinos.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import default_profile_image from "./../img/default_profile_image.png";

//ENDPOINT
const endpoint = "http://localhost:8000/api";
const ShowVecinos = () => {
  const navigate = useNavigate();
  const [vecinos, setVecinos] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const authHeader = useAuthHeader();

  useEffect(() => {
    const getAllVecinos = async () => {
      const response = await axios.get(`${endpoint}/index`);
      setVecinos(response.data);
      console.log(response);
    };
    getAllVecinos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showError = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "¡Parece que no tienes permisos para entrar a este buzon! ",
    });
  };

  const accederBuzon = async (e) => {
    const auth = { headers: { Authorization: authHeader() } };

    try {
      const response = await axios.get(`${endpoint}/user-profile/`, auth);
      response.data.data.id !== e
        ? showError()
        : navigate(`/VecinoCartas/${e}`);
    } catch (err) {
      showError();
      setError("Debes iniciar sesion para poder acceder al buzon");
    }
  };
  return (
    <div className="alinear">
      <div class="hero">
        <div class="hero-text">
          <h1>COMUNIDAD VIVIENDAS</h1>
          <h3>EL RUEDO</h3>
          <Link to={`/login`}>
            <i className="text-white">Iniciar sesion</i>
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
          label="Buscar por nombre"
          variant="standard"
          onChange={(e) => setQuery(e.target.value)}
        />
      </Box>
      <ul className="cards">
        {vecinos
          .filter((vecino) => vecino.name.toLowerCase().includes(query))
          .map((vecino) => (
            <div
              key={vecino.id}
              className="card text-center bg-dark animate__animated animate__fadeInUp"
            >
              <div className="card">
                <img
                  src={
                    vecino.image != "undefined"
                      ? "http://localhost:8000/storage/" + vecino.image
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
                        vecino.image != "undefined"
                          ? "http://localhost:8000/storage/" + vecino.image
                          : default_profile_image
                      }
                      alt=""
                    />
                    <div className="card__header-text">
                      <h3 className="card__title">{vecino.name}</h3>
                      <span className="card__status">Piso {vecino.piso}</span>
                      <Link to={`/createCarta/${vecino.id}`}>
                        <i className="fa-regular fa-envelope fa-2x card__mailbox"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="containerButt">
                    <span
                      value={vecino.id}
                      onClick={() => accederBuzon(vecino.id)}
                      className="button"
                    >
                      <div className="button__line"></div>
                      <div className="button__line"></div>
                      <span className="button__text">ENTRAR</span>
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
