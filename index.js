import Minesweeper from './minesweeper.js';

function startnewGame(size, mines) {
    const game = new Minesweeper(size, mines);
    game.getCounts();
    window.game = game;
};

startnewGame(5, 5);
