import React, {useEffect, useState} from 'react';
import RoomsTable from "../Components/Room/RoomsTable";
import AuthService from "../Services/auth.service";
import {HubConnectionBuilder} from "@microsoft/signalr";

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
            <RoomsTable connection={connection}/>
        );
    }
};

export default Rooms;