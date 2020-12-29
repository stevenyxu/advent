const input = require('fs').readFileSync(`${__dirname}/1.txt`, 'utf8');
const nums = input.split('\n').map(n => parseInt(n, 10)).sort((a,b) => a-b);
const s = new Set();

for (let i = 0; i < nums.length - 2; i++) {
  let left = i + 1;
  let right = nums.length - 1;
  while(left < right) {
    const sum = nums[i] + nums[left] + nums[right];
    //console.log(sum);
    if (sum === 2020) {
      console.log(nums[i] * nums[left] * nums[right]);
      break;
    }
    if (sum > 2020) right--;
    if (sum < 2020) left++;
  }
}
