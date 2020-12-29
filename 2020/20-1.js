const input = require('fs').readFileSync(`${__dirname}/20.txt`, 'utf8');
const tiles = input.split('\n\n').map((str) => {
  const [_, id, rest] = str.match(/(\d+):\n([\s\S]*)$/);
  const rows = rest.split('\n');
  return {id, rows};
});

const map = new Map();

tiles.forEach((tile) => {
  getEdges(tile.rows).forEach((edge) => {
    if (!map.has(edge)) map.set(edge, []);
    map.get(edge).push(tile);
  })
});

const lonelyEdges = new Map();

map.forEach((v, k) => {
  if (v.length === 2) return;
  const found = lonelyEdges.get(v[0].id) || 0;
  lonelyEdges.set(v[0].id, found + 1);
})

const lonelyTiles = new Set();

lonelyEdges.forEach((v, k) => {
  if (v === 4) {
    lonelyTiles.add(k);
  }
})

console.log(Array.from(lonelyTiles).reduce((acc, v) => acc * v, 1));

function reverse(str) {
  return str.split('').reverse().join('');
}

function getEdges(rows) {
  const edges = [];
  const last = rows.length - 1;
  edges.push(rows[0]);
  edges.push(reverse(rows[0]));
  edges.push(rows[last]);
  edges.push(reverse(rows[last]))
  const left = rows.map((r) => r[0]).join('');
  edges.push(left);
  edges.push(reverse(left));
  const right = rows.map((r) => r[last]).join('');
  edges.push(right);
  edges.push(reverse(right));
  return edges;
}