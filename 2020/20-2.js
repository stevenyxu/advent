const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/20.txt`, 'utf8');
const tiles = new Map(input.split('\n\n').map((str) => {
  const [_, id, rest] = str.match(/(\d+):\n([\s\S]*)$/);
  const rows = rest.split('\n');
  return [parseInt(id), rows];
}));

const map = new Map();

tiles.forEach((rows, id) => {
  Object.entries(getEdges(rows)).forEach(([fit, edge]) => {
    if (!map.has(edge)) map.set(edge, []);
    map.get(edge).push({id, fit});
  })
});

// Ran this manually to find the lonely edges for 2099, one of the known corner
// pieces from 20-1. 2099 has a base orientation that puts it in top left of the
// assembled image, so using that as a starting point.
// console.log(Array.from(map).filter(e => e[1].length === 1 && e[1][0].id === '2099'));

// console.log(map);

// Manually computed using a one-off run to fill left to right from 2099.
const width = 12 /* tiles */ * 8 /* per tile */;
const height = 12 /* tiles */ * 8 /* per tile */;
const mosaic = Array(height).fill().map(() => Array(width).fill());

let firstColId = 2099;
let firstColBottom = [];
const l = tiles.get(firstColId)[0].length;

for (let yOffset = 0; yOffset < height; yOffset += 8) {
  let currRows;

  if (yOffset === 0) {
    currId = 2099;
    currRows = tiles.get(currId);
    firstColBottom = currRows[l - 1];
  } else {
    const match = map.get(firstColBottom).find(({id}) => id !== firstColId);
    // console.log('found id', match.id, match.fit);
    const nextRows = tiles.get(match.id);
    // console.log('found pattern');
    // console.log(nextRows.join('\n'));

    let xDir = 1;
    let yDir = 1;
    let rowsFirst = true;

    if (match.fit === 'topR') {
      xDir = -1;
    } else if (match.fit === 'left') {
      rowsFirst = false;
    } else if (match.fit === 'leftR') {
      rowsFirst = false;
      yDir = -1;
    } else if (match.fit === 'right') {
      rowsFirst = false;
      xDir = -1;
    } else if (match.fit === 'rightR') {
      rowsFirst = false;
      xDir = -1;
      yDir = -1;
    } else if (match.fit === 'bottom') {
      yDir = -1;
    } else if (match.fit === 'bottomR') {
      xDir = -1; 
      yDir = -1;
    }

    currId = match.id;
    // console.log(yDir);
    currRows = rotate(nextRows, xDir, yDir, rowsFirst, true);
    // console.log('rotated');
    // console.log(currRows.map(e => e.join('')).join('\n'), xDir, yDir, rowsFirst);
    firstColBottom = currRows[l - 1].join('');
    firstColId = match.id;
  }
  for (let xOffset = 0; xOffset < width; xOffset += 8) {
    // console.log('painting', xOffset, yOffset, currId);
    draw(currRows, xOffset, yOffset);
    const right = currRows.map((r) => r[l - 1]).join('');
    const match = map.get(right).find(({id}) => id !== currId);
    if (!match) {
      continue;
    }
    const nextRows = tiles.get(match.id);
    let xDir = 1;
    let yDir = 1;
    let rowsFirst = true;

    if (match.fit === 'leftR') {
      yDir = -1;
    } else if (match.fit === 'top') {
      rowsFirst = false;
    } else if (match.fit === 'topR') {
      rowsFirst = false
      xDir = -1;
    } else if (match.fit === 'right') {
      xDir = -1;
    } else if (match.fit === 'rightR') {
      xDir = -1;
      yDir = -1;
    } else if (match.fit === 'bottom') {
      yDir = -1;
      rowsFirst = false;
    } else if (match.fit === 'bottomR') {
      yDir = -1;
      xDir = -1;
      rowsFirst = false;
    }

    currId = match.id;
    currRows = rotate(nextRows, xDir, yDir, rowsFirst);
  }
}

function rotate(nextRows, xDir, yDir, rowsFirst) {
  let i = 0;
  let j = 0;
  const lY = nextRows.length;
  const lX = nextRows[0].length;
  const nextRowsRotated =
    Array(rowsFirst ? nextRows.length : nextRows[0].length).fill().map(() => []);
  if (rowsFirst) {
    for (let y = yDir === 1 ? 0 : lY - 1; y >= 0 && y < lY; y += yDir) {
      for (let x = xDir === 1 ? 0 : lX - 1; x >= 0 && x < lX; x += xDir) {
        nextRowsRotated[i][j] = nextRows[y][x];
        j++;
      }
      j = 0;
      i++;
    }
  } else {
    for (let x = xDir === 1 ? 0 : lX - 1; x >= 0 && x < lX; x += xDir) {
      for (let y = yDir === 1 ? 0 : lY - 1; y >= 0 && y < lY; y += yDir) {
        nextRowsRotated[i][j] = nextRows[y][x];
        j++;
      }
      j = 0;
      i++;
    }
  }
  // console.log('nextRows', nextRows.length, nextRows[0].length);
  // console.log(nextRows.join('\n'));
  // console.log('rotated', nextRowsRotated.length, nextRowsRotated[0].length);
  // console.log(nextRowsRotated.map(e => e.join('')).join('\n'));
  return nextRowsRotated;
}

function reverse(str) {
  return str.split('').reverse().join('');
}

function getEdges(rows) {
  const edges = {};
  const last = rows.length - 1;
  edges.top = (rows[0]);
  edges.topR = (reverse(rows[0]));
  edges.bottom = (rows[last]);
  edges.bottomR = (reverse(rows[last]))
  const left = rows.map((r) => r[0]).join('');
  edges.left = (left);
  edges.leftR = (reverse(left));
  const right = rows.map((r) => r[last]).join('');
  edges.right = (right);
  edges.rightR = (reverse(right));
  return edges;
}

function draw(rows, xOffset, yOffset) {
  for (let i = 1; i < rows.length - 1; i++) {
    for (let j = 1; j < rows.length - 1; j++) {
      mosaic[yOffset + i - 1][xOffset + j - 1] = rows[i][j];
    }
  }
}

// console.log(mosaic.map(a => a.join('')).join('\n'));

const mT = fs.readFileSync(`${__dirname}/20-monster.txt`, 'utf8').split('\n');

let monsterCount = 0;

function findMonsters(monster) {
  for (let i = 0; i < mosaic.length - monster.length; i++) {
    for (let j = 0; j < mosaic[0].length - monster[0].length; j++) {
      if (matchMonster(monster, i, j)) {
        monsterCount++;
      }
    }
  }
}

findMonsters(rotate(mT, 1, 1, false));
findMonsters(rotate(mT, -1, 1, false));
findMonsters(rotate(mT, 1, -1, false));
findMonsters(rotate(mT, -1, -1, false));
findMonsters(rotate(mT, 1, 1, true));
findMonsters(rotate(mT, -1, 1, true));
findMonsters(rotate(mT, 1, -1, true));
findMonsters(rotate(mT, -1, -1, true));

let pounds = 0;
mosaic.forEach((row) => {
  row.forEach((cell) => {
    if (cell === '#') pounds++;
  });
})

console.log(pounds - monsterCount * 15);

function matchMonster(monster, i, j) {
  for (let mI = 0; mI < monster.length; mI++) {
    for (let mJ = 0; mJ < monster[0].length; mJ++) {
      if (monster[mI][mJ] === '#' && mosaic[i + mI][j + mJ] !== '#') {
        return false;
      }
    }
  }
  return true;
}