import Game from "./Pages/Game";
import RenderRoomsList from "./Pages/Rooms";
import Rooms from "./Pages/Rooms";
import BasicTable from "./Pages/Rooms";

import {Routes, Route, Link, Navigate} from "react-router-dom";
import React, {Component, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import AuthService from "../src/Services/auth.service";
import {HubConnectionBuilder} from "@microsoft/signalr";
import RoomCreate from "./Pages/RoomCreate";

function App() {
    const [connection, setConnection] = useState()

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(  "https://localhost:7016/hub")
            .withAutomaticReconnect()
            .build();

        setConnection(connect);
    }, []);

    if (AuthService.getCurrentUser()){
        return (
            <Routes>
                <Route index path="/" element={<Rooms connection={connection}/>} />
                <Route path="*" element={<Rooms connection={connection}/>} />
                <Route path="/game/:id/:host" element={<Game connection={connection}/>} />
                <Route path="/rooms" element={<Rooms connection={connection}/>} />
                <Route path="/roomCreate" element={<RoomCreate connection={connection}/>} />
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
