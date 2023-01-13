import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

const Room = (props) => {
    return (
        <TableBody>
            {props.rooms.map((room,index) => (
                <TableRow
                    key={room.Id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell  scope="row">
                        {index}
                    </TableCell>
                    <TableCell align="left">{room.HostName}</TableCell>
                    <TableCell align="left">{room.MinRating}</TableCell>
                    <TableCell align="right">
                        <div className="wrap">
                            <button className="button">Join</button>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default Room;