import React, {Component, useEffect, useState} from 'react';
import RoomsTable from "../Components/Room/RoomsTable";
import AuthService from "../Services/auth.service";
import {HubConnectionBuilder} from "@microsoft/signalr";
import Button from '@mui/material/Button';
import { withRouter } from '../Common/with-router';
import Create from "../Components/Room/Create";
import Logout from "../Components/Room/Logout";
import UserService from "../Services/user.service";
import "../Styles/Room/Rooms.css"

const Rooms = (props) => {

    const [rating, setRating] = useState(0)
    UserService.getRating(localStorage.getItem('username'))
        .then(res => setRating(res.data))
        .catch(err => console.error(err))
    if(props.connection) {
        return (
            <div>
                <Logout className="action"/>
                <div className="scores">
                    Your rating: {rating}
                </div>
                <RoomsTable connection={props.connection}/>

                <Create className="action"/>
            </div>

        );
    }
};

export default Rooms;