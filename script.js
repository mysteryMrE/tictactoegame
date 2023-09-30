const ticTacGame = () => {

    const handleClick = event => {
        if(event.target.matches('td') && !event.target.classList.contains('filled') && !gameover){
            if(xTurn){
                event.target.classList.add('filled');
                event.target.innerText="X";
                who.innerText="O's turn";
                if(check("X")){
                    gameover=true;
                    xwins++;
                    who.innerText="X WON";
                };
            }
            else{
                event.target.classList.add('filled');
                event.target.innerText="O";
                who.innerText="X's turn";
                if(check("O")){
                    gameover=true;
                    owins++;
                    who.innerText="O WON";
                };
            }
            oCounter.innerText=`O wins: ${owins}`;
            xCounter.innerText=`X wins: ${xwins}`;
            xTurn=!xTurn;
            drawCheck++;
            if(drawCheck==9 && !gameover){
                who.innerText="DRAW";
                gameover=true;
            }
        }
    }

    const check = a => {
        const ticTacTable=document.querySelector("#game");
        const winning_combinations = [
            [[0, 0], [0, 1], [0, 2]],  // Top row
            [[1, 0], [1, 1], [1, 2]],  // Middle row
            [[2, 0], [2, 1], [2, 2]],  // Bottom row
            [[0, 0], [1, 0], [2, 0]],  // Left column
            [[0, 1], [1, 1], [2, 1]],  // Middle column
            [[0, 2], [1, 2], [2, 2]],  // Right column
            [[0, 0], [1, 1], [2, 2]],  // Diagonal from top-left to bottom-right
            [[0, 2], [1, 1], [2, 0]]   // Diagonal from top-right to bottom-left
        ]

        for (let combination of winning_combinations){
            let winner=0;
            for (let coords of combination){
                if(ticTacTable.rows[coords[0]].cells[coords[1]].innerText==a){
                    winner++;
                }
            }
            if (winner==3){
                for (let coords of combination){
                    ticTacTable.rows[coords[0]].cells[coords[1]].classList.add('winner');
                }
                return true;
            }
        }
    }
    
    let xwins=0;
    let owins=0;
    let drawCheck=0;
    const oCounter=document.querySelector("#o_win");
    const xCounter=document.querySelector("#x_win");
    oCounter.innerText=`O wins: ${owins}`;
    xCounter.innerText=`X wins: ${xwins}`;

    let gameover = false;
    let xTurn = true;
    const ticTacTable = document.createElement('table');
    ticTacTable.id = 'game';
    const who=document.querySelector('#who');
    who.innerText="X's turn";
    
    ticTacTable.addEventListener('click', handleClick);

    //create table

    for (let i = 1; i <= 3; i++) {
        const row = document.createElement('tr');
        for (let j = 1; j <= 3; j++) {
            const cell = document.createElement('td');
            cell.classList.add('empty');
            cell.innerText="";
            row.appendChild(cell);
        }
        ticTacTable.appendChild(row);
    }

    //reset
    const ticTacReset = document.createElement('button');
    ticTacReset.id = 'reset';
    ticTacReset.innerText = 'RESET';

    document.querySelector('div#ticTacToe').appendChild(ticTacReset);

    ticTacReset.addEventListener('click', () => {
        for (let row of ticTacTable.rows){
            for (let cell of row.cells){
                cell.innerText="";
                cell.classList.remove('filled');
                cell.classList.remove('winner');
                who.innerText="X's turn";
            }
        }
        drawCheck=0;
        xTurn=true;
        gameover=false;
    })



    return ticTacTable;
}

document.querySelector('div#ticTacToe').appendChild(ticTacGame());
