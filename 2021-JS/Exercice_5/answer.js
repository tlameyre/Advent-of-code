const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();
var lines = input.split(/\r?\n/);
lines = lines.map((coords) => coords.split(' -> '))
lines = lines.map((coords) => [coords[0].split(','),coords[1].split(',')])
var data = []

// Conversion des coordonnées en STRING to Integer
lines.forEach(coords => {
  coor_to_integer = []
  coords.forEach(coord => {
    coor_to_integer.push(coord.map(Number))
  })
  data.push(coor_to_integer)
});
// Récupération des point donnant des lignes verticales
var vertical_lines = data.filter(coords => coords[0][0] == coords[1][0] || coords[0][1] == coords[1][1])

// Récupération des point donnant des lignes diagonales
var diagonal_lines = data.filter(x => !vertical_lines.includes(x));

// Tri croissant des couple de pts selon la première composante (x)
vertical_lines = vertical_lines.map(diagonal_coords => diagonal_coords.sort((a,b) => a[0] - b[0]))
console.log("Before sort : ", diagonal_lines);
diagonal_lines = diagonal_lines.map(diagonal_coords => diagonal_coords.sort((a,b) => a[0] - b[0]))
console.log("After sort : ", diagonal_lines);

// PARTIE 1

// Initialisation du diagramme rempli de 0
var diagram = []
for (let i = 0; i < 1000; i++) {
  var row = []
  for (let j = 0; j < 1000; j++) {
    row.push(0)
  }
  diagram.push(row)
}

// Fonction qui génère les points intermédiaires entre un couple de pts
let get_vertical_points_to_add = (min, max, coord, coord_value) => {
  var points_to_add = []
  for (let i = min + 1; i < max; i++) {
    coord == 'x' ? points_to_add.push([coord_value,i]) : points_to_add.push([i, coord_value])
  }
  return points_to_add;
}

var points = []

vertical_lines.forEach((vertical_coords) => {
  var point_1 = vertical_coords[0]
  var point_2 = vertical_coords[1]
  points.push(point_1)
  if (point_1[0] == point_2[0]) {
    if (point_1[1] > point_2[1]) {
      get_vertical_points_to_add(point_2[1], point_1[1], 'x', point_1[0]).forEach((point) => {
        points.push(point)
      })
    } else {
      get_vertical_points_to_add(point_1[1], point_2[1], 'x', point_1[0]).forEach((point) => {
        points.push(point)
      })
    }
  } else {
      get_vertical_points_to_add(point_1[0], point_2[0], 'y', point_1[1]).forEach((point) => {
        points.push(point)
      })
  }
  points.push(point_2)
})

// PARTIE 2

console.log(diagonal_lines);
diagonal_lines.forEach((diagonal_coords) => {
  var point_1 = diagonal_coords[0]
  var point_2 = diagonal_coords[1]

  // console.log("PT1 : " + point_1)
  // console.log("PT2 : " + point_2);
  // console.log(point_1[1] > point_1[0]);

  // console.log("Points intermediaires");
  for (let i = 0; i <= (point_2[0] - point_1[0]); i++) {
    if (point_1[1] > point_2[1]) {
      points.push([point_1[0]+i, point_1[1]-i])
    } else {
      points.push([point_1[0]+i, point_1[1]+i])
    }
  }
})

// Création des points dans le diagramme
points.forEach((point) => {
  diagram[point[0]][point[1]] += 1
})

// Calcul des points à éviter (valeur >= 2)
var points_to_avoid = 0

diagram.forEach((row) => {
  row.forEach((point) => {
    if (point >= 2) {
      points_to_avoid += 1
    }
  })
})

console.log(points_to_avoid);
