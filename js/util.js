'use strict';


function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
			const currCell = mat[i][j];

			var cellClass = getClassName({ i: i, j: j });


			strHTML += `\t<td class="hover hidden cell ${cellClass}" onmousedown="cellClicked(event,${i},${j})" >\n`;

			if (currCell.isMine && currCell.isShown) {
				strHTML += MINE;
			}

			strHTML += '\t</td>\n';
		}
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}


function createHearts() {
    var strHTML = ''

    for (var i = 0 ; i < gHealth; i++) {
        strHTML += '<img src="./img/hp.png">'
    }

    const elDiv = document.querySelector('.hearts')
    elDiv.innerHTML = strHTML
    
}


function setMinesNegsCount(cellI, cellJ, mat) {
    var neighborsCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            // console.log(mat[i][j].isMine);
            if (mat[i][j].isMine) {
                mat[cellI][cellJ].minesAroundCount++;
                neighborsCount++
            }
        }
    }

    // console.log(`number of mines: ${neighborsCount}`);
    if (neighborsCount === 0) return null
    return neighborsCount
}



function getEmptyPositions(board) {
    const coords = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (!board[i][j].isMine) coords.push({i,j})
        }
    }
    return coords
}



function getClassName(location) {
	const cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}



function renderCell(location, value) {
	const cellSelector = '.' + getClassName(location); // cell-i-j
	const elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}

function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}