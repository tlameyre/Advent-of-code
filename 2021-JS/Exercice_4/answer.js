// Utils
const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();
var lines = input.split(/\r?\n/);

const tirage = lines[0].split(',');
lines = lines.slice(2)

var boards = []
var board = []
lines.forEach((line) => {
  if (line != '') {
    board.push(line.trim().split(' ').filter((key) => key !== ""))
  } else {
    boards.push(board)
    board = []
  }
})
boards.push(board)

// PART 1
let remove_num_from_boards = (number) => {
  boards.forEach((board) => {
    board.forEach((line) => {
      if (line.indexOf(number) != -1) {
        line[line.indexOf(number)] = 'W';
      }
    })
  })
}

// PART 2 FONCTION
let remove_winnig_board = (board, type) => {
  if (type == 'row board') {
    boards = boards.filter((element) => !equals(element, board))
  } else {
    var reversed_col_board = []
    for (let i = 0; i < board[0].length; i++) {
      reversed_col_board.push(board.map((e) => e[i]))
    }
    boards = boards.filter((element) => !equals(element, reversed_col_board))
  }
}

let check_if_win = () => {
  const winner_pattern = ['W','W','W','W','W']
  const boards_rows = boards
  const boards_cols = get_cols()
  var sum = 0
  var win = false
  boards_rows.forEach((board) => {

    board.forEach((row) => {
      if (equals(row, winner_pattern)) {
        win = true
        sum = get_sum_of_grid(board)
        remove_winnig_board(board, 'row board')
      }
    })
  })
  boards_cols.forEach((board) => {

    board.forEach((col) => {
      if (equals(col, winner_pattern)) {
        win = true
        sum = get_sum_of_grid(board)
        remove_winnig_board(board,'col board')
      }
    })
  })
  return [ win, sum ]
}

let get_sum_of_grid = (grid) => {
  let sum = 0
  grid.forEach((line) => {
    line.forEach((number) => {
      if (number != 'W') {
        sum += parseInt(number)
      }
    })
  })
  return sum
}

let get_cols = () => {
  const boards_cols = []
  boards.forEach((board) => {
    var board_cols = []
    for (let i = 0; i < board[0].length; i++) {
      board_cols.push(board.map((e) => e[i]))
    }
    boards_cols.push(board_cols)
  })
  return boards_cols
}

// PART 1 - Script
// var cpt = 0
// var result = []
// while (check_if_win()[0] == false) {
//   remove_num_from_boards(tirage[cpt])
//   result = [check_if_win(cpt)[1], tirage[cpt]]
//   cpt++
// }

// PART 2 - Script

var cpt = 0
var result = []
var last_board = []
var sum = []
while (boards.length > 0) {
  remove_num_from_boards(tirage[cpt])
  result = [get_sum_of_grid(boards[0]), tirage[cpt]]
  check_if_win()
  cpt++;
}
console.log(result);
console.log(result[0]*result[1]);
