# Buzzword Bingo (not for meetings)

A basic, private browser bingo for adding a secret edge (of mild bemusement) to meetings, stand-ups, wine tastings, birthday parties, family dinners, chats with estate agents... doing taxes? Uhh Idk anymore... Just give it a try yes? 🙂

No servers, no tracking — everything runs 100% client-side.

## Live demo

**<https://lepari23.github.io/meetingbingo>**


## Quick start (dev)

```bash
git clone https://github.com/lepari23/meetingBingo.git
cd meetingbingo
python3 -m http.server 5500
```
Then open <http://localhost:5500> in your browser.

## What you can do

|Feature| Where |
|--|--|
|Play built-in lists (Tech / Management / Marketing / Wine) | js/presetLists.js|
|Create / edit your own lists | Manage custom word lists button|
|Import / export lists (JSON) | same page|
|Test your own solutions to detectWin| Idk, maybe try the file called detectWin.test.js?...Why am I even writing this |


## 📂 Project structure:
```
/meetingbingo
.
├── LICENSE                     <-- open source but like, be cool about it
├── README.md                   <-- no clue what this is
├── css
│   └── style.css
├── images
│   ├── favicon.png
│   └── victory.gif
├── js
│   ├── presetLists.js          <-- default bingo lists
│   ├── create.js               <-- manage, upload, download lists
│   ├── detectWin.test.js       <-- basic tests for win detection
│   ├── index.js                <-- this is where the magic happens, well no but...
│   └── play.js                 <-- game logic
├── index.html                  <-- landing page & main menu
├── create.html                 <-- manage customs lists
└── play.html                   <-- game page
```

## Contributing

Got a killer buzzword or new category idea?
PRs to add witty, high-quality entries to presetLists.js are welcome.
Please try to keep each list fun but sensible — no generic filler please.

Found a bug? Got an idea?
👉 Open an issue!

## ⚠️ Disclaimer

This project is intended for entertainment only.
The author accepts no responsibility for:
* HR emails
* Legal or financial damages
* Managerial glare
* Existential crises
* Accidental enlightenment

Use Buzzword Bingo responsibly. Or don’t. I’m not your boss.