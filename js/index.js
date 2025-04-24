document.addEventListener("DOMContentLoaded", function () {
    const allowed = ["3", "5", "7"];
    const boardSizeSelect = document.getElementById('boardSize');
    const bonusWrapper = document.getElementById('bonusWrapper');
    const bonusCheckbox = document.getElementById('bonusSquare');
    const customListContainer = document.getElementById('customListButtons');

    // Show/hide bonus checkbox
    boardSizeSelect.addEventListener('change', function () {
        const selected = this.value;

        if (allowed.includes(selected)) {
            bonusWrapper.style.display = "block";
        } else {
            bonusWrapper.style.display = "none";
            bonusCheckbox.checked = false;
        }
    });

    // Force run on load
    boardSizeSelect.dispatchEvent(new Event('change'));

    // Add custom list buttons
    const builtIn = ["tech", "management", "marketing", "wine"];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!builtIn.includes(key)) {
            const btn = document.createElement("button");
            btn.textContent = `${key} Bingo`;
            btn.onclick = () => startGame(key);
            customListContainer.appendChild(btn);
            customListContainer.appendChild(document.createElement("br"));
            customListContainer.appendChild(document.createElement("br"));
        }
    }
});

function startGame(listName) {
    const sizeValue = document.getElementById("boardSize").value;
    if (!sizeValue) {
        alert("Pick a board size first 🙂");
        return;
    }

    const size = parseInt(sizeValue, 10);
    const bonus = document.getElementById("bonusSquare").checked;
    const need = size * size - (bonus ? 1 : 0);           // centre “free” costs 1

    const builtIn = ["tech", "management", "marketing", "wine"];
    let words = [];

    if (builtIn.includes(listName)) {
        words = presetLists[listName];
    } else {
        const stored = localStorage.getItem(listName);
        if (stored) words = JSON.parse(stored);
    }

    if (words.length < need) {
        alert(
            `"${listName}" only has ${words.length} items.\n` +
            `Need at least ${need} for a ${size}×${size} board` +
            (bonus ? " with a bonus square." : ".")
        );
        return;
    }

    const bonusParam = bonus ? "true" : "false";
    window.location.href =
        `play.html?preset=${encodeURIComponent(listName)}&size=${size}&bonus=${bonusParam}`;
}

// ---------- populate <select> with custom (non-built-in) bingo lists -------------
document.addEventListener("DOMContentLoaded", () => {
    const builtIn = ["tech", "management", "marketing", "wine"];
    const dlSel = document.getElementById("downloadSelect");

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!builtIn.includes(key)) {
            const opt = document.createElement("option");
            opt.value = key;
            opt.text = key;
            dlSel.appendChild(opt);
        }
    }
});