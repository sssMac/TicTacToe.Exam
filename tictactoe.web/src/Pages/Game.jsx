import React from 'react';
import "../Styles/Game/Game.css"
import Board from "../Components/Game/Board";
import Chat from "../Components/Chat/Chat";

const Game = (props) => {
    return (
        <div className="game">
            <Board connection={props.connection}/>
            <Chat connection={props.connection}/>
        </div>
    );
};

export default Game;