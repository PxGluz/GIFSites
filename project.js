var chipsMatrix= [[undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined],
            [undefined,undefined,undefined,undefined,undefined,undefined,undefined]];
var chips = $("td");
var k = 0;

var currentPlayer = "player1";

var player1 = "Player 1";
var player2 = "Player 2";
/*var player1 = prompt("Please input the first player's name:");
if(player1 === null || player1 === "")
    player1 = "Player 1";
var player2 = prompt("Please input the second player's name:");
if(player2 === null || player2 === "")
    player2 = "Player 2";*/

for(var i = 0; i < 6; i++)
    for(var j = 0; j < 7; j++)
        chipsMatrix[i][j] = chips.eq(k++);

var paragraph = $("p");

paragraph.css("font-size", "30px");

paragraph.text(player1 + ", it is your turn!");
paragraph.css("color", "deepskyblue");

function restart(){
    for(var i = 0; i < 6; i++)
        for(var j = 0; j < 7; j++){
            chipsMatrix[i][j].removeClass("player1");
            chipsMatrix[i][j].removeClass("player2");
        }
    currentPlayer = "player1";
    paragraph.text(player1 + ", it is your turn!");
    paragraph.css("color", "deepskyblue");
}

function directionalCheck(a,b,iD,jD){
    var sum = 0;
    while(sum < 3 && (a < 6 && a > -1) && (b < 7 && b > -1) && chipsMatrix[a][b].attr("class") === currentPlayer){
        sum++;
        a += iD;
        b += jD;
    }
    return sum;
}

function checkWin(id){
    for(var i = 0; i < 6; i++)
        for(var j = 0; j < 7; j++)
            if(id === chipsMatrix[i][j].attr("id")){
                a = 0;
                while(chipsMatrix[a][j].css("background-color") === "rgb(128, 128, 128)")
                    a++;
                var horizontal = 1 + directionalCheck(a, j - 1, 0, -1) + directionalCheck(a, j + 1, 0, 1);
                var vertical = 1 + directionalCheck(a - 1, j, -1, 0) + directionalCheck(a + 1, j, 1, 0);
                var dDiagonal = 1 + directionalCheck(a - 1, j - 1, -1, -1) + directionalCheck(a + 1, j + 1, 1, 1);
                var aDiagonal =  1 + directionalCheck(a + 1, j - 1, 1, -1) + directionalCheck(a - 1, j + 1, -1, 1);
                if(horizontal >= 4 || vertical >= 4 || dDiagonal >= 4 || aDiagonal >= 4){
                    paragraph.text(((currentPlayer === "player1") ? player1 : player2) + " WINS! (Refresh to play again)");
                    currentPlayer = null;
                }
                break;
            }
}

function moveDown(){
    for(var i = 0; i < 5; i++)
        for(var j = 0; j < 7; j++)
             if(chipsMatrix[i + 1][j].css("background-color") === "rgb(128, 128, 128)" && chipsMatrix[i][j].attr("class") === currentPlayer){
                 chipsMatrix[i][j].toggleClass(currentPlayer);
                 chipsMatrix[i + 1][j].toggleClass(currentPlayer);
             }
}

function checkColumn(id){
    for(var i = 0; i < 6; i++)
        for(var j = 0; j < 7; j++)
            if(id === chipsMatrix[i][j].attr("id") && chipsMatrix[0][j].css("background-color") === "rgb(128, 128, 128)"){
                chipsMatrix[0][j].addClass(currentPlayer);
                return true;
            }
    return false;
}

function placeChip(){
    if(currentPlayer !== null && checkColumn($(this).attr("id"))){
        moveDown();
        checkWin($(this).attr("id"));
        if(currentPlayer === "player1"){
            currentPlayer = "player2";
            paragraph.text(player2 + ", it is your turn!");
            paragraph.css("color", "red");
        }else if(currentPlayer === "player2"){
            currentPlayer = "player1";
            paragraph.text(player1 + ", it is your turn!");
            paragraph.css("color", "deepskyblue");
        }
    }
    else
        console.log("bruh");
}

chips.on("click", placeChip);
$(".butt").on("click", restart);