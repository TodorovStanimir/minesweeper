const errorMessages = {
    "out-of-range": `"******************************************************************
"*  You have selected a cell that is not within the playing field. *
"*  Please, provide a correct cell's coordinates in format (x, y), *
"*  where 'x'  and 'y' are an integers representing numbers of the *
"*  row and column of the cell, You would like to open.            *
"*******************************************************************`,
    "not-a-number": `*******************************************************************
"*  You typed not correct input data.                              *
"*  Please, provide a correct cell's coordinates in format (x, y), *
"*  where 'x'  and 'y' are an integers representing numbers of the *
"*  row and column of the cell, You would like to open.            *
"*******************************************************************`,
};

const userMessages = {
    "game-start": `******************************************************************
*----------------WELCOME TO WORLD OF MINESWEEPER.----------------*
*    Playing minesweeper is our passion. That's why we strive to *
* make it the greatest game in the world! Minesweeper trains     *
* your brain and increases your mind power. At the same time, it *
* is a fun and challenging logic puzzle.                         *
*    Please choose cell You want to explore, typing a command    *
* game.openCell(number of row, number of column). The numbers of *
* rows are  in range 1-5, starting from top to bottom, the num-  *
* bers of columns are in range 1-5, starting from left to right. *
******************************************************************`,
    "game-over": `*****************************************************************************
*---------------------------------GAME OVER---------------------------------*
*  To play again, please write command: game.start(size board, count mines) *
*  To exit the game, please write command: game.exit()                      *
*****************************************************************************`,
    "game-continue": (cell) => `*******************************************************************
*--------------------------GAME CONTINUE--------------------------*
*  Congratulations, the game continues. You opened a cell with    *
*  ${cell.countMines} mines.                                                       *
*******************************************************************`,
    "game-exit": `*******************************************************************
*------------------------YOU EXIT THE GAME------------------------*
*  If You want to play again, please reload this page.            *
*******************************************************************`,
    "you-win": `*****************************************************************************
*---------------------C O N G R A T U L A T I O N S ! ! !-------------------*
*--------------------Y O U   W I N   T H E   G A M E ! ! !------------------*
*  To play again, please write command: game.start(size board, count mines) *
*  To exit the game, please write command: game.exit()                      *
*****************************************************************************`,
};

export { errorMessages, userMessages };
