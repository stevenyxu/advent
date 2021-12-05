const fs = require('fs');

const input = fs.readFileSync('1.txt', 'utf8');
const depths = input.split('\n').map(line => parseInt(line));

let increases = 0;
for (let i = 0; i < depths.length - 1; i++) {
  if (depths[i+1] > depths[i]) {
    increases++;
  }
}

console.log(increases);

let windowIncreases = 0;
for (let i = 0; i < depths.length - 3; i++) {
  if (depths[i+3] > depths[i]) {
    windowIncreases++;
  }
}

console.log(windowIncreases);
