// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();

// PART 1

const items = input.split("\n");

const moves = items
  .filter((x) => x.includes("move"))
  .map((x) => x.match(/\d+/g));

const arrayPlan = items
  .filter((x) => x.includes("["))
  .map((row) => row.match(/.{1,4}/g));

var objectPlan = {};

arrayPlan.forEach((row) => {
  row.forEach((crate, index) => {
    row[index] = row[index].trim();

    if (row[index] !== "") {
      typeof objectPlan[`column_${index + 1}`] === "undefined"
        ? (objectPlan[`column_${index + 1}`] = Array(row[index].trim()))
        : objectPlan[`column_${index + 1}`].push(row[index].trim());
    }
  });
});

// Part 1

const makeMove = (nbCrates, colStart, colEnd) => {
  var sliceToMove = objectPlan[`column_${colStart}`].slice(0, nbCrates).reverse(); // For part 1 remove the reverse
  if (objectPlan[`column_${colStart}`].length <= sliceToMove.length) {
    objectPlan[`column_${colStart}`] = [];
  } else {
    objectPlan[`column_${colStart}`] = objectPlan[`column_${colStart}`].splice(
      nbCrates,
      objectPlan[`column_${colStart}`].length
    );
  }
  for (let i = 0; i < nbCrates; i++) {
    objectPlan[`column_${colEnd}`].unshift(sliceToMove[i]);
  }
};

moves.forEach((move) => {
  makeMove(move[0], move[1], move[2]);
});
var objectPlanSorted = Object.keys(objectPlan)
  .sort()
  .reduce(function (acc, key) {
    acc[key] = objectPlan[key];
    return acc;
  }, {});

// console.log(objectPlanSorted);

console.log(Object.values(objectPlanSorted).map(x => x[0].replace('[','').replace(']','')).join(''))
