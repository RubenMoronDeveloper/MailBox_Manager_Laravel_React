import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/UI/NavBar";
import Footer from "./components/UI/Footer";
//Components
import AdminIndex from "./components/Admin/Index/AdminIndex";
import CreateUser from "./components/Admin/Crud/CreateUser";
import EditUser from "./components/Admin/Crud/EditUser";
import Home from "./components/Home/Home";
import ShowUserMails from "./components/Mails/ShowUserMails";
import CreateMail from "./components/Mails/CreateMail";
import Login from "./components/Login/Login";
import { RequireAuth } from "react-auth-kit";
import axios from "axios";
import { useEffect } from "react";

function App() {
  return (
    <div className="App">
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/*" element={<Home />}></Route>
          <Route
            path="/admin"
            element={
              <RequireAuth loginPath="/login">
                <AdminIndex />
              </RequireAuth>
            }
          ></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/edit/:id" element={<EditUser />}></Route>

          <Route path="/vecinoCartas/:id" element={<ShowUserMails />}></Route>
          <Route path="/vecinoCartas/:id" element={<checkAuth />}></Route>
          {/* CARTAS */}
          <Route path="/createCarta/:id" element={<CreateMail />}></Route>
          {/* Login /register */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<CreateUser />}></Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
