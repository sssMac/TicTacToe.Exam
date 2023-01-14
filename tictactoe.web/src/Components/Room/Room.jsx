import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Join from "../../Components/Room/Join"

import "../../Styles/Room/RoomsTable.css"


const Room = (props) => {
    return (
        <TableBody >
            {props.rooms.map((room,index) => (
                <TableRow
                    key={room.createDate}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell  scope="row">
                        {index}
                    </TableCell>
                    <TableCell align="left">{room.hostName}</TableCell>
                    <TableCell align="left">{room.minRating}</TableCell>
                    <TableCell align="right">
                        <div className="wrap">
                            <Join room={room}/>
                        </div>
                    </TableCell>
                </TableRow>
            )) }
        </TableBody>
    );
};

export default Room;