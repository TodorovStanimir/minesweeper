export default class Cell {
    constructor(x, y, isMine) {
        this.x = x;
        this.y = y;
        this.isMine = isMine;
        this.countMines = 0;
        this.isReveald = false;
        this.label = 'H';
    }
}