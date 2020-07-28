function task(input) {
    let board = [[false, false, false],
    [false, false, false],
    [false, false, false]];
    let switchButton = true;
    let winner = false;

    function checkWinner(arrLine) {
        if (arrLine.join('') === 'XXX') {
            winner = true;
            return console.log('Player X wins!');
        } else if (arrLine.join('') === 'OOO') {
            winner = true;
            return console.log('Player O wins!');
        }
    }

    function freeSpaces() {
        let safeArr = new Array(9);

        for (let i = 0; i < board.length; i++) {
            board[i].forEach(a => {
                safeArr.push(a);
            })
        }

        if (!safeArr.includes(false)) {
            return false;
        } else {
            return true;
        }

    }

    for (let i = 0; i < input.length; i++) {
        let [x, y] = input[i].split(' ').map(Number);

        if (winner || !freeSpaces()) {
            break;
        }

        if (board[x][y] === false) {
            if (switchButton === true) {
                board[x][y] = 'X';
            } else {
                board[x][y] = 'O';
            }

            switchButton = !switchButton;
        } else {
            if (i < input.length - 1) {

                console.log('This place is already taken. Please choose another!');
                continue;
            }
        }

        for (let j = 0; j < board.length; j++) {
            checkWinner(board[j]);
            if (winner === true) {
                break;
            }

            let arrToSave = new Array(3);
            let diagonalArr = [board[0][0], board[1][1], board[2][2]];
            let secondDiagonalArr = [board[0][2], board[1][1], board[2][0]];


            for (let k = 0; k < board[j].length; k++) {
                arrToSave.push(board[k][j]);
            }
            checkWinner(arrToSave);
            if (winner || !freeSpaces()) {
                break;
            }

            checkWinner(diagonalArr);
            if (winner || !freeSpaces()) {
                break;
            }

            checkWinner(secondDiagonalArr);
            if (winner || !freeSpaces()) {
                break;
            }
        }
    }
    if (!winner) {
        console.log('The game ended! Nobody wins :(');
    }
    board.forEach(a => {
        console.log(a.join('	'));
    });

}