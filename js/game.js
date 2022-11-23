'use strict';
// Global variables go here

var gLevel = { size: 4, mines: 2 };
var gBoard;
var gGame;
var gGameTimer;
var gHealth = 3;
var gCountFlags = gLevel.mines - 1
var gIsFlagged = false

const MINE = '<img src="img/mine.png">';
const FLAG = '<img src="img/flag.png">';
const ALIVE = '<img src="img/flag.png">';
const LOSE = '<img src="img/lose.png">';
const WIN = '<img src="img/win.png">';
const START_GAME = '<img src="img/startGame.png">';

// Rest of functions

function initGame() {
    gCountFlags = gLevel.mines
	gHealth = 3
	gGame = { isOn: false };
	gBoard = buildBoard(gLevel.size);

	// console.log(gBoard);
	renderBoard(gBoard, '.minesweeper-container');
	setMinesNegsCount(gBoard);
}


function startGame() {

	var elBtn = document.querySelector('.startGame');
	elBtn.innerText = START_GAME;

	initGame();
	gGame.isOn = true;
	randomMineLocation(gBoard);
}


function buildBoard(size) {

	const board = [];

	for (var i = 0; i < size; i++) {
		board.push([]);
		for (var j = 0; j < size; j++) {
			board[i][j] = {
				isShown: false,
				isMine: false,
				isMarked: false,
				minesAroundCount: 0
			};
		}
	}
	return board;
}


function cellClicked(elCell, i, j) {

	if (!gGame.isOn) return;


	var cellCoord = { i, j };
	// console.log(elCell.button);

	if (elCell.button === 0) {

		var countBombs = setMinesNegsCount(i, j, gBoard);
		var className = getClassName(cellCoord);
		var elCell = document.querySelector('.' + className);
		console.log(className);

		elCell.classList.remove('hidden');

		gBoard[i][j].minesAroundCount = countBombs;
		renderCell(cellCoord, countBombs);

		if (gBoard[i][j].isMine) {

			elCell.classList.add('bomb');
			gHealth -= 1;
			console.log(gHealth);

			if (gHealth === 0) {
				gGame.isOn = false;
			}
			gBoard[i][j].isShown = true;
			renderCell(cellCoord, MINE);
			// removeBombSelection(bombCoords, gBoard)
			// gGame.isOn = false   This is for final game
		}
	}

	if (elCell.button === 2) {
        plantOrRemFlag(i, j)
        // renderCell(cellCoord, FLAG)
	}
    // if (gBoard[i][j].isMarked) return;

}


function plantOrRemFlag(i, j) {

	var cellCoord = { i, j };

    if (!gIsFlagged) {
        renderCell(cellCoord, FLAG)
        gCountFlags -= 1
        gIsFlagged = true

    } else {
        gCountFlags += 1
        renderCell(cellCoord, '')
        gIsFlagged = false
    }
    console.log(gCountFlags);

}

// function onHandleKey(el) {
// 	// console.log(el.button);
// }


function randomMineLocation(board) {
	const coords = getEmptyPositions(board);
	var bombCoords = [];
	// console.log(coords);

	for (var i = 0; i < gLevel.mines; i++) {
		var rndIdx = getRandomInt(0, coords.length);
		var coord = coords[rndIdx];

		bombCoords.push(coords.splice(rndIdx, 1));
		bombCoords = bombCoords.flat();

		renderCell(coord, '');

		// console.log(gBoard[coord.i][coord.j], coord.i, coord.j);

		gBoard[coord.i][coord.j].isMine = true;
	}
	// if (gGame.size === 4){}

	return bombCoords;
}


function removeBombSelection(bombCoords, board) {
	console.log(bombCoords);

	for (var i = 0; i < bombCoords.length; i++) {
		var cellI = bombCoords[i].i;
		var cellJ = bombCoords[i].j;

		// board[cellI][cellJ].isMine = false
	}
}
