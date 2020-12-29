const input = require('fs').readFileSync(`${__dirname}/3.txt`, 'utf8');
const rows = input.split('\n');
const width = rows[0].length;

const slopes = [[1,1], [3,1], [5,1], [7,1], [1,2]];

const slopeTrees = slopes.map(([right, down]) => {
  let trees = 0;
  let row = down;
  let column = right;
  while (row < rows.length) {
    if (rows[row][column] === '#') {
      trees++;
    }
    row += down;
    column = (column + right) % width;
  }
  console.log(trees);
  return trees;
});

console.log(slopeTrees.reduce((acc, i) => acc * i, 1));