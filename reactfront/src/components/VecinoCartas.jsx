import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { Box } from "@mui/material";
import Swal from "sweetalert2";

const endpoint = "http://localhost:8000/api/show/";
const endpointCartas = "http://localhost:8000/api/cartaList/";
const endpointCartaDelete = "http://localhost:8000/api/carta/";

const VecinoCartas = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [piso, setPiso] = useState("");
  const [cartas, setCartas] = useState([]);
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [mailContent, setMailContent] = useState("");
  const authHeader = useAuthHeader();
  
  useEffect(() => {
    getCartasById();
    getVecinoById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVecinoById = async () => {
    const response = await axios.get(`${endpoint}${id}`);
    console.log(response.data);
    setNombre(response.data.name);
    setApellido(response.data.last_name);
    setPiso(response.data.piso);
    setImage(response.data.image);
  };
  const getCartasById = async () => {
    const response = await axios.get(`${endpointCartas}${id}`);
    setCartas(response.data.cartas);
  };
  const deleteCarta = async (id) => {
    await axios.delete(`${endpointCartaDelete}${id}`);
    getCartasById();
  };
  const verCarta = async (carta) => {
    setMailContent(carta.contenido);
    getCartasById();
  };
  const confirmDeleting = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podras rehacer esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro ",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCarta(id);
        Swal.fire("¡Eliminado!", "Este registro ha sido eliminado de la base de datos.", "success");
      }
    });
  };
  return (
    <div className="">
      <Box
        sx={{
          height: "400px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://localhost:8000/storage/${image})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
          backgroundAttachment: "fixed",
        }}
      >
        <div class="hero-text">
          <h1>{nombre}</h1>
          <p>Apellido : {apellido}</p>
          <p>piso : {piso}</p>
        </div>
      </Box>
      <Box sx={{ display: "flex", margin: 2 }}>
        <Box sx={{ height: "auto", width: "35%", backgroundColor: "" }}>
          <Box
            sx={{
              padding: 2,
              margin: 2,
              borderRadius: 5,
              boxShadow: "  rgba(0, 0, 0, 0.35) 0px 5px 15px;",
              minHeight: "300px",
            }}
          >
            <table className="table">
              <thead className="">
                <tr>
                  <th>Remitente</th>
                  <th>Acciones</th>
                </tr>
              </thead>
            </table>
            <Box sx={{ maxHeight: "500px", overflowY: "scroll" }}>
              <table className="table">
                <tbody>
                  {cartas.map((carta) => (
                    <tr key={carta.id}>
                      <td>{carta.remitente}</td>
                      <td>
                        <button
                          onClick={() => verCarta(carta)}
                          className="btn border-t-cyan-600"
                        >
                          <i className="fa-solid  fa-eye"></i>
                        </button>
                        <button
                          onClick={() => confirmDeleting(carta.id)}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: "auto", width: "65%", backgroundColor: "" }}>
          <Box
            sx={{
              padding: 2,
              margin: 2,
              borderRadius: 5,
              boxShadow: "  rgba(0, 0, 0, 0.35) 0px 5px 15px;",
              minHeight: "300px",
            }}
          >
            <h4>Email</h4>
            <Box sx={{
              overflowY: 'scroll', 
             
            }}>

            <p  style={{ padding: 20 }}>{mailContent}</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default VecinoCartas;
