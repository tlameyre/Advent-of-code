// INPUT / SAMPLE TREATMENT
const fs = require("fs");
var util = require("util");

const input = fs.readFileSync(__dirname + "/input.txt").toString().split('\n')


// PART 1
let forest = input.map((row) => row.split('').map(Number))

let nbVisibleTree = forest.length * 2 + (forest[0].length - 2) * 2

const getNeighbors = (x,y) => {
  return [
    // top
    forest.slice(0, x).map(row => row[y]).reverse(),
    // right
    forest[x].slice(y + 1),
    // left
    forest[x].slice(0, y).reverse(),
    // bottom
    forest.slice(x + 1).map(row => row[y]),
  ]
}

// PART 1
forest.forEach((row, x) => {
  row.forEach((col, y) => {
    let treeHeight = col
    if (x > 0 && y > 0 && x < forest.length - 1 && y < forest[0].length - 1) {
      let neighbors = getNeighbors(x,y)
      let isVisible = neighbors.some((direction) => {
        return direction.every(e => e < treeHeight)
      })
      if (isVisible) {
        nbVisibleTree += 1
      }
    }
  })
})

// PART 2
let highestScenicScore = 0
forest.forEach((row, x) => {
  row.forEach((col, y) => {
    let treeHeight = col
    if (x > 0 && y > 0 && x < forest.length - 1 && y < forest[0].length - 1) {
      let neighbors = getNeighbors(x,y)
      let scenicDetail = []
      neighbors.forEach((direction, dirIndex) => {
        let nbTreeForDirection = 0
        let stopFlag = false
        // console.log(direction);
        direction.forEach((tree, index) => {
          if (tree < treeHeight) {
            if (stopFlag == false) {
              nbTreeForDirection += 1
            }
          } else {
            if (stopFlag == false) {
              nbTreeForDirection += 1
              stopFlag = true
            }
          }
          // console.log(tree, treeHeight, dirIndex, stopFlag);
        })
        scenicDetail.push(nbTreeForDirection)
      })
      // console.log("Height : ", treeHeight);
      // console.log("Scores : ", scenicDetail);
      // console.log("Scores : ", scenicDetail.reduce((a,b) => a*b));
      if (highestScenicScore < scenicDetail.reduce((a, b) => a * b)) {
        highestScenicScore = scenicDetail.reduce((a, b) => a * b);
      }
    }
  })
})

console.log(nbVisibleTree);
console.log(highestScenicScore);
