const fs = require('fs');
// const input = fs.readFileSync('6.txt', 'utf8');
const input = `3,4,3,1,2`;
const fish = input.trim().split(',').map(Number);

for (let day = 1; day <= 80; day++) {
  for (let i = 0; i < fish.length; i++) {
    const current = fish[i];
    if (current === 0) {
      fish[i] = 6;
      fish.push(9);
    } else {
      fish[i] -= 1;
    }
  }
}

console.log(fish.length);

/**
 * A fish that spawns at t-i results in fishByEnd[i] fish at t.
 */
const fishByEnd = [1];
for (let i = 1; i < 256; i++) {
  let c = 1;
  c += fishByEnd[i - 1];
}
