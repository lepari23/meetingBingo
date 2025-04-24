let customWords = [];

function addWord() {
    const input = document.getElementById('wordInput');
    const word = input.value.trim();
    console.log(word);
    if (word.length > 0) {
        customWords.push(word);
        updateWordListDisplay();
        input.value = ''; // clear input
        input.focus();
    }
}

const input = document.getElementById('wordInput');

// Listen for key presses on the input field
input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Optional: prevents weird form submission or refresh
        addWord();
    }
});


function saveNewList() {
    const newListName = document.getElementById('newListName').value.trim();
    console.log(newListName);
    if (customWords.length >= 9) { // minimum for 3x3 bingo
        localStorage.setItem(newListName, JSON.stringify(customWords));
        window.location.href = 'index.html'; // redirect to play
    } else {
        alert('Please add at least 9 words for a playable list');
    }
    refreshDownloadSelect();
}

function clearInputs() {
    customWords = [];
    document.getElementById('wordList').innerHTML = ''; // Clear old list
    document.getElementById('newListName').value = ''; // Clear list name
}

function listSavedLists() {
    const savedListsDiv = document.getElementById('savedLists');
    savedListsDiv.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <span>${key}</span>
            <button onclick="loadList('${key}')">Load</button>
            <button onclick="deleteList('${key}')">Delete</button>
        `;
        savedListsDiv.appendChild(listItem);
    }
}

function loadList(listName) {
    const saved = localStorage.getItem(listName);
    if (saved) {
        customWords = JSON.parse(saved);
        document.getElementById('newListName').value = listName;
        updateWordListDisplay();
    }
}

function updateWordListDisplay() {
    const list = document.getElementById('wordList');
    list.innerHTML = '';

    customWords.forEach((word, index) => {
        const li = document.createElement('li');

        // Start with showing the word
        li.textContent = word;

        // When clicking the word, allow editing
        li.onclick = function () {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = word;

            // When the input loses focus (click outside)
            input.onblur = function () {
                customWords[index] = input.value.trim();
                updateWordListDisplay();
            };

            // When user presses Enter inside input
            input.onkeydown = function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault(); // prevents accidental form submission
                    customWords[index] = input.value.trim();
                    updateWordListDisplay();
                }
            };

            // Replace the <li> contents with the input box
            li.innerHTML = '';
            li.appendChild(input);
            input.focus();
        };

        list.appendChild(li);
    });
}

function deleteList(listName) {
    if (confirm(`Delete the list "${listName}"?`)) {
        localStorage.removeItem(listName);
        listSavedLists(); // Refresh list display
    }
    refreshDownloadSelect();
}

function refreshDownloadSelect() {
    const builtIn = ["tech", "management", "marketing", "wine"];
    const dlSel = document.getElementById("downloadSelect");
    if (!dlSel) return;

    dlSel.innerHTML =
        '<option value="" disabled selected>Select custom list to download</option>';

    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!builtIn.includes(k)) {
            const opt = document.createElement("option");
            opt.value = k;
            opt.text = k;
            dlSel.appendChild(opt);
        }
    }
}

function downloadList() {
    const key = document.getElementById("downloadSelect").value;
    if (!key) { alert("Choose a list first."); return; }
    const data = localStorage.getItem(key);
    if (!data) { alert("List not found."); return; }

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url; a.download = `${key}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
}

document.getElementById("uploadFile").addEventListener("change", evt => {
    const file = evt.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        try {
            const words = JSON.parse(reader.result);
            if (!Array.isArray(words) || words.some(w => typeof w !== "string")) {
                alert("JSON must be an array of strings."); return;
            }

            // default key = filename (no .json), make unique
            let key = file.name.replace(/\.json$/i, "");
            let n = 1;
            while (localStorage.getItem(key)) key = `${file.name.replace(/\.json$/i, "")}_${n++}`;

            localStorage.setItem(key, JSON.stringify(words));
            alert(`List "${key}" imported (${words.length} items).`);

            listSavedLists();       // refresh left pane
            refreshDownloadSelect();// refresh download selector
        } catch (e) {
            alert("Invalid JSON file.");
        }
    };
    reader.readAsText(file);
    evt.target.value = "";          // allow same file again later
});

listSavedLists();
refreshDownloadSelect(); 