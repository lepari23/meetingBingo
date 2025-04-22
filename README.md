Best to use py to test localStorage:
`python3 -m http.server 5500`

dir structure explained:
/meetingbingo
├── index.html        <-- landing + game page
├── create.html       <-- custom word list entry page
├── css/
│   └── style.css     <-- shared styling
├── js/
│   ├── bingo.js      <-- board generator + logic
│   ├── storage.js    <-- saving/loading custom lists
│   └── create.js     <-- handling word entry page
└── README.md         <-- repo instructions + credits

| Rule | Notes |
|---|---|
| Classic size | 5x5 grid (24 words + "Free" center tile) |
| Minimum "words" | 9 for 3x3, 16 for 4x4, 24 for 5x5 |
| Win Conditions | Complete any horizontal, vertical, or diagonal line |
| Center Tile | Often a Free Space in 5x5 boards (optional for you) |
| Randomization | Cards shuffle word placement every time |
| Multiple Bingos | You can get 2+ Bingos at once, rare but cool |
| Word Repeat | Never repeat the same word on one board |
| Traditional | Numbers (B-I-N-G-O columns) - but this version includes phrases! |


Okay like, 5x5 will have a free tile.
Im not gonna tell you how to play.
Im not gonna give you a little textbox to write down all the buzzwords called.
Im not gonna punish you if you cheat, thats on you, if it makes you happy and feel smart, I can't stop you, do what you want, loser.
You can interpret things how you want, just be consistent if you're playing with others.
Also don't be an asshole to wait-staff, idc about your shitty HR or management.
I take no responsibility if you are caught playing this and there are professional or even legal ramifications, or if you can't take a joke. Just like, get fukt, not my problem, do better in life, not my fault.

Also
The identity of Bingo is formally ambiguous, and it is occasionally suggested that it is the name of the farmer.