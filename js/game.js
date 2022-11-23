'use strict'
// Global variables go here

var gLevel = { size: 4, mines: 2}
var gBoard
var gGame
var gGameTimer
var gHealth = 1
var gCountFlags = gLevel.mines - 1
var gIsFlagged = false
var gBombCoords

const MINE = '<img src="img/mine.png">'
const FLAG = '<img src="img/flag.png">'
const ALIVE = '<img src="img/alive.png">'
const LOSE = '<img src="img/lose.png">'
const WIN = '<img src="img/win.png">'
const START_GAME = '<img src="img/startGame.png">'

// Rest of functions

function initGame() {
    gCountFlags = gLevel.mines
	gHealth = 3
	gGame = { isOn: false }
	gBoard = buildBoard(gLevel.size)
    

	renderBoard(gBoard, '.minesweeper-container')
	
}



function startGame() {
    
    var elBtn = document.querySelector('.startGame')
	elBtn.src = 'img/alive.png'
    
	initGame()
    
	gGame.isOn = true
    
	gBoard = buildBoard(gLevel.size)
	gBombCoords = randomMineLocation(gBoard)
    loopBoard(gBoard)
    // console.log(gBoard);
}


function loopBoard(board) {
    console.log(board.length);
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            // console.log(i, j);
            setMinesNegsCount(i, j, board)
        }
    }
}

function loseGame() {
    if (gHealth === 0) {
        gGame.isOn = false
        var elEmoji = document.querySelector('.startGame')
        elEmoji.src = 'img/lose.png'
    }
}


function winGame() {

}


function buildBoard(size) {

	const board = []

	for (var i = 0; i < size; i++) {
		board.push([])
		for (var j = 0; j < size; j++) {
			board[i][j] = {
				isShown: false,
				isMine: false,
				isMarked: false,
				minesAroundCount: 0
			}
		}
	}
	return board
}

function revealBombsOnLose(bombCoords) {
    
    for (var i = 0; i < bombCoords.length; i++) {
        var posI = bombCoords[i].i
        var posJ = bombCoords[i].j
        var cellCoord = {i:posI, j:posJ}
        var classPos = getClassName(cellCoord)
        var elBomb = document.querySelector('.' + classPos)

        gBoard[posI][posJ].isShown = true
        elBomb.classList.remove('hidden')
        renderCell(cellCoord, MINE)
    }

}


function cellClicked(elCell, i, j) {

	if (!gGame.isOn) return
	var cellCoord = { i, j }


	if (elCell.button === 0) {

		var countBombs = setMinesNegsCount(i, j, gBoard)
		gBoard[i][j].minesAroundCount = countBombs
        // countBombs = numberCategorize(countBombs)
		var className = getClassName(cellCoord)
		var elCell = document.querySelector('.' + className)
		elCell.classList.remove('hidden')
        // expandShown(gBoard, elCell, i, j)
		renderCell(cellCoord, countBombs)

		if (gBoard[i][j].isMine) {
            clickOnBomb(i, j, elCell)
            elCell.removeAttribute('onmousedown');

		}
	}

	if (elCell.button === 2) {
        plantOrRemFlag(i, j, cellCoord)
	}

}


// function expandShown(mat, elCell, cellI, cellJ) {
//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= mat.length) continue

//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {
// 	        var cellCoord = { i, j }

//             var className = getClassName(cellCoord)
//             var elCell = document.querySelector('.' + className)
//             var currCell = mat[i][j]
//             if (i === cellI && j === cellJ) continue
//             if (j < 0 || j >= mat[i].length) continue

            
//             if(!currCell.minesAroundCount) {
//                 elCell.classList.remove('hidden')
//             }
//         }
//     }
// }



function clickOnBomb(i, j, elCell) {
	var cellCoord = { i, j }

    elCell.classList.add('bomb')
    gHealth -= 1
    console.log('hearts left:',gHealth)

    var elBtn = document.querySelector('.startGame')
	elBtn.src = 'img/startGame.png'
    
    if (gHealth === 0) {
        loseGame()
        revealBombsOnLose(gBombCoords)
    }
    gBoard[i][j].isShown = true
    renderCell(cellCoord, MINE)
}


function plantOrRemFlag(i,j,coords) {

    renderCell(coords, FLAG)

    // console.log(coords)
    if (!gIsFlagged) {
        renderCell(coords, FLAG)
        gCountFlags -= 1
        gIsFlagged = true

    } else {
        gCountFlags += 1
        renderCell(coords, '')
        gIsFlagged = false
    }
    // console.log(gIsFlagged)

}






function randomMineLocation(board) {
	const coords = getEmptyPositions(board)
	var bombCoords = []

	for (var i = 0; i < gLevel.mines; i++) {
		var rndIdx = getRandomInt(0, coords.length)
		var coord = coords[rndIdx]

		bombCoords.push(coords.splice(rndIdx, 1))
		bombCoords = bombCoords.flat()

		renderCell(coord, '')


		gBoard[coord.i][coord.j].isMine = true
	}
	// if (gGame.size === 4){}

	return bombCoords
}


function removeBombSelection(bombCoords, board) {
	// console.log(bombCoords)

	for (var i = 0; i < bombCoords.length; i++) {
		var cellI = bombCoords[i].i
		var cellJ = bombCoords[i].j
        var cellCoord = {i:cellI, j:cellJ}
        console.log(board[cellI][cellJ]);
        board[cellI][cellJ].isMine = false
		// board[cellI][cellJ].isMine = false
	}
    // renderCell(cellCoord, MINE)
}
