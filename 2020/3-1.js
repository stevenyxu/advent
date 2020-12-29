const input = require('fs').readFileSync(`${__dirname}/3.txt`, 'utf8');
const rows = input.split('\n');
const width = rows[0].length;
let trees = 0;
let column = 3;
for (let i = 1; i < rows.length; i++) {
  if (rows[i][column] === '#') {
    trees++;
  }
  column = (column + 3) % width;
}
console.log(trees);