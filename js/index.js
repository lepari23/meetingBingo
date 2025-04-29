const RESERVED_KEYS = ["meetingBingoDisclaimerAccepted"];
const BUILT_INS = Object.keys(presetLists);

document.addEventListener("DOMContentLoaded", () => {
  /* ────────────── disclaimer ────────────── */
  const consentKey = RESERVED_KEYS[0];
  const modal = document.getElementById("disclaimerModal");

  if (localStorage.getItem(consentKey) === "true") {
    modal.style.display = "none";
  } else {
    document.getElementById("acceptBtn").onclick = () => {
      localStorage.setItem(consentKey, "true");
      modal.style.display = "none";
    };
    document.getElementById("declineBtn").onclick = () => {
      location.href = "https://zoomquilt.org";
    };
  }

  /* ────────────── setup UI ────────────── */
  const boardSizeSel = document.getElementById("boardSize");
  const bonusWrap = document.getElementById("bonusWrapper");
  const bonusCheckbox = document.getElementById("bonusSquare");
  const presetGrid = document.getElementById("presetButtons");
  const customGrid = document.getElementById("customListButtons");

  boardSizeSel.addEventListener("change", () => {
    const show = ["3", "5", "7"].includes(boardSizeSel.value);
    bonusWrap.style.visibility = show ? "visible" : "hidden";
    if (!show) bonusCheckbox.checked = false;
  });
  boardSizeSel.dispatchEvent(new Event("change"));

  BUILT_INS.forEach((key) =>
    presetGrid.appendChild(makeBtn(`${cap(key)} Bingo`, () => startGame(key)))
  );

  let firstCustom = true;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (isUserListKey(key)) {
      if (firstCustom) {
        customGrid.appendChild(document.createElement("br"));
        firstCustom = false;
      }
      customGrid.appendChild(
        makeBtn(`${key} Bingo`, () => startGame(key), true)
      );
    }
  }
});

/* ------------------------------------------------------------------ */
/*  utility helpers                                                   */
/* ------------------------------------------------------------------ */
function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function makeBtn(label, onclickFn, isCustom = false) {
  const btn = document.createElement("button");
  btn.className = "bingo-btn" + (isCustom ? " custom" : "");
  btn.textContent = label;
  btn.onclick = onclickFn;
  return btn;
}

function isUserListKey(key) {
  return !RESERVED_KEYS.includes(key) && !BUILT_INS.includes(key);
}

/* ------------------------------------------------------------------ */
/*  startGame logic                                                   */
/* ------------------------------------------------------------------ */
function startGame(listName) {
  const size = +document.getElementById("boardSize").value;
  const bonus = document.getElementById("bonusSquare").checked;

  const words =
    presetLists[listName] ?? JSON.parse(localStorage.getItem(listName) || "[]");
  const need = size * size - (bonus ? 1 : 0);

  if (words.length < need) {
    alert(
      `"${listName}" has only ${words.length} items; need ${need} for a ${size}x${size}.`
    );
    return;
  }

  location.href = `play.html?preset=${encodeURIComponent(
    listName
  )}&size=${size}&bonus=${bonus}`;
}
