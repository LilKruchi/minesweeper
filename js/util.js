'use strict';


function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
			const currCell = mat[i][j];

			var cellClass = getClassName({ i: i, j: j });
			// console.log('cellClass:', cellClass)

			// if (currCell.type === FLOOR) cellClass += ' floor';
			// else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += `\t<td class="cell ${cellClass} "  onmousedown="cellClicked(event,${i},${j})" >\n`;

			if (currCell.isMine && currCell.isShown) {
				strHTML += MINE;
			}
            // console.log(currCell);

			strHTML += '\t</td>\n';
		}
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}


function setMinesNegsCount(cellI, cellJ, mat) {
    // console.log(cellI, cellJ);
    var neighborsCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            
        if (i === cellI && j === cellJ) continue
        if (j < 0 || j >= mat[i].length) continue

        if (mat[i][j].isMine) neighborsCount++
        }
    }

    console.log(`number of mines: ${neighborsCount}`);
    return neighborsCount
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