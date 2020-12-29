const input = require('fs').readFileSync(`${__dirname}/10.txt`, 'utf8');
const rows = input.split('\n');
const adapters = rows.map((row) => parseInt(row, 10)).sort((a, b) => a - b);

console.log(adapters);

let one = 0;
let three = 1;

let curr = 0;

adapters.forEach((adapter) => {
  const diff = adapter - curr;
  if (diff === 1) one++;
  if (diff === 3) three++;
  curr = adapter;
})

console.log(one, three);
console.log(one * three);