import Minesweeper from './minesweeper.js';

function startnewGame(size, mines) {
    game = new Minesweeper(size, mines);
    game.getCounts();
};

startnewGame(5, 5);
