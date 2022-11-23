'use strict';
// Global variables go here

var gLevel = {size: 4, mines: 2}
var gBoard
var gGame

const MINE = '<img src="img/mine.png">'
const FLAG = '<img src="img/flag.png">'
const ALIVE = '<img src="img/flag.png">'
const LOSE = '<img src="img/lose.png">'
const WIN = '<img src="img/win.png">'
const START_GAME = '<img src="img/startGame.png">'

// Rest of functions


function initGame() {

    gGame = {isOn: false}
    gBoard = buildBoard(gLevel.size)

    // console.log(gBoard);
    renderBoard(gBoard, '.minesweeper-container')
    setMinesNegsCount(gBoard)
}


function startGame() {
    // var elBtn = document.querySelector('.startGame')
    // elBtn.src = START_GAME
    gGame = {isOn: false}
    gBoard = buildBoard(gLevel.size)

    // console.log(gBoard);
    renderBoard(gBoard, '.minesweeper-container')

    gGame.isOn = true
}



function buildBoard(size) {
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++){
            board[i][j] = {
                            isShown: false ,
                            isMine: false, 
                            isMarked: false,
                            minesAroundCount: 0
                        }
        }
    }
    board[0][0] = {isShown: false ,isMine: true, isMarked: false, minesAroundCount: 2}
    board[1][1] = {isShown: false ,isMine: true, isMarked: false, minesAroundCount: 2}
    return board
}


function cellClicked(elCell , i, j) {
    if (!gGame.isOn) return
    // console.log(elCell.button);

    var cellCoord = {i, j}

    if (elCell.button === 0){

        var countBombs = setMinesNegsCount(i, j, gBoard)
        gBoard[i][j].minesAroundCount = countBombs
        renderCell(cellCoord, countBombs)
        if (gBoard[i][j].isMine) {
            gBoard[i][j].isShown = true
            renderCell(cellCoord, MINE)
            // gGame.isOn = false   This is for final game
        }

    }

    if (elCell.button === 2) {
        gBoard[i][j].isMarked = true
        renderCell(cellCoord, FLAG)

        if (elCell.button === 0) return
    }
    // console.log(gBoard[i][j].isShown);
}


function onHandleKey(el) {
    // console.log(el.button);
}



