function startGame(listName) {
    const size = document.getElementById('boardSize').value;
    window.location.href = `play.html?preset=${encodeURIComponent(listName)}&size=${size}`;
}