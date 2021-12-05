const fs = require('fs');
const input = fs.readFileSync('2.txt', 'utf8');
const actions = input.split('\n').map(line => line.split(' ')).map(([action, delta]) => ({action, delta: parseInt(delta)}));

let h = 0;
let d = 0;

for(const {action, delta} of actions) {
  switch(action) {
    case 'forward':
      h += delta;
      break;
    case 'down':
      d += delta;
      break;
    case 'up':
      d -= delta;
      break;
    default:
      break;
  }
}

console.log(h, d, h*d);

h = 0;
d = 0;
aim = 0;
for(const {action, delta} of actions) {
  switch(action) {
    case 'forward':
      h += delta;
      d += delta * aim
      break;
    case 'down':
      aim += delta;
      break;
    case 'up':
      aim -= delta;
      break;
    default:
      break;
  }
}

console.log(h, d, h*d);
