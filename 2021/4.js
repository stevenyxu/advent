const fs = require('fs');
const input = fs.readFileSync('4.txt', 'utf8');
const [numStr, ...boardStrs] = input.trim().split('\n\n');

const nums = numStr.split(',').map(n => parseInt(n));
const boards = new Set(boardStrs.map(s => ({mask: 0, board: s.trim().split(/\s+/).map(n => parseInt(n))})));

function win(mask) {
  let rowScan = 0b11111;
  for (let i = 0; i < 5; i++) {
    if ((rowScan & mask) === rowScan) {
      return true;
    }
    rowScan <<= 5;
  }

  let colScan = 0b0000100001000010000100001;
  for (let i = 0; i < 5; i++) {
    if ((colScan & mask) === colScan) {
      return true;
    }
    colScan <<= 1;
  }

  return false;
}

console.log(win(0b0000011111000000000011111));
console.log(win(0b0000011111000000000000000));
console.log(win(0b0100011011010000100001000));
console.log(win(0b1000010000100001000010000));
console.log(win(0b0000100001000010000100001));
console.log(win(0b1111100000000000000000000));
console.log(win(0b0000000000000000000011111));

function apply(mask, board, num) {
  for (let i = 0; i < 25; i++) {
    if (num === board[i]) {
      mask |= 1 << i;
    }
  }

  return mask;
}

function unmarkedSum(mask, board) {
  let sum = 0;
  for (let i = 0; i < 25; i++) {
    if ((mask & (1 << i)) === 0) {
      sum += board[i];
    }
  }
  return sum;
}

function render(board) {
  let s = '';
  for (let i = 0; i < 25; i++) {
    const t = 1 << i;
    if ((board.mask & t) === t) {
      s = `${s} {${board.board[i]}} `;
    } else {
      s = `${s}  ${board.board[i]}  `;
    }
    if (i % 5 === 4) {
      s += '\n';
    }
  }
  console.log(s);
}

function go() {
  let firstWin = 0;
  let lastWin = 0;
  for (const num of nums) {
    console.log(num, boards.size);
    for (const board of boards) {
      board.mask = apply(board.mask, board.board, num);
      if (win(board.mask)) {
        render(board);
        if (firstWin === 0) {
          firstWin = num * unmarkedSum(board.mask, board.board);
        } else if (boards.size === 1) {
          console.log(board.mask.toString(2), JSON.stringify(board.board), unmarkedSum(board.mask, board.board));
          lastWin = num * unmarkedSum(board.mask, board.board);
          return [firstWin, lastWin];
        }
        boards.delete(board);
      }
    }
  }
}

const [firstWin, lastWin] = go();
console.log(firstWin, lastWin);
