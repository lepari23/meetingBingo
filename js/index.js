function startGame(listName) {
    localStorage.setItem('selectedPreset', listName);
    window.location.href = 'play.html';
}