import React, {Component, useEffect, useState} from 'react';
import RoomsTable from "../Components/Room/RoomsTable";
import AuthService from "../Services/auth.service";
import {HubConnectionBuilder} from "@microsoft/signalr";
import Button from '@mui/material/Button';
import { withRouter } from '../Common/with-router';
import Create from "../Components/Room/Create";

const API_URL = "https://localhost:7016"





const Rooms = (props) => {

    const [connection, setConnection] = useState()

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(  "https://localhost:7016/hub")
            .withAutomaticReconnect()
            .build();

        setConnection(connect);
    }, []);

    if(connection) {
        return (
            <div>
                <RoomsTable connection={connection}/>
                <Create/>
            </div>


        );
    }
};

export default Rooms;