import Cell from './cell.js';
import { errorMessages, userMessages } from './messages.js';

class Minesweeper {
    #board;
    constructor(boardSize, countMines) {
        this.#board = this.placeMines(boardSize, countMines);
        this.countMines = countMines;
        this.boardSize = boardSize;
    }

    /**
    * Takes in the game board size and the count of mines, and return the object
    *
    * @param {boardSize} - number, representing the size of the game board
    * @param {countMines} - number, representing the count of the mines in game board
    * @returns {object} - game object
    */
    placeMines(boardSize, countMines) {

        /**
        * Takes a number equal to size of the game board and return a random number
        *
        * @param {number} - size of the game board
        * @returns {number} - between 1 and size of game board
        */
        const generateIndex = (maxNum) => Math.floor(Math.random() * maxNum);

        //Declaring an empty array for storing the coordinates of the mines
        const minesIndexes = [];

        for (let i = 0; i < countMines; i++) {

            //Generating the random numbers for the coordinates of next mine.
            let x = generateIndex(boardSize);
            let y = generateIndex(boardSize);

            //while the generated coordinates of the next mine, exists in the array of mines,
            //we have to generate new ones
            while (!!minesIndexes.find((ind) => ind[0] === x && ind[1] === y)) {
                x = generateIndex(boardSize);
                y = generateIndex(boardSize);
            }

            minesIndexes.push([x, y]);
        }

        const board = Array(boardSize)
            .fill([])
            .map((row, rowInd) => {
                for (let columnInd = 0; columnInd < boardSize; columnInd++) {
                    const isMine = !!minesIndexes.find((ind) => ind[0] === rowInd && ind[1] === columnInd);
                    const newCell = new Cell(rowInd, columnInd, isMine);
                    row = row.concat(newCell);
                }

                return row;
            });

        return board;
    }

    /**
    * Calculate the count of mines around each cell.
    * Store the count in a Cell object.
    * Console.log a greeting message.
    * Console.log a game board;
    */
    getCounts() {
        this.#board.map((row) => {
            row.map((cell) => {
                if (!cell.isMine) {
                    const { startX, endX, startY, endY } = this.#findNeighboorsIndexes(cell);

                    for (let x = startX; x <= endX; x++) {
                        for (let y = startY; y <= endY; y++) {
                            if (this.#board[x][y].isMine) {
                                cell.countMines++;
                            }
                        }
                    }
                } else {
                    cell.countMines = -1;
                }
            });
        });

        console.log(userMessages['game-start']);
        console.log(this.#showBoard());
    }

    /**
    * Takes in the cell coordinates and check its propriety.
    * Open a cell and check is it a mine or not.
    * Check if the game ended or continue and prints an appropriate message.
    *
    * @param {x} - number, representing the row on which is the cell
    * @param {y} - number, representing the column on which is the cell
    */
    openCell(x, y) {
        if (x < 1 || x > this.boardSize || y < 1 || y > this.boardSize) {
            return console.error(errorMessages['out-of-range']);
        }

        if (typeof x !== 'number' || typeof y !== 'number') {
            return console.error(errorMessages['not-a-number']);
        }

        const cell = this.#board[x - 1][y - 1];

        if (cell.isReveald) {
            return;
        }

        if (cell.isMine) {
            cell.label = 'M';
            cell.isReveald = true;

            this.#board.map(row => 
                row.map((cell) => {
                    if (cell.isMine) {
                        cell.label = 'M';
                    }
                    cell.isReveald = true;
                })
            );

            console.log(this.#showBoard());
            console.log(userMessages['game-over']);
            
            this.#addStartEndFunctions();

            return;
        }

        this.#revealCell(cell);

        const actualBoard = this.#showBoard();
        const countUnOpendMines = this.#board.reduce((acc, row) => {acc += row.filter((cell) => !cell.isReveald).length; return acc}, 0);

        if (countUnOpendMines === this.countMines) {
            this.#board.map(row => row.map(cell => cell.isReveald = true));
            console.log(actualBoard);
            console.log(userMessages['you-win']);
            this.#addStartEndFunctions();
        } else {
            console.log(userMessages['game-continue'](cell));
            console.log(actualBoard);
        }
    }

    /**
    * Forming a game board as a string
    * 
    * @returns {string} - game board
    */
    #showBoard() {
        return `${'*'.repeat(4 * this.boardSize + 1)}\n${this.#board
            .map((r) =>
                r.map((c, cInd) => `* ${c.isReveald ? c.isMine ? c.label : c.countMines : c.label} ${cInd + 1 === this.boardSize ? '*' : ''}`).join(''))
                    .join(`\n${'*'.repeat(4 * this.boardSize + 1)}\n`)}\n${'*'.repeat(4 * this.boardSize + 1)}`;
    }

    /**
    * Generate functions for start a new game or exit from the last ended game
    * 
    */
    #addStartEndFunctions() {
        this.start = function (size, mines) {
            if (typeof size ==='number' && size > 0 && typeof mines ==='number' && mines > 0 && mines <= size) {
            this.#startNewGame(size, mines);
            }
        };

        this.exit = function () {
            console.log(userMessages['game-exit']);
            delete window.game;
        };
    }

    /**
    * Reveal chosen by the user cell
    * If around the chosen cell have not mines, execute a function for opening a neighbor cells
    * 
    * @param {cel} cell choosen by the user
    */
    #revealCell(cell){
        cell.isReveald = true;
        if(cell.countMines===0){
            this.#openNeighboors(cell);
        }
    }
    
    /**
    * Reveal all the neighboor cell
    * 
    * @param {cel} cell choosen by the user
    */
    #openNeighboors(cell) {
        const { startX, endX, startY, endY } = this.#findNeighboorsIndexes(cell);
        
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                if (!this.#board[x][y].isReveald) {
                    this.#board[x][y].isReveald = true;
                    if(this.#board[x][y].countMines === 0){
                    this.#revealCell(this.#board[x][y]);}
                }
            }
        }
    }

    /**
    * Find and parameterized the rows and columns indexes of the neighbour's cells
    * 
    * @param {cel} cell choosen by the user
    * @returns {object} with four properties - start and end row, start and end column
    */
    #findNeighboorsIndexes(cell) {
        const startX = cell.x === 0 ? 0 : cell.x - 1;
        const endX = cell.x === this.boardSize - 1 ? cell.x : cell.x + 1;
        const startY = cell.y === 0 ? 0 : cell.y - 1;
        const endY = cell.y === this.boardSize - 1 ? cell.y : cell.y + 1;

        return { startX, endX, startY, endY };
    }

    /**
    * Start a new game
    * 
    * @param {size} count of cells in a row and a column
    * @param {mines} count of mines in a play field
    */
    #startNewGame(size, mines) {
        const game = new Minesweeper(size, mines);
        game.getCounts();
        window.game = game;
    }
}

export default Minesweeper;