// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const lines = input.split(/\r?\n/);
const input_array = lines.map((x) => parseInt(x))

// PART 1

var count = 0
var old = input_array[0];

input_array.forEach(number => {
  if (number > old) {
    count += 1;
  }
  old = number;
});

console.log(count);

//  PART 2

var count = 0
var sum = 0
var old = input_array[0] + input_array[1] + input_array[2];

for (let index = 1; index < input_array.length; index++) {
  if (input_array[index + 2]) {
    sum = input_array[index] + input_array[index + 1] + input_array[index + 2]
    if (sum > old) {
      count += 1
    }
    old = sum
  }
}

console.log(count)
