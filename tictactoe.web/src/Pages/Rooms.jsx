import React, {useEffect, useState} from 'react';
import RoomsTable from "../Components/Room/RoomsTable";
import AuthService from "../Services/auth.service";
import {HubConnectionBuilder} from "@microsoft/signalr";


const Rooms = (props) => {

    if(props.connection) {
        return (
            <RoomsTable connection={props.connection}/>
        );
    }
};

export default Rooms;