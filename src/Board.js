import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.3 }) {
    const [board, setBoard] = useState(createBoard());

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        let initialBoard = [];

        for (let row = 0; row < nrows; row++) {
            initialBoard.push([]);
            for (let col = 0; col < ncols; col++) {
                let booleanVal = Math.random() < chanceLightStartsOn;

                initialBoard[row].push(booleanVal);
            }
        }

        return initialBoard;
    }

    function hasWon() {
        // TODO: check the board in state to determine whether the player has won.
        for (let cellList of board) {
            for (let cell of cellList) {
                if (cell == true) {
                    return false;
                }
            }
        }

        return true;
    }

    function flipCellsAround(coord) {
        setBoard((oldBoard) => {
            console.log(coord);
            const [y, x] = coord.split("-").map(Number);

            const flipCell = (y, x, boardCopy) => {
                // if this coord is actually on board, flip it

                if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                    boardCopy[y][x] = !boardCopy[y][x];
                }
            };


            let copy = oldBoard.map((cellList) => [...cellList]);

            flipCell(y, x, copy);

            if (y - 1 >= 0) {
                flipCell(y - 1, x, copy);
            }
            if (y + 1 < ncols) {
                flipCell(y + 1, x, copy);
            }
            if (x - 1 >= 0) {
                flipCell(y, x - 1, copy);
            }
            if (x + 1 < nrows) {
                flipCell(y, x + 1, copy);
            }

            return copy;
        });
    }

    // if the game is won, just show a winning msg & render nothing else
    if (hasWon() && board.length > 0) {
        alert("you won!");
    } else {
        console.log("not yet");
        console.log(board);
    }


    // make table board
    return (
        <div className="flex-wrapper">
            <div>
                <h1> Welcome to lights out! </h1>
                <p> Remove all the white lights. </p>
                <table className="table-center">
                    {board.map((row, rowIndex) => {
                        {
                            return (
                                <tr>
                                    {row.map((cell, cellIndex) => (
                                        <Cell
                                            flipCellsAroundMe={() => {
                                                flipCellsAround(
                                                    `${rowIndex}-${cellIndex}`
                                                );
                                            }}
                                            isLit={cell}
                                        ></Cell>
                                    ))}
                                </tr>
                            );
                        }
                    })}
                </table>
            </div>
            <div className="footer footer-grid">
                <div> Contact us </div>
                <div> Hire us</div>
                <div> Give us feedback! </div>
                <div> Careers </div>
            </div>
        </div>
    );

}

export default Board;
