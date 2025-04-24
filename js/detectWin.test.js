const { detectWin } = require("./play.js");

no_win = [
    [false, false,  false,  false,  false],
    [false, false,  false,  false,  false],
    [false, false,  false,  false,  false],
    [false, false,  false,  false,  false],
    [false, false,  false,  false,  false]
];

hori_win_1 = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true,  true,   true,   true,   true],
    [false, false, false, false, false]
];

hori_win_2 = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true,  true,   true,   true,   true]
];

hori_win_3 = [
    [true,  true,   true,   true,   true],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false]
];

verti_win_1 = [
    [false, false, false, true, false],
    [false, false, false, true, false],
    [false, false, false, true, false],
    [false, false, false, true, false],
    [false, false, false, true, false]
];

verti_win_2 = [
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false],
    [true, false, false, false, false]
];

verti_win_3 = [
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true],
    [false, false, false, false, true]
];

normal_diag_win_1 = [
    [true, false,  false,  false,  false],
    [false, true,  false,  false,  false],
    [false, false,  true,  false,  false],
    [false, false,  false,  true,  false],
    [false, false,  false,  false,  true]
];

back_diag_win_1 = [
    [false, false,  false,  false,  true],
    [false, false,  false,  true,  false],
    [false, false,  true,  false,  false],
    [false, true,  false,  false,  false],
    [true, false,  false,  false,  false]
];

double_win_1 = [
    [true, false,  false,  false,  false],
    [true, true,  false,  false,  false],
    [true, false,  true,  false,  false],
    [true, false,  false,  true,  false],
    [true, false,  false,  false,  true]
];

const testCases = [
    { name: "no_win", board: no_win, expected: false },
    { name: "hori_win_1", board: hori_win_1, expected: true },
    { name: "hori_win_2", board: hori_win_2, expected: true },
    { name: "hori_win_3", board: hori_win_3, expected: true },
    { name: "verti_win_1", board: verti_win_1, expected: true },
    { name: "verti_win_2", board: verti_win_2, expected: true },
    { name: "verti_win_3", board: verti_win_3, expected: true },
    { name: "normal_diag_win_1", board: normal_diag_win_1, expected: true },
    { name: "back_diag_win_1", board: back_diag_win_1, expected: true },
    { name: "double_win_1", board: double_win_1, expected: true }
];

let passed = 0;
let failed = 0;
const failedTests = [];

testCases.forEach(({ name, board, expected }) => {
    const result = detectWin(board);
    const pass = result === expected;

    console.log(`\n🧪 Test: ${name.padEnd(20)} ${pass ? "✅ PASS" : "❌ FAIL"}`);
    console.log("Board:");
    board.forEach(row => {
        console.log(row.map(cell => (cell ? "🟩" : "⬜️")).join(" "));
    });

    if (!pass) {
        console.error(`Expected: ${expected}, Got: ${result}`);
        failedTests.push(name);
        failed++;
    } else {
        passed++;
    }

    console.log("-".repeat(40));
});

// Summary
console.log("\n🧾 Test Summary:");
console.log(`✅ Passed: ${passed}/${testCases.length}`);
console.log(`❌ Failed: ${failed}`);

if (failed > 0) {
    console.log("\n🚨 Failed Tests:");
    failedTests.forEach(name => console.log(` - ${name}`));
} else {
    console.log("🎉 No failures! All tests passed.");
}