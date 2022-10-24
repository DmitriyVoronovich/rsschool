let moves = 0;
let table;
let rows;
let columns;
let textMoves;
let arrayForBoard;

// sec

window.onload = function () {

    let seconds = 00;
    let tens = 00;
    let appendTens = document.getElementById("tens")
    let appendSeconds = document.getElementById("seconds")
    let buttonStart = document.querySelector('.button-start');
    let buttonStop = document.getElementById('button-stop');
    let buttonReset = document.getElementById('button-reset');
    let Interval ;


    buttonStart.onclick = function() {
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        appendTens.innerHTML = tens;
        appendSeconds.innerHTML = seconds;
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }

    buttonStop.onclick = function() {
        clearInterval(Interval);
    }




    function startTimer () {
        tens++;

        if(tens <= 9){
            appendTens.innerHTML = "0" + tens;
        }

        if (tens > 9){
            appendTens.innerHTML = tens;

        }

        if (tens > 99) {
            console.log("seconds");
            seconds++;
            appendSeconds.innerHTML = "0" + seconds;
            tens = 0;
            appendTens.innerHTML = "0" + 0;
        }

        if (seconds > 9){
            appendSeconds.innerHTML = seconds;
        }

    }


}

// sec end
function start()
{
    let button = document.getElementById("newGame");
    button.addEventListener( "click", startNewGame, false );
    textMoves = document.getElementById("moves");
    table = document.getElementById("table");
    rows = 4;
    columns = 4;
    startNewGame();
}

function startNewGame()
{
    let arrayOfNumbers = new Array();
    let arrayHasNumberBeenUsed;
    let randomNumber = 0;
    let count = 0;
    moves = 0;
    rows = document.getElementById("rows").value;
    columns = document.getElementById("columns").value;
    textMoves.innerHTML = moves;
    // Create the proper board size.
    arrayForBoard = new Array(rows);
    for (let i = 0; i < rows; i++)
    {
        arrayForBoard[i] = new Array(columns);
    }
    // Set up a temporary array for
    // allocating unique numbers.
    arrayHasNumberBeenUsed = new Array( rows * columns );
    for (let i = 0; i < rows * columns; i++)
    {
        arrayHasNumberBeenUsed[i] = 0;
    }

    // Assign random numbers to the board.
    for (let i = 0; i < rows * columns; i++)
    {
        randomNumber = Math.floor(Math.random()*rows * columns);
        // If our random numer is unique, add it to the board.
        if (arrayHasNumberBeenUsed[randomNumber] == 0)
        {
            arrayHasNumberBeenUsed[randomNumber] = 1;
            arrayOfNumbers.push(randomNumber);
        }
        else // Our number is not unique. Try again.
        {
            i--;
        }
    }

    // Assign numbers to the game board.
    count = 0;
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            arrayForBoard[i][j] = arrayOfNumbers[count];

            count++;
        }
    }
    showTable();
}

function showTable()
{
    let outputString = "";
    for (let i = 0; i < rows; i++)
    {
        outputString += "<tr>";
        for (let j = 0; j < columns; j++)
        {
            if (arrayForBoard[i][j] == 0)
            {
                outputString += "<td class=\"blank\"> </td>";
            }
            else
            {
                outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + ")\">" + arrayForBoard[i][j] + "</td>";
            }
        } // end for (let j = 0; j < columns; j++)
        outputString += "</tr>";
    } // end for (let i = 0; i < rows; i++)

    table.innerHTML = outputString;
}

function moveThisTile( tableRow, tableColumn)
{
    if (checkIfMoveable(tableRow, tableColumn, "up") ||
        checkIfMoveable(tableRow, tableColumn, "down") ||
        checkIfMoveable(tableRow, tableColumn, "left") ||
        checkIfMoveable(tableRow, tableColumn, "right") )
    {
        incrementMoves();
    }
    else
    {
        alert("ERROR: Cannot move tile!\nTile must be next to a blank space.");
    }

    if (checkIfWinner())
    {
        alert("Congratulations! You solved the puzzle in " + moves + " moves.");
        startNewGame();
    }
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction)
{
    // The following letiables an if else statements
    // make the function work for all directions.
    rowOffset = 0;
    columnOffset = 0;
    if (direction == "up")
    {
        rowOffset = -1;
    }
    else if (direction == "down")
    {
        rowOffset = 1;
    }
    else if (direction == "left")
    {
        columnOffset = -1;
    }
    else if (direction == "right")
    {
        columnOffset = 1;
    }

    // Check if the tile can be moved to the spot.
    // If it can, move it and return true.
    if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
        rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns
    )
    {
        if ( arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0)
        {
            arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate];
            arrayForBoard[rowCoordinate][columnCoordinate] = 0;
            showTable();
            return true;
        }
    }
    return false;
}

function checkIfWinner()
{
    let count = 1;
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            if (arrayForBoard[i][j] != count)
            {
                if ( !(count === rows * columns && arrayForBoard[i][j] === 0 ))
                {
                    return false;
                }
            }
            count++;
        }
    }

    return true;
}

function incrementMoves()
{
    moves++;
    if (textMoves) // This is nessessary.
    {
        textMoves.innerHTML = moves;
    }
}

window.addEventListener( "load", start, false ); // This event listener makes the function start() execute when the window opens.

