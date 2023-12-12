// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();
var lines = input.split(/\r?\n/);
lines = lines.map((value) => value.split(" "))
lines = lines.map((value) => [value[0], parseInt(value[1])])

// PART 1
var depth = 0
var horizontal = 0

lines.forEach(value => {
  if (value[0] == 'forward') {
    horizontal += value[1]
  } else {
    value[0] == 'down' ? depth += value[1] : depth -= value[1]
  }
});

console.log(horizontal * depth);

// PART 2
var depth = 0
var horizontal = 0
var aim = 0

lines.forEach(value => {
  if (value[0] == 'forward') {
    horizontal += value[1]
    depth += value[1] * aim
  } else {
    value[0] == 'down' ? aim += value[1] : aim -= value[1]
  }
});

console.log(horizontal * depth);
