import React, { useState, useRef } from 'react'; 
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const TicTacToe = () => {
    const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]); // Game state for grid
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false); // Lock the game once there's a winner
    const titleRef = useRef(null);

    const toggle = (num) => {
        if (lock || data[num] !== "") { // Prevent move if spot is already filled or game is locked
            return;
        }

        const newData = [...data]; // Copy the data array
        if (count % 2 === 0) {
            newData[num] = "x"; // X's turn
        } else {
            newData[num] = "o"; // O's turn
        }

        setData(newData); // Update the game state with new data
        setCount(count + 1); 
        checkWin(newData); // Check for winner after each move
    };

    const checkWin = (newData) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6], // Diagonals
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]); // Call the won function if there's a winner
                return;
            }
        }

        if (count === 8) {
            setLock(true); // Lock the game if it's a draw
        }
    };

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `Congratulations: <img src=${cross_icon} alt="X"/>, you won!`;
        } else {
            titleRef.current.innerHTML = `Congratulations: <img src=${circle_icon} alt="O"/>, you won!`;
        }
    };

    const reset = () => {
        setLock(false); // Unlock the game
        setData(["", "", "", "", "", "", "", "", ""]); 
        setCount(0); 
        titleRef.current.innerHTML = 'Tic Tac Toe Game In <span>React</span>'; 
    };

    return (
        <div className="container">
            <h1 className="Title" ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" onClick={() => toggle(0)}>
                        {data[0] && <img src={data[0] === "x" ? cross_icon : circle_icon} alt={data[0]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(1)}>
                        {data[1] && <img src={data[1] === "x" ? cross_icon : circle_icon} alt={data[1]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(2)}>
                        {data[2] && <img src={data[2] === "x" ? cross_icon : circle_icon} alt={data[2]} />}
                    </div>
                </div>
                <div className="row2">
                    <div className="boxes" onClick={() => toggle(3)}>
                        {data[3] && <img src={data[3] === "x" ? cross_icon : circle_icon} alt={data[3]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(4)}>
                        {data[4] && <img src={data[4] === "x" ? cross_icon : circle_icon} alt={data[4]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(5)}>
                        {data[5] && <img src={data[5] === "x" ? cross_icon : circle_icon} alt={data[5]} />}
                    </div>
                </div>
                <div className="row3">
                    <div className="boxes" onClick={() => toggle(6)}>
                        {data[6] && <img src={data[6] === "x" ? cross_icon : circle_icon} alt={data[6]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(7)}>
                        {data[7] && <img src={data[7] === "x" ? cross_icon : circle_icon} alt={data[7]} />}
                    </div>
                    <div className="boxes" onClick={() => toggle(8)}>
                        {data[8] && <img src={data[8] === "x" ? cross_icon : circle_icon} alt={data[8]} />}
                    </div>
                </div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;