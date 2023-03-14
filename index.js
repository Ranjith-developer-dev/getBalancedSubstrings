const express = require("express");
require("dotenv").config();
const { Router } = require("express");

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";

app.use(express.json());

function getBalancedSubstrings(S) {
    const result = [];

    // loop through all substrings
    for (let i = 0; i < S.length; i++) {
        for (let j = i + 1; j < S.length; j++) {
            const substring = S.substring(i, j + 1);
            const uniqueChars = [...new Set(substring)];

            // check if substring is balanced
            if (uniqueChars.length === 2) {
                const counts = {};
                for (let char of substring) {
                    counts[char] = (counts[char] || 0) + 1;
                }
                if (Object.values(counts).every((count) => count === counts[substring[0]])) {
                    result.push(substring);
                }
            }
        }
    }

    // find longest balanced substrings
    let maxLength = 0;
    for (let substring of result) {
        if (substring.length > maxLength) {
            maxLength = substring.length;
        }
    }
    return result.filter((substring) => substring.length === maxLength);
}

// const test = getBalancedSubstrings("abababa");

rl.question("Enter a string: ", (inputString) => {
    const test = getBalancedSubstrings(inputString);
    console.log(test);
    rl.close();
});


app.listen(port, () => {
});
