const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();
var lines = input.split(/\r?\n/);
var input_array = lines.map(element => element.split(''))
var low_points = [];
var low_points_coords = [];


input_array.forEach((line, index_x) => {
  line.forEach((point, index_y) => {
    var neighbors_sup = [];
    if (index_x > 0) {
      check_if_up_is_sup(index_x, index_y) ? neighbors_sup.push(true) : neighbors_sup.push(false);
    }
    if (index_x < input_array.length - 1) {
      check_if_down_is_sup(index_x, index_y) ? neighbors_sup.push(true) : neighbors_sup.push(false);
    }
    if (index_y > 0) {
      check_if_left_is_sup(index_x, index_y) ? neighbors_sup.push(true) : neighbors_sup.push(false);
    }
    if (index_y < line.length - 1) {
      check_if_right_is_sup(index_x, index_y) ? neighbors_sup.push(true) : neighbors_sup.push(false);
    }
    if (neighbors_sup.every((element)=>element == true)) {
      low_points.push(parseInt(point)+1);
      low_points_coords.push([index_x, index_y]);
    };
  })
})
// console.log(low_points.length)
// console.log(low_points.reduce((a,b) => a+b));

function check_if_up_is_sup(x,y) { return (input_array[x][y] < input_array[x - 1][y]) };
function check_if_down_is_sup(x,y) { return (input_array[x][y] < input_array[x + 1][y]) };
function check_if_left_is_sup(x,y) { return (input_array[x][y] < input_array[x][y - 1]) };
function check_if_right_is_sup(x,y) { return (input_array[x][y] < input_array[x][y + 1]) };

// console.log(low_points_coords);

function get_bassin_size(point) {
  // console.log('Point traité : ' + point);
  var resultat = [point]
  var resultat_string = [`${point}`]
  var cpt = 0
  while (resultat.length != cpt) {
    // console.log('');
    // console.log(`-----Etape ${cpt}------`);
    // console.log('');
    // console.log('Resultat : ');
    // console.log(resultat);
    // console.log('Point en cours');
    // console.log(resultat[cpt]);
    // console.log('');
    // console.log('====================');
    // console.log('');
    if (resultat[cpt][0] > 0 && input_array[resultat[cpt][0] - 1][resultat[cpt][1]] != '9') {
      // console.log('au dessus');
      if (!resultat_string.includes(`${[resultat[cpt][0] - 1, resultat[cpt][1]]}`)) {
        resultat.push([resultat[cpt][0] - 1, resultat[cpt][1]]);
        resultat_string.push(`${[resultat[cpt][0] - 1, resultat[cpt][1]]}`);
      }
    }
    if (resultat[cpt][0] < input_array.length - 1 && input_array[resultat[cpt][0] + 1][resultat[cpt][1]] != '9') {
      // console.log("en dessous");
      if (!resultat_string.includes(`${[resultat[cpt][0] + 1, resultat[cpt][1]]}`)) {
        resultat.push([resultat[cpt][0] + 1, resultat[cpt][1]]);
        resultat_string.push(`${[resultat[cpt][0] + 1, resultat[cpt][1]]}`);
      }
    }
    if (resultat[cpt][1] > 0 && input_array[resultat[cpt][0]][resultat[cpt][1] - 1] != '9') {
      // console.log("a gauche");
      if (!resultat_string.includes(`${[resultat[cpt][0], resultat[cpt][1] - 1]}`)) {
        resultat.push([resultat[cpt][0], resultat[cpt][1] - 1]);
        resultat_string.push(`${[resultat[cpt][0], resultat[cpt][1] - 1]}`);
      }
    }
    if (resultat[cpt][1] < input_array[0].length - 1 && input_array[resultat[cpt][0]][resultat[cpt][1] + 1] != '9') {
      // console.log("a droite");
      if (!resultat_string.includes(`${[resultat[cpt][0], resultat[cpt][1] + 1]}`)) {
        resultat.push([resultat[cpt][0], resultat[cpt][1] + 1]);
        resultat_string.push(`${[resultat[cpt][0], resultat[cpt][1] + 1]}`);
      }
    }
    cpt ++;
    // console.log(cpt, resultat.length);
  }
  // console.log(resultat);
  return resultat.length;
}

// get_bassin_size([0,9])

var all_bassins_size = []

low_points_coords.forEach((point) => {
  all_bassins_size.push(get_bassin_size(point));
})

console.log(all_bassins_size);
all_bassins_size = all_bassins_size.sort((a, b) => a - b);

console.log(all_bassins_size.slice(-3).reduce((a, b) => a * b, 1));
