import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
//Components
import AdminVecinos from "./components/AdminVecinos";
import CreateVecino from "./components/CreateVecino";
import EditVecino from "./components/EditVecino";
import ShowVecinos from "./components/ShowVecinos";
import UserMails from "./components/UserMails";
import CreateCarta from "./components/CreateCarta";
import LoginVecino from "./components/LoginVecino";
import { RequireAuth } from "react-auth-kit";
import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route path="/" element={<ShowVecinos />}></Route>
          <Route path="/*" element={<ShowVecinos />}></Route>
          <Route
            path="/admin"
            element={
              <RequireAuth loginPath="/login">
                <AdminVecinos />
              </RequireAuth>
            }
          ></Route>
          <Route path="/create" element={<CreateVecino />}></Route>
          <Route path="/edit/:id" element={<EditVecino />}></Route>

          <Route path="/vecinoCartas/:id" element={<UserMails />}></Route>
          <Route path="/vecinoCartas/:id" element={<checkAuth />}></Route>
          {/* CARTAS */}
          <Route path="/createCarta/:id" element={<CreateCarta />}></Route>
          {/* Login /register */}
          <Route path="/login" element={<LoginVecino />}></Route>
          <Route path="/register" element={<CreateVecino />}></Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
