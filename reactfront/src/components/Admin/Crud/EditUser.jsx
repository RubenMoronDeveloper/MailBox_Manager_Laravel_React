import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const endpoint = "http://localhost:8000/api/update/";
const endpointVecinoId = "http://localhost:8000/api/show/";

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
const defaultTheme = createTheme();

const EditUser = () => {
  const [name, setName] = useState("");
  const [last_name, setlastName] = useState("");
  const [floor, setFloor] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const updateNeighbor = async (e) => {
    let isAdmin = "";
    e.preventDefault();
    if (document.getElementById("isAdmin").checked) {
      isAdmin = "0";
    } else {
      isAdmin = "1";
    }
    try{

      await axios.put(`${endpoint}${id}`, {
        name: name,
        last_name: last_name,
        email: email,
        floor: floor,
        is_admin: isAdmin,
        image: image,
      });
    }catch(err){
      console.log(err)
    }
    navigate("/admin"); 
  };
  useEffect(() => {
    const getVecinoById = async () => {
      try {
        const response = await axios.get(`${endpointVecinoId}${id}`);
        setName(response.data.name);
        setlastName(response.data.last_name);
        setFloor(response.data.floor);
        setEmail(response.data.email);
        setImage(response.data.image);
      } catch (err) {
        if (err && err instanceof AxiosError) setError(err.response?.data.msg);
        else if (err && err instanceof Error) setError(err.message);
        console.log("Error : ", error);
      }
    };
    getVecinoById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      {error && (
        <div className="btn btn-danger">
          {Object.keys(error).map((key) => (
            <p key={key}>{error[key][0]}</p>
          ))}
        </div>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {error && (
          <div className="btn btn-danger">
            {Object.keys(error).map((key) => (
              <p key={key}>{error[key][0]}</p>
            ))}
          </div>
        )}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={updateNeighbor} noValidate sx={{ mt: 1 }}>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name "
              type="text"
              id="name"
            />
            <TextField
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              value={last_name}
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last name "
              type="text"
              id="lastName"
            />
            <TextField
              onChange={(e) => {
                setFloor(e.target.value);
              }}
              value={floor}
              margin="normal"
              required
              fullWidth
              name="floor"
              label="Floor "
              type="text"
              id="floor"
            />
            <Button
              sx={{ textAlign: "left", alignSelf: "flex-start" }}
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                accept="image/*"
                name="profile_image"
                onChange={handleImageChange}
                hidden
              />
            </Button>
            <FormControlLabel
              sx={{ marginLeft: 5 }}
              control={
                <Checkbox id="isAdmin" value="isAdmin" color="primary" />
              }
              label="Es admin"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default EditUser;
