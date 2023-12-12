// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();

// PART 1

const items = input
  .split("\n").map(x => x.split(',').map(y => y.split('-').map(z => parseInt(z))))

var nbIntervall = 0

items.forEach(interval => {
  if ((interval[0][1] >= interval[1][0] && interval[0][0] <= interval[1][1]) || (interval[1][0] <= interval[0][1] && interval[1][1] >= interval[0][0])) {
    nbIntervall += 1
    console.log(interval);
  }

});

console.log(nbIntervall);
