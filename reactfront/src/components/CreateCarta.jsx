import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TextareaAutosize } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import SendIcon from '@mui/icons-material/Send';
import { useAuthUser } from "react-auth-kit";

const endpoint = "http://localhost:8000/api/show/";
const endpointCarta = "http://localhost:8000/api/carta/";



function Copyright(props) {
  return (
    <Typography
    variant="body2"
    color="text.secondary"
    align="center"
    {...props}
    >
      {"Copyright © "}
      <Link to="/" color="inherit">
        MBM
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const CreateCarta = () => {
  const [remitente, setRemitente] = useState("");
  const [contenido, setContenido] = useState("");
  const [nombreVecino, setNombreVecino] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuthUser();
  const store = async (e) => {
    e.preventDefault();
    
    await axios.post(endpointCarta, {
      mail_sender: remitente,
      content: contenido,
      id_floor: id,
    });
    navigate("/");
  };

  useEffect(() => {
    const getVecinoById = async () => {
      const response = await axios.get(`${endpoint}${id}`);
      setNombreVecino(response.data.name);
    };
    getVecinoById();
    setRemitente(auth() && auth().name ? auth().name : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <SendIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Send mail to {nombreVecino}
        </Typography>
        <Box component="form" onSubmit={store} noValidate sx={{ mt: 1 }}>
          <TextField
            value={remitente}
            onChange={(e) => setRemitente(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Remitente"
            name="remitente"
            autoComplete="remitente"
            autoFocus
          />
          <TextField
            placeholder="Escribe aqui el mensaje"
            multiline
            rows={8}
            maxRows={8}
            onChange={(e) => setContenido(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default CreateCarta;
