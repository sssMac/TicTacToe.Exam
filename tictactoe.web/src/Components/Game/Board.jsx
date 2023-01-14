import React, {useEffect, useRef, useState} from 'react';
import Square from "./Square";
import UserService from "../../Services/user.service";
import {useParams} from "react-router-dom";

function calculateWinner(squares) {
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winningPatterns.length; i++) {
        const [a, b, c] = winningPatterns[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
function calculateDraw(squares) {
    for (let i = 0; i < squares.length; i++) {

        if (!squares[i]) {
            return false;
        }
    }
    return true;

}
const Board = (props) => {
    const { host } = useParams()
    const [squares, setSquares] = React.useState(Array(9).fill(null))
    const [isX, setIsX] = React.useState(true);
    const [turn, setTurn] = useState("X");
    const latestBoard = useRef(null);
    latestBoard.current = squares;
    useEffect(() => {
        if (props.connection) {
            props.connection.on("ReceiveMove", (res) => {
                const updatedBoard = [...latestBoard.current];
                updatedBoard[res.square] = res.symbol;
                setSquares(updatedBoard);
                if(res.symbol === "X"){
                    setTurn("O")
                }
                else{
                    setTurn("X")
                }
            });

        }
    }, [props.connection]);

    const handleClick = (i) => {
        if(localStorage.getItem('username') === host && turn === "O"){
            return;
        }
        else if(localStorage.getItem('username') !== host && turn === "X"){
            return;
        }
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = turn
        props.connection.invoke('MakeMove', i, squares[i] , host).catch(err => console.error(err));
        setSquares(squares)
        setIsX(!isX)
    }

    const winner = calculateWinner(squares)
    let status


    if (winner) {
        status = `Winner: ${winner}`;
        if(winner === "X"){
            UserService.setWinner(host, props.host, props.roomId)
                .catch(err => console.error(err))
        }
        else if(winner === "O" && localStorage.getItem('username') !== host) {
            UserService.setWinner(localStorage.getItem('username'), props.host, props.roomId)
                .catch(err => console.error(err))
        }
    }

    const draw = calculateDraw(squares)
    if(draw){
        UserService.setDraw(props.roomId)
            .then(res => props.connection.invoke('SendMessage', res.data, host).catch(err => console.error(err)))
    }

    else {
        status = "Next player: " + turn;
    }

    const handleRestart = () => {
        setIsX(true)
        setSquares(Array(9).fill(null))
    }

    const renderSquare = (i) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />
    }

    return (
        <div className="board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <div className="status">{status}</div>
        </div>
    )
}

export default Board;