const input = require('fs').readFileSync(`${__dirname}/4.txt`, 'utf8');
const passports = input.split('\n\n');

let valid = 0;

passports.forEach((passport) => {
  const required = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
  const fields = passport.split(/:[^\s]+\s*/);
  fields.forEach((f) => {
    required.delete(f);
  })
  if (required.size === 0) {
    valid++;
  }
});

console.log(valid);