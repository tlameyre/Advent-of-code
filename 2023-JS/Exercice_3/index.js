const fs = require("fs");


const part1 = (file) => {
  let lines = fs.readFileSync(file, "utf8").trim().split("\n");
  return lines.map((line) =>
    line.split('')
  )
}

const part2 = (file) => {
  let lines = fs.readFileSync(file, "utf8").trim().split("\n");
}
console.log(part1("sample.txt"))
// console.log(part2("input.txt"))
