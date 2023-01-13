import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../../Styles/Room/RoomsTable.css'
import Room from "./Room";

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
// ) {
//     return { name, calories, fat, carbs, protein };
// }
//
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

const rooms = [
    {
        "Id" : "1",
        "MinRating" : "500",
        "HostName" : "Alexey",
        "Status" : "456",
        "CreateDate" : "567"
    },
    {
        "Id" : "2",
        "MinRating" : "200",
        "HostName" : "Ilya",
        "Status" : "456",
        "CreateDate" : "567"
    },
    {
        "Id" : "3",
        "MinRating" : "1000",
        "HostName" : "Igor",
        "Status" : "456",
        "CreateDate" : "567"
    },
]

export default function RoomsTable() {
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
}