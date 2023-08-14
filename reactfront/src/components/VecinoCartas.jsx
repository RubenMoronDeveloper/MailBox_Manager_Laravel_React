import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthHeader } from "react-auth-kit";
import { Box } from "@mui/material";
import Swal from "sweetalert2";

const endpoint = "http://localhost:8000/api";

const VecinoCartas = () => {
  const [nombre, setNombre] = useState("");
  const [lastName, setLastName] = useState("");
  const [floor, setFloor] = useState("");
  const [mails, setMails] = useState([]);
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
    const response = await axios.get(`${endpoint}/show/${id}`);
    setNombre(response.data.name);
    setLastName(response.data.last_name);
    setFloor(response.data.floor);
    setImage(response.data.image);
  };
  const getCartasById = async () => {
    const response = await axios
      .get(`${endpoint}/cartaList/${id}`)
      .catch((error) => {
        console.error(error);
        console.log({ response });
      });
    setMails(response.data.cartas);
  };
  const deleteCarta = async (id) => {
    await axios.delete(`${endpoint}/carta/${id}`);
    getCartasById();
  };
  const verCarta = async (carta) => {
    setMailContent(carta.content);
    getCartasById();
  };
  const confirmDeleting = (id) => {
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
        deleteCarta(id);
        Swal.fire(
          "Deleted!",
          "This record has been deleted from the database.",
          "success"
        );
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
        <div className="hero-text">
          <h1>{nombre}</h1>
          <p>Last name : {lastName}</p>
          <p>Floor : {floor}</p>
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
                  <th>Mail_sender</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
            <Box sx={{ maxHeight: "500px", overflowY: "scroll" }}>
              <table className="table">
                <tbody>
                  {mails.map((mail) => (
                    <tr key={mail.id}>
                      <td>{mail.mail_sender}</td>
                      <td>
                        <button
                          onClick={() => verCarta(mail)}
                          className="btn border-t-cyan-600"
                        >
                          <i className="fa-solid  fa-eye"></i>
                        </button>
                        <button
                          onClick={() => confirmDeleting(mail.id)}
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
            <Box
              sx={{
                overflowY: "scroll",
              }}
            >
              <p style={{ padding: 20 }}>{mailContent}</p>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default VecinoCartas;
