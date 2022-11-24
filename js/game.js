'use strict'
// Global variables go here

var gLevel = {size: 4, mines: 2}
var gSeconds = 0
var gHealth = 1
var gCountFlags = gLevel.mines
var gScore = gLevel.mines
var gBoard
var gGame
var gGameTimer
var gBombCoords



const MINE = '<img src="img/mine2.png">'
const FLAG = '<img src="img/flag.png">'
const ALIVE = '<img src="img/alive.png">'
const LOSE = '<img src="img/lose.png">'
const WIN = '<img src="img/win.png">'
const START_GAME = '<img src="img/startGame.png">'

// Rest of functions

function initGame() {
    var elBtn = document.querySelector('.startGame')
	elBtn.src = 'img/alive.png'
    clearInterval(gGameTimer)
    gCountFlags = gLevel.mines

    if (gLevel.mines === 2) gHealth = 2
    else gHealth = 3

	gGame = { isOn: false }
	gBoard = buildBoard(gLevel.size)
    
    
	renderBoard(gBoard, '.minesweeper-container')
}


function startGame() {
    
    initGame()
    gSeconds = 0
    startTimer()
	gGame.isOn = true
    gScore = gLevel.mines
	gBoard = buildBoard(gLevel.size)
	gBombCoords = randomMineLocation(gBoard)
    loopBoard(gBoard)
    updateBombCount ()
    createHearts()
}




function difficultyLevel(size) { 
    gLevel.size = size
    gLevel.mines  = 2

    if (size > 6) {
        gLevel.mines = Math.floor((size * size) / 4.5)
    }
    startGame()
}


function updateBombCount () {
    var elBombs = document.querySelector('.bomb-count')
    elBombs.innerText = '0' + '0' + gScore

    if (gScore > 9) {
        elBombs.innerText = '0' + gScore
    }

    if (gScore > 99) {
        elBombs.innerText = gScore
    }

}


function startTimer() {
    gGameTimer = setInterval(function() {
    var elSeconds = document.querySelector('.timer')
    gSeconds ++
    elSeconds.innerText ='0' + '0' + gSeconds 
    if (gSeconds > 9) elSeconds.innerText ='0' + gSeconds
    if (gSeconds > 99) elSeconds.innerText = gSeconds 
    }, 1000)
}

function loopBoard(board) {

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board[i].length; j++) {
            setMinesNegsCount(i, j, board)
        }
    }
}

function loseGame() {

    if (gHealth === 0) {
        gGame.isOn = false
        var elEmoji = document.querySelector('.startGame')
        elEmoji.src = 'img/lose.png'
        clearInterval(gGameTimer)
    }
}


function winGame() {
    if (gScore === 1) {
        gGame.isOn = false
        var elEmoji = document.querySelector('.startGame')
        elEmoji.src = 'img/win.png'
        clearInterval(gGameTimer)
    }
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
				minesAroundCount: 0,
                isRecursive: false
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
    var elBombs = document.querySelector('.bomb-count')

	if (!gGame.isOn) return
	var cellCoord = { i, j }


	if (elCell.button === 0) {

		var countBombs = setMinesNegsCount(i, j, gBoard)
		var className = getClassName(cellCoord)
		var elCell = document.querySelector('.' + className)

		gBoard[i][j].minesAroundCount = countBombs
		elCell.classList.remove('hidden')

        colorNums(elCell, gBoard[i][j].minesAroundCount)
        hints(elCell, i, j)
        expandShown(gBoard, i, j, elCell)
		renderCell(cellCoord, countBombs)
		if (gBoard[i][j].isMine) {
            clickOnBomb(cellCoord, elCell)
            elCell.removeAttribute('onmousedown');

		}
	}

	if (elCell.button === 2) {
        plantOrRemFlag(cellCoord)
	}

}


function colorNums(elCell, minesAround) {
    switch(minesAround) {
        case 1:
            elCell.classList.add('num1')
            break

        case 2:
        elCell.classList.add('num2')
        break

        case 3:
            elCell.classList.add('num3')
        break

        case 4:
            elCell.classList.add('num4')
        break

        case 5:
            elCell.classList.add('num5')
        break

        case 6:
            elCell.classList.add('num6')
        break

        case 7:
            elCell.classList.add('num7')
        break

        case 8:
            elCell.classList.add('num8')
        break

        default:
    }
}

function highScore() {
    
}


function hints() {

}




function expandShown(mat, cellI, cellJ, elCell) {
    mat[cellI][cellJ].isRecursive = true
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            var cellCoord = { i, j }
            var className = getClassName(cellCoord)
            var elCell = document.querySelector('.' + className)
            var currCell = mat[i][j]

            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue

            if (currCell.isMarked) continue
            if (currCell.isShown) continue
            if (currCell.isMine) continue
            
            if(currCell.minesAroundCount === 0 || currCell.minesAroundCount === null) {
                if (!currCell.isRecursive) {
                    expandShown(mat,i, j, elCell)
                    if (currCell.minesAroundCount === 0) return null
                    renderCell({i:i, j:j}, currCell.minesAroundCount)
                }
                if (!currCell.isMine) {
                    elCell.classList.remove('hidden')

                }
                
            }
            renderCell({i:i, j:j}, elCell.innerText)
        }
    }

}


function updateHearts() {
    var elHearts = document.querySelectorAll('.hearts')
    elHearts[1].remove()
}


function clickOnBomb(coords, elCell) {

    elCell.classList.add('bomb')
    gHealth -= 1
    gScore -= 1
    updateHearts()
    updateBombCount()

    var elBtn = document.querySelector('.startGame')
	elBtn.src = 'img/startGame.png'
    
    if (gHealth === 0) {
        loseGame()
        revealBombsOnLose(gBombCoords)
    }
    gBoard[coords.i][coords.j].isShown = true
    renderCell(coords, MINE)
}


function plantOrRemFlag(coords) {

    var isCoordMarked = gBoard[coords.i][coords.j].isMarked

    
    if (isCoordMarked) {
        renderCell(coords, '')
        gBoard[coords.i][coords.j].isMarked = false
        gCountFlags += 1
    } else {

        if (gCountFlags > 0) {
            winGame(coords)
            renderCell(coords, FLAG)
            gBoard[coords.i][coords.j].isMarked = true
            gCountFlags -= 1

            if (gBoard[coords.i][coords.j].isMine) {
                gScore -= 1;
                updateBombCount()
            }
        }
    }


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

	return bombCoords
}
