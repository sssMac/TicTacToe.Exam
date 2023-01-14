import React, {useEffect} from 'react';
import "../Styles/Game/Game.css"
import Board from "../Components/Game/Board";
import Chat from "../Components/Chat/Chat";
import Back from "../Components/Game/Back"
import {useParams} from "react-router-dom";
import Stack from '@mui/material/Stack';

const Game = (props) => {
    const { id, host } = useParams()

    useEffect(() => {
        props.connection.invoke('JoinGroup', localStorage.getItem('username'),host).catch(err => console.error(err));

    }, []);
    return (
        <Stack spacing={2} direction="row" className="game">
            <Board connection={props.connection} host={host} roomId={id}/>
            <Chat connection={props.connection}/>
            <Back/>
        </Stack>
    );
};

export default Game;