import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
const endpoint = "http://localhost:8000/api";

const AdminVecinos = () => {
  const [neighbors, setNeighbors] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  useEffect(() => {
    isAdminHandler();
    getAllNeighbors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAllNeighbors = async () => {
    const response = await axios.get(`${endpoint}/index`);
    setNeighbors(response.data);
  };
  const isAdminHandler = async (e) => {
    const auth = { headers: { Authorization: authHeader() } };
    const response = await axios.get(`${endpoint}/user-profile/`, auth);
    if (response.data.data.is_admin.toString() !== "0") {
      alert(
        "Debes de autenticarte como administrador para poder acceder a la administracion de usuarios"
      );
      navigate("/");
    }
  };
  const deleteNeighborHandler = async (id) => {
    try {
      await axios.delete(`${endpoint}/destroy/${id}`);
      getAllNeighbors();
    } catch (err) {
      if (err && err instanceof AxiosError) setError(err.response?.data.msg);
      else if (err && err instanceof Error) setError(err.message);
      console.log("Error : ", error);
    }
  };
  const swalModalConfirmDeletingHandler = (id) => {
    Swal.fire({
      title: "Are you sure about it?",
      text: "You cannot redo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm sure",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNeighborHandler(id);
        Swal.fire(
          "Deleted!",
          "This record has been deleted from the database.",
          "success"
        );
      }
    });
  };
  return (
    <div>
      <div className="d-grid gap-2">
        <Link to="/create" className="btn btn-success bt-lg  mb-2">
          <i className="fa-solid fa-square-plus fa-3x"></i>
        </Link>
      </div>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "70%",
          margin: "0 auto",
          marginBottom: "2em",
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
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Last name</th>
            <th>Floor</th>
            <th>Mail</th>
            <th>Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {neighbors
            .filter((vecino) => vecino.name.toLowerCase().includes(query))
            .map((vecino) => (
              <tr key={vecino.id}>
                <td>{vecino.id}</td>
                <td>{vecino.name}</td>
                <td>{vecino.last_name}</td>
                <td>{vecino.floor}</td>
                <td>{vecino.email}</td>
                <td>
                  <Link
                    to={`/edit/${vecino.id}`}
                    className="btn btn-primary mr-2"
                  >
                    <i className="fa-solid fa-user-pen"></i>
                  </Link>

                  <button
                    onClick={() => swalModalConfirmDeletingHandler(vecino.id)}
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminVecinos;
