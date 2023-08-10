import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const endpoint = "http://localhost:8000/api/register";

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

const CreateVecino = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [piso, setPiso] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordRegex = /[^ ]{8,16}/i;

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(false);

  const navigate = useNavigate();

  const store = async (e) => {
    let isAdmin = ''
    try {
      e.preventDefault();
      if(document.getElementById('isAdmin').checked){
        isAdmin = '0'
      }else{
        isAdmin = '1'
      }
      const formData = new FormData();
      formData.append("name", name);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);
      formData.append("piso", piso);
      formData.append("image", image ? image :  'undefined');
      formData.append("is_admin", isAdmin);

      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log({ response });
      navigate("/admin");
    } catch (err) {
      const response = err.response;
      console.log({ response });
      if (response && response.status === 422) setError(response.data.errors);
      else if (err && err instanceof Error) setError(err.message);
      console.log("Error : ", error);
    }
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
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
          <Box component="form" onSubmit={store} noValidate sx={{ mt: 1 }}>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!emailRegex.test(email)) {
                  setEmailError(true);
                } else {
                  setEmailError(false);
                }
              }}
              error={emailError}
              helperText={
                emailError ? "El email debe tener un formato valido" : null
              }
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
                setPassword(e.target.value);
                if (!passwordRegex.test(password)) {
                  setPasswordError(true);
                } else {
                  setPasswordError(false);
                }
              }}
              error={passwordError}
              helperText={
                passwordError
                  ? "La contraseña debe contener al menos 8 caracteres"
                  : null
              }
              value={password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
              error={passwordConfirmationError}
              helperText={
                passwordError
                  ? "La contraseña debe contener al menos 8 caracteres"
                  : null
              }
              value={passwordConfirmation}
              margin="normal"
              required
              fullWidth
              name="passwordConfirmation"
              label="Password confirmation "
              type="password"
              id="passwordConfirmation"
              autoComplete="current-password"
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
                setLastName(e.target.value);
              }}
              value={lastName}
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
                setPiso(e.target.value);
              }}
              value={piso}
              margin="normal"
              required
              fullWidth
              name="piso"
              label="Piso "
              type="text"
              id="piso"
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
            <FormControlLabel sx={{marginLeft: 5}}
              control={
                <Checkbox
                  id="isAdmin"
                  value="isAdmin"
                  color="primary"
                />
              }
              label="Es admin"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default CreateVecino;
