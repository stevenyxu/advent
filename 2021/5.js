const fs = require('fs');
const input = fs.readFileSync('5.txt', 'utf8');
const lines = input.trim().split('\n').map(line => line.split(' -> ').map(coordinate => coordinate.split(',').map(c => parseInt(c))));

const field = Array(1000).fill(0).map(() => Array(1000).fill(0));
for (const [[x1, y1], [x2, y2]] of lines) {
  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      field[x1][y] += 1;
    }
  } else if (y1 === y2){
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      field[x][y1] += 1;
    }
  } else {
    const xd = x2 - x1 > 0 ? 1 : -1;
    const yd = y2 - y1 > 0 ? 1 : -1;
    let x = x1;
    let y = y1;
    while (x !== x2) {
      field[x][y] += 1;
      x += xd;
      y += yd;
    }
    field[x][y] += 1;
  }
}

let i = 0;
for (const row of field) {
  for (const cell of row) {
    if (cell >= 2) {
      i += 1;
    }
  }
}

console.log(i);
