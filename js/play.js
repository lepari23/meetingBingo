let boardState = [[]];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateBingoBoard(words, boardWidth) {
    const boardDiv = document.getElementById('bingoBoard');
    boardDiv.innerHTML = '';

    const shuffled = shuffle(words.slice());
    const selected = shuffled.slice(0, (boardWidth * boardWidth));

    const table = document.createElement('table');
    boardState = [...Array(boardWidth)].map(() => Array(boardWidth).fill(false));

    let index = 0;
    for (let row = 0; row < boardWidth; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < boardWidth; col++) {
            const td = document.createElement('td');
            const span = document.createElement('span');
            span.textContent = selected[index++];
            td.appendChild(span);

            td.onclick = function () {
                const span = td.querySelector('span');
                span.classList.add('struck');
                boardState[row][col] = true;
                checkForWin();
            };

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    boardDiv.appendChild(table);
}

function checkForWin() {
    if (detectWin()) {
        showVictory();
    }
}

function detectWin(state = boardState) {
    const boardWidth = (state[0].length);
    let normal_diag_win = true;
    let back_diag_win = true;

    for (let i = 0; i < boardWidth; i++) {
        if (state[i].every(cell => cell === true)) return true;                         // row check
        if (state.map(row => row[i]).every(cell => cell === true)) return true;         // col check
        if (normal_diag_win && !state[i][i]) normal_diag_win = false;                   // normal diagonal check, skips if diagonal broken
        if (back_diag_win && !state[i][boardWidth - (i + 1)]) back_diag_win = false;    // back diagonal check, skips if diagonal broken
        if (!normal_diag_win && !back_diag_win && i === boardWidth - 1) {               // short-circuits loop if diagonal is found
            return false;
        }
    }
    
    return normal_diag_win || back_diag_win;
}

function showVictory() {
    document.getElementById('victoryOverlay').style.display = 'block';
    freezeBoard();
}

function closeVictoryAndFreeze() {
    document.getElementById('victoryOverlay').style.display = 'none';
}

function freezeBoard() {
    const cells = document.querySelectorAll('#bingoBoard td');
    cells.forEach(cell => {
        cell.onclick = null;
    });
}

if (typeof window !== "undefined") {
    function getQueryParam(key) {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    }

    const presetName = getQueryParam("preset");
    const boardWidth = parseInt(getQueryParam("size")) || 3;

    if (presetName && presetLists[presetName]) {
        const words = presetLists[presetName];
        generateBingoBoard(words, boardWidth);
    }
}

// Export for testing
if (typeof module !== "undefined") {
    module.exports = { detectWin };
}