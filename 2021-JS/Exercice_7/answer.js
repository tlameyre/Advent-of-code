const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();
var horizontal_pos = input.split(',').map(Number);

var min = Math.min.apply(Math,horizontal_pos)
var max = Math.max.apply(Math,horizontal_pos)
var sum_to_move = []
var nb_mvt_to_make = []

let get_consecutive_sum_result = (number) => {
  return [...Array(number + 1).keys()]
}
for (let i = min; i <= max; i++) {
  // Partie 1
  sum_to_move.push(horizontal_pos.map(pos => Math.abs(pos - i)).reduce((a,b) => a+b))
  // Partie 2
  nb_mvt_to_make.push(horizontal_pos.map(pos => Math.abs(pos - i)))
  // nb_mvt_to_make.push(horizontal_pos.map(pos => [...Array(Math.abs(pos - i) + 1).keys()]))
}

nb_mvt_to_make.forEach((number) => {
  console.log(get_consecutive_sum_result(number).reduce((a,b) => a+b));
})

// var mvt_cost = nb_mvt_to_make.forEach(element => {
//   console.log(element.map);
// })

// });
var result = []
// nb_mvt_to_make.forEach(array_consecutive => {
//   result.push(array_consecutive.map((suite)=> suite.reduce((a,b) => a+b)).reduce((a,b) => a+b))
// })
// console.log(Math.min.apply(Math,sum_to_move))
// console.log(nb_mvt_to_make)
