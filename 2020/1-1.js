const input = require('fs').readFileSync(`${__dirname}/1.txt`, 'utf8');
const nums = input.split('\n').map(n => parseInt(n, 10));
const s = new Set();
for (let i = 0; i < nums.length; i++) {
  if (s.has(nums[i])) {
    console.log(nums[i] * 2020 - nums[i]);
    break;
  }
  s.add(2020 - nums[i]);
}