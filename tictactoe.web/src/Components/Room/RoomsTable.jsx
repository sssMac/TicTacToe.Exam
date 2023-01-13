import React, {useEffect} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Room from "./Room";

const RoomsTable = (props) => {
    const userName = localStorage.getItem('username');

   useEffect(()=> {
       props.connection.start().then(() => {
           props.connection.invoke('OnlineStatus', userName).catch(err => console.error(err));
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
            </Table>
        </TableContainer>
    );
};

export default RoomsTable;