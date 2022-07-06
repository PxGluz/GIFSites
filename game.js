var restart = document.querySelector("#restart");
var cells = document.querySelectorAll(".cell");
var win = document.querySelector("#win");

var cellsMatrix = [[cells[0],cells[1],cells[2]],[cells[3],cells[4],cells[5]],[cells[6],cells[7],cells[8]]];

var currentTurn = 'X';

function checkWin(){
    for(var i = 0; i < 3; i++)
        if(cellsMatrix[i][0].textContent !== ''){
            for(var j = 1; j < 3; j++){
                if(cellsMatrix[i][j].textContent !== cellsMatrix[i][j-1].textContent)
                    break;
                else if(j === 2)
                    return true;
            }
        }
    for(var i = 0; i < 3; i++)
        if(cellsMatrix[0][i].textContent !== ''){
            for(var j = 1; j < 3; j++){
                if(cellsMatrix[j][i].textContent !== cellsMatrix[j-1][i].textContent)
                    break;
                else if(j === 2)
                    return true;
            }
        }
    if(cellsMatrix[0][0].textContent === cellsMatrix[1][1].textContent && cellsMatrix[0][0].textContent === cellsMatrix[2][2].textContent && cellsMatrix[1][1].textContent !== '')
        return true;
    if (cellsMatrix[0][2].textContent === cellsMatrix[1][1].textContent && cellsMatrix[0][2].textContent === cellsMatrix[2][0].textContent && cellsMatrix[1][1].textContent !== '')
        return true;
    return false;
}

function restartGame() {
    for (var i = 0; i < cells.length; i++)
        cells[i].textContent = '';
    win.textContent = '';
    currentTurn = 'X';
}

function changeCell(){
    if(this.textContent === ''){
        this.textContent = currentTurn;
        if(checkWin() && currentTurn !== ''){
            win.textContent = currentTurn + " Wins!";
            currentTurn = '';
        }
        if(currentTurn === 'X')
            currentTurn = 'O';
        else if(currentTurn === 'O')
            currentTurn = 'X';
    }
}


for(var i = 0; i < cells.length; i++)
    cells[i].addEventListener('click', changeCell);

restart.addEventListener('click', restartGame);