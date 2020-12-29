const input = require('fs').readFileSync(`${__dirname}/4.txt`, 'utf8');
const passports = input.split('\n\n');

let valid = 0;

passports.forEach((passport) => {
  const required = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
  const fields = passport.split(/\s/);
  fields.forEach((field) => {
    const [k, v] = field.split(':');
    const vInt = parseInt(v, 10);
    if (k === 'byr') {
      if (vInt < 1920 || vInt > 2002) return;
    } else if (k === 'iyr') {
      if (vInt < 2010 || vInt > 2020) return;
    } else if (k === 'eyr') {
      if (vInt < 2020 || vInt > 2030) return;
    } else if (k === 'hgt') {
      const match = v.match(/^(\d+)(cm|in)$/);
      if (!match) return;
      const hgtInt = parseInt(match[1], 10);
      if (match[2] === 'cm') {
        if (hgtInt < 150 || hgtInt > 193) return;
      } else if (match[2] === 'in') {
        if (hgtInt < 59 || hgtInt > 76) return;
      } else {
        return;
      }
    } else if (k === 'hcl') {
      if (v.match(/^#[0-9a-f]{6}$/) === null) return;
    } else if (k === 'ecl') {
      if (v.match(/^amb|blu|brn|gry|grn|hzl|oth$/) === null) return;
    } else if (k === 'pid') {
      if (v.match(/^[0-9]{9}$/) === null) return;
    }
    required.delete(k);
  });
  if (required.size === 0) valid++;
});

console.log(valid);