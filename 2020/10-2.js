const input = require('fs').readFileSync(`${__dirname}/10.txt`, 'utf8');
const rows = input.split('\n');

const adapters = rows.map((row) => parseInt(row, 10)).sort((a, b) => a - b);
const ways = new Map();

ways.set(0, 1);

adapters.forEach((adapter) => {
  const total = 
      (ways.get(adapter - 3) || 0) +
      (ways.get(adapter - 2) || 0) +
      (ways.get(adapter - 1) || 0);
  ways.set(adapter, total);
});

console.log(ways.get(adapters[adapters.length - 1]));