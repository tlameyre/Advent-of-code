const fs = require("fs");
const { parse } = require("path");

let data = fs.readFileSync("input_2.txt", "utf8");
let sum = 0


// Part 1
// data = data.split("\n").map((line) => {
//   return line.match(/\d/g)
// });

// data.forEach((line) => {
//   console.log("line", line);
//   if (line.length === 1) {
//     sum += parseInt(line[0]) * 10 + parseInt(line[0])
//   } else {
//     sum += parseInt(line[0]) * 10 + parseInt(line[line.length - 1])
//   }
// })

// Part 2
sum = 0
data = data.split("\n").map((line) => {
  return line.match(/one|two|three|four|five|six|seven|eight|nine|\d/g);
});

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

data = data.map((line) => {
  return line.map((word) => {
    if (word in numbers) {
      return numbers[word]
    } else {
      return parseInt(word)
    }
  })
})

data = data.map((line) => {
  if (line.length === 1) {
    return line[0]*10 + line[0]
  }else {
    return line[0]*10 + line[line.length - 1]
  }
})

sum = data.reduce((a, b) => a + b, 0)
console.log(sum);


