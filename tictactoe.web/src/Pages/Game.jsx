import React, {useEffect} from 'react';
import "../Styles/Game/Game.css"
import Board from "../Components/Game/Board";
import Chat from "../Components/Chat/Chat";
import {useParams} from "react-router-dom";

const Game = (props) => {
    const { id, host } = useParams()

    useEffect(() => {
        props.connection.invoke('JoinGroup', localStorage.getItem('username'),host).catch(err => console.error(err));

    }, []);
    return (
        <div className="game">
            <Board connection={props.connection} host={host} roomId={id}/>
            <Chat connection={props.connection}/>
        </div>
    );
};

export default Game;