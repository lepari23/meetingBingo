// ---- runtime memory ---------------------------------
let currentWords = [];
let currentSize = 3;
let currentBonus = false;
let boardFrozen = false;
let currentLayout = [];

let boardState = [[]];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateBingoBoard(words, boardWidth, bonus = false, reuseLayout = null) {
    currentWords = words;
    currentSize = boardWidth;
    currentBonus = bonus;
    boardFrozen = false;

    // use previous layout if provided, otherwise shuffle a fresh one
    const need = boardWidth * boardWidth - (bonus ? 1 : 0);
    const flat = reuseLayout ? reuseLayout.slice()
        : shuffle(words.slice()).slice(0, need);
    currentLayout = flat.slice();

    const boardDiv = document.getElementById("bingoBoard");
    boardDiv.innerHTML = "";
    boardState = [...Array(boardWidth)].map(() => Array(boardWidth).fill(false));

    let index = 0;
    const table = document.createElement("table");

    for (let r = 0; r < boardWidth; r++) {
        const tr = document.createElement("tr");
        for (let c = 0; c < boardWidth; c++) {
            const td = document.createElement("td");
            const span = document.createElement("span");

            const mid = Math.floor(boardWidth / 2);
            const isCentre = bonus && boardWidth % 2 === 1 && r === mid && c === mid;

            span.textContent = isCentre ? "FREE" : flat[index++];
            td.appendChild(span);

            if (isCentre) {                        // auto-strike FREE square
                span.classList.add("struck");
                boardState[r][c] = true;
            }

            td.onclick = () => {
                if (boardFrozen || isCentre) return;      // ignore if frozen or free
                span.classList.add("struck");
                boardState[r][c] = true;
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

function detectWin(state = boardState) {                                                // minor accommodations for detectWin.test.js
    const boardWidth = (state[0].length);
    let normal_diag_win = true;
    let back_diag_win = true;

    for (let i = 0; i < boardWidth; i++) {                                              // single loop, worst case O(n^2)
        if (state[i].every(cell => cell === true)) return true;                         // row check
        if (state.map(row => row[i]).every(cell => cell === true)) return true;         // col check
        if (normal_diag_win && !state[i][i]) normal_diag_win = false;                   // normal diagonal check, skips if diagonal broken
        if (back_diag_win && !state[i][boardWidth - (i + 1)]) back_diag_win = false;    // back diagonal check, skips if diagonal broken
        if (!normal_diag_win && !back_diag_win && i === boardWidth - 1) return false;   // short-circuits loop if diagonal is found
    }

    return normal_diag_win || back_diag_win;
}

function showVictory() {
    document.getElementById("victoryOverlay").classList.remove("hidden");
    freezeBoard();
}
function closeVictoryAndFreeze() {
    document.getElementById("victoryOverlay").classList.add("hidden");
}

function freezeBoard() {
    const cells = document.querySelectorAll('#bingoBoard td');
    cells.forEach(cell => {
        cell.onclick = null;
    });
}

function resetBoard() {
    if (!currentWords.length) return;

    // hide overlay if it’s showing
    document.getElementById("victoryOverlay").classList.add("hidden");
    boardFrozen = false;                         // let cells be clickable again

    generateBingoBoard(
        currentWords,
        currentSize,
        currentBonus,
        currentLayout        // reuse same word layout, no reshuffle
    );
}

function newBoard() {
    document.getElementById("victoryOverlay").classList.add("hidden");
    if (!currentWords.length) return;
    generateBingoBoard(currentWords, currentSize, currentBonus);   // generateBingoBoard reshuffles internally
}

if (typeof window !== "undefined") {
    function getQueryParam(key) {
        const params = new URLSearchParams(window.location.search);
        return params.get(key);
    }

    const presetName = getQueryParam("preset");
    const boardWidth = parseInt(getQueryParam("size")) || 3;

    if (typeof window !== "undefined") {
        const p = new URLSearchParams(window.location.search);
        const key = p.get("preset");
        const size = parseInt(p.get("size"), 10) || 3;
        const bonus = p.get("bonus") === "true";
        const nice = key ? key.charAt(0).toUpperCase() + key.slice(1) : "MeetingBingo";
        document.title = `${nice} Bingo`;
        const header = document.querySelector("h1")
        if (header) header.textContent = `${nice} Bingo`;

        let words = presetLists[key] || JSON.parse(localStorage.getItem(key) || "[]");
        const need = size * size - (bonus ? 1 : 0);

        if (words.length < need) {
            alert("List not found or too small for that board size.");
            location.href = "index.html";
        } else {
            generateBingoBoard(words, size, bonus);
        }
    }
}

// Export for testing
if (typeof module !== "undefined") {
    module.exports = { detectWin };
}