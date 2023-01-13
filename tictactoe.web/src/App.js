import Game from "./Pages/Game";
import RenderRoomsList from "./Pages/Rooms";
import Rooms from "./Pages/Rooms";
import BasicTable from "./Pages/Rooms";

import { Routes, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import AuthService from "../src/Services/auth.service";

function App() {
    if (AuthService.getCurrentUser()){
        return (
            <Routes>
                <Route index path="/" element={<Rooms />} />
                <Route path="*" element={<Rooms />} />
                <Route path="/game" element={<Game />} />
                <Route path="/rooms" element={<Rooms />} />
            </Routes>
        )
    }else{
        return (
            <Routes>
                <Route index path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        )
    }
}

export default App;
