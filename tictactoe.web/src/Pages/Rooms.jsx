import React, {Component, useEffect, useState} from 'react';
import RoomsTable from "../Components/Room/RoomsTable";
import AuthService from "../Services/auth.service";
import {HubConnectionBuilder} from "@microsoft/signalr";
import Button from '@mui/material/Button';
import { withRouter } from '../Common/with-router';
import Create from "../Components/Room/Create";






const Rooms = (props) => {

    if(props.connection) {
        return (
            <div>
                <RoomsTable connection={connection}/>
                <Create/>
            </div>


        );
    }
};

export default Rooms;