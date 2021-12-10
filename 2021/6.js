const fs = require('fs');
const input = fs.readFileSync('6.txt', 'utf8');
// const input = `3,4,3,1,2`;
const fish = input.trim().split(',').map(Number);

const fish1 = [...fish];
for (let day = 1; day <= 80; day++) {
  for (let i = 0; i < fish1.length; i++) {
    const current = fish1[i];
    if (current === 0) {
      fish1[i] = 6;
      fish1.push(9);
    } else {
      fish1[i] -= 1;
    }
  }
}

console.log(fish1.length);

/**
 * A fish that spawns at i results in fishByEnd[i] fish at t=T.
 */
const fishByEnd = [];
const T = 256;
for (let i = T; i >= -8; i--) {
  fishByEnd[i] = 1;
  if (i + 9 <= T) {
    fishByEnd[i] += fishByEnd[i + 9];
  }
  for (let j = i + 9 + 7; j <= T; j += 7) {
    fishByEnd[i] += fishByEnd[j];
  }
}

console.log(fishByEnd);

let total = 0;
for (const f of fish) {
  total += fishByEnd[f-8];
}

console.log(total);
