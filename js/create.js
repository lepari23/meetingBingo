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
}

listSavedLists();