function loadSelectedList() {
    const presetName = localStorage.getItem('selectedPreset');
    if (presetName && presetLists[presetName]) {
        return presetLists[presetName];
    }
    return [];
}

function shuffle(array) {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateBingoBoard(words) {
    const boardDiv = document.getElementById('bingoBoard');
    boardDiv.innerHTML = '';

    const shuffled = shuffle(words.slice());
    const selected = shuffled.slice(0, 9); // adjust later for size!

    const table = document.createElement('table');

    let index = 0;
    for (let row = 0; row < 3; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 3; col++) {
            const td = document.createElement('td');

            const span = document.createElement('span');
            span.textContent = selected[index++];
            td.appendChild(span);

            td.onclick = function () {
                const span = td.querySelector('span');
                span.classList.add('struck');
                checkForWin();
            };

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    boardDiv.appendChild(table);
}

function checkForWin() {
    if (detectWin()) { // you'll define detectWin()
        showVictory();
    }
}

function showVictory() {
    document.getElementById('victoryOverlay').style.display = 'block';
    freezeBoard();
}

function closeVictory() {
    document.getElementById('victoryOverlay').style.display = 'none';
}

function freezeBoard() {
    const cells = document.querySelectorAll('#bingoBoard td');
    cells.forEach(cell => {
        cell.onclick = null; // Remove click handlers
    });
}

const selectedWords = loadSelectedList();
if (selectedWords.length > 0) {
    generateBingoBoard(selectedWords);
}