/* --------------  CONFIG  -------------------------------------------- */
const RESERVED_KEYS = [
  "meetingBingoDisclaimerAccepted", // disclaimer flag
];
const BUILT_INS = ["tech", "management", "marketing", "wine"];

/* --------------  STATE  --------------------------------------------- */
let customWords = [];

/* --------------  HELPERS  ------------------------------------------- */
function isUserListKey(k) {
  return !RESERVED_KEYS.includes(k) && !BUILT_INS.includes(k);
}

/* --------------  WORD ENTRY  ---------------------------------------- */
function addWord() {
  const input = document.getElementById("wordInput");
  const word = input.value.trim();
  if (word) {
    customWords.push(word);
    updateWordListDisplay();
    input.value = "";
    input.focus();
  }
}
document.getElementById("wordInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addWord();
  }
});

/* --------------  SAVE / CLEAR  -------------------------------------- */
function saveNewList() {
  const name = document.getElementById("newListName").value.trim();
  if (!name) {
    alert("Give your list a name.");
    return;
  }
  if (customWords.length < 9) {
    alert("Need at least 9 words for a 3×3 board.");
    return;
  }

  localStorage.setItem(name, JSON.stringify(customWords));
  location.href = "index.html";
}

function clearInputs() {
  customWords = [];
  document.getElementById("wordList").innerHTML = "";
  document.getElementById("newListName").value = "";
}

/* --------------  LIST PANEL  ---------------------------------------- */
function listSavedLists() {
  const box = document.getElementById("savedLists");
  box.innerHTML = "";

  Object.keys(localStorage)
    .filter(isUserListKey)
    .forEach((key) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <span>${key}</span>
        <button onclick="loadList('${key}')">Load</button>
        <br><br>
        <button onclick="deleteList('${key}')">Delete</button>
        <br><br>`;
      box.appendChild(div);
    });
}

function loadList(name) {
  const data = localStorage.getItem(name);
  if (!data) return;
  customWords = JSON.parse(data);
  document.getElementById("newListName").value = name;
  updateWordListDisplay();
}

function deleteList(name) {
  if (confirm(`Delete the list “${name}”?`)) {
    localStorage.removeItem(name);
    listSavedLists();
    refreshDownloadSelect();
  }
}

/* --------------  WORD UL RENDER  ------------------------------------ */
function updateWordListDisplay() {
  const ul = document.getElementById("wordList");
  ul.innerHTML = "";
  customWords.forEach((w, i) => {
    const li = document.createElement("li");
    li.textContent = w;
    li.onclick = () => {
      // inline edit on click
      const inp = document.createElement("input");
      inp.value = w;
      inp.onblur = commit;
      inp.onkeydown = (e) => {
        if (e.key === "Enter") commit();
      };
      li.innerHTML = "";
      li.appendChild(inp);
      inp.focus();

      function commit() {
        customWords[i] = inp.value.trim();
        updateWordListDisplay();
      }
    };
    ul.appendChild(li);
  });
}

/* --------------  DOWNLOAD SELECT  ----------------------------------- */
function refreshDownloadSelect() {
  const sel = document.getElementById("downloadSelect");
  sel.innerHTML =
    '<option value="" disabled selected>Select list to download</option>';

  Object.keys(localStorage)
    .filter(isUserListKey)
    .forEach((k) => {
      const o = document.createElement("option");
      o.value = k;
      o.textContent = k;
      sel.appendChild(o);
    });
}
function downloadList() {
  const key = document.getElementById("downloadSelect").value;
  if (!key) {
    alert("Choose a list first.");
    return;
  }
  const data = localStorage.getItem(key);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: `${key}.json`,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* --------------  UPLOAD  -------------------------------------------- */
document.getElementById("uploadFile").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const arr = JSON.parse(reader.result);
      if (!Array.isArray(arr) || arr.some((x) => typeof x !== "string"))
        throw new Error();
      let key = file.name.replace(/\.json$/i, "") || "imported_list";
      let n = 1;
      while (localStorage.getItem(key)) key = `${key}_${n++}`;
      localStorage.setItem(key, JSON.stringify(arr));
      alert(`Imported “${key}” (${arr.length} words).`);
      listSavedLists();
      refreshDownloadSelect();
    } catch {
      alert("Invalid JSON; must be an array of strings.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

/* --------------  INIT  ------------------------------------------------ */
listSavedLists();
refreshDownloadSelect();
