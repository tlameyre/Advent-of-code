const fs = require("fs");


const part1 = (file) => {
  let lines = fs.readFileSync(file, "utf8").trim().split("\n");

  const maxCounts = {
    red: 12,
    green: 13,
    blue: 14
  }

  return lines.map((line) => {
    return line
      .split(": ")[1]
      .split("; ")
      .map((game) => {
        const pulls = game.split(', ')
        return pulls.every(pull => {
          const [count, color] = pull.split(' ')
          return count <= maxCounts[color]
        })
      })
      .every((set) => set)
  }).reduce((prev, current, index) => {
    return current ? prev + (index + 1) : prev
  }, 0)
}

const part2 = (file) => {
  let lines = fs.readFileSync(file, "utf8").trim().split("\n");
  return lines.map((line) => {
    let maxCounts = {
      red: 0,
      green: 0,
      blue: 0,
    };
    line
      .split(": ")[1]
      .split("; ")
      .forEach((game) => {
        const pulls = game.split(', ')
        return pulls.forEach(pull => {
          const [count, color] = pull.split(' ')
          if (Number(count) > maxCounts[color]) {
            maxCounts[color] = Number(count)
          }
        })
      })
    return maxCounts.red * maxCounts.green * maxCounts.blue;
  })
  .reduce((prev, current) => {
    return prev + current
  }, 0)
}
console.log(part1("input.txt"))
console.log(part2("input.txt"))
