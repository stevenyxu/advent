const input = require('fs').readFileSync(`${__dirname}/2.txt`, 'utf8');
let numValid = 0;

const rows = input.split('\n');
rows.forEach((row) => {
  const [_, minS, maxS, letter, pass] = row.match(/(\d+)-(\d+) ([a-z]): ([a-z]*)/);
  const min = parseInt(minS, 10);
  const max = parseInt(maxS, 10);
  let count = 0;
  for (let i = 0; i < pass.length; i++) {
    if (pass[i] === letter) {
      count++;
    }
  }
  if (count >= min && count <= max) {
    numValid++;
  }
})

console.log(numValid);