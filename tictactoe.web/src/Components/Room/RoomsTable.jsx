import React, {useEffect, useState} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Room from "./Room";
import axios from "axios";
import Rooms from "../../Pages/Rooms";

import UserService from "../../Services/user.service";

const RoomsTable = (props) => {
    const userName = localStorage.getItem('username');
    const [rooms,setRooms] = useState([]);



    useEffect(()=> {

        props.connection.start().then(() => {
            props.connection.invoke('OnlineStatus', userName).catch(err => console.error(err));
        })
    },[])

    useEffect(()=> {
        UserService.getRooms().then(r => {
            setRooms(r.data)
            console.log(r.data)
        })

    },[])



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell >Index</TableCell>
                        <TableCell align="left">User Owner</TableCell>
                        <TableCell align="left">Rating</TableCell>
                        <TableCell align="center">Connection</TableCell>
                    </TableRow>
                </TableHead>
                <Room rooms={rooms}/>
            </Table>
        </TableContainer>
    );
};

export default RoomsTable;