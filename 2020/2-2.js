const input = require('fs').readFileSync(`${__dirname}/2.txt`, 'utf8');
let numValid = 0;

const rows = input.split('\n');
rows.forEach((row) => {
  const [_, leftS, rightS, letter, pass] = row.match(/(\d+)-(\d+) ([a-z]): ([a-z]*)/);
  const left = parseInt(leftS, 10) - 1;
  const right = parseInt(rightS, 10) - 1;

  let valid;
  if (pass[left] === letter) {
    valid = pass[right] !== letter;
  } else {
    valid = pass[right] === letter;
  }

  if (valid) numValid++;

  console.log(row, valid);
})

console.log(numValid);