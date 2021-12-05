const fs = require('fs');
const input = fs.readFileSync('3.txt', 'utf8');
const readings = input.trim().split('\n').map(line => parseInt(line, 2));
const l = readings.length;

const BITS = 12;

let g = 0;
let e = 0;

for (let offset = 0; offset < BITS; offset++) {
  let ones = 0;
  const t = 1 << offset;
  for (const reading of readings) {
    if (reading & t) {
      ones++;
    }
  }
  if (ones > l / 2) {
    g |= t;
  } else {
    e |= t;
  }
}

console.log(g*e);

let oc = [...readings];
for (let offset = BITS - 1; offset >= 0 && oc.length > 1; offset--) {
  console.log(offset, oc.length);
  const t = 1 << offset;
  const ones = oc.filter(reading => reading & t);
  const zeroes = oc.filter(reading => !(reading & t));
  oc = ones.length >= zeroes.length ? ones : zeroes;
}

let cc = [...readings];
for (let offset = BITS - 1; offset >= 0 && cc.length > 1; offset--) {
  console.log(offset, cc.length);
  const t = 1 << offset;
  const ones = cc.filter(reading => reading & t);
  const zeroes = cc.filter(reading => !(reading & t));
  cc = zeroes.length <= ones.length ? zeroes : ones;
}

console.log(oc[0] * cc[0])
