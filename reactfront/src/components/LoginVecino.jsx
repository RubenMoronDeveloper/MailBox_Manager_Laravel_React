import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";

const endpoint = "http://localhost:8000/api/login";

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

const LoginVecino = () => {
  const signIn = useSignIn();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const passwordRegex = /[^ ]{8,16}/i;

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(endpoint, {
        email: email,
        password: password,
      });
      signIn({
        token: response.data.access_token,
        expiresIn: 12000,
        tokenType: "Bearer",
        authState: response.data.user,
      });
      navigate("/");
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setError(response.data.errors);
        console.log("error" + error);
      } else if (err && err instanceof Error) setError(err.message);
      console.log("Error : ", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginVecino;
