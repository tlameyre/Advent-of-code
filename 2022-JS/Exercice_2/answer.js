// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();

const combi = input.split("\n").map(x => { return x.split(' ')});


// PART 1
var score1 = 0

const STRATEGY1 = {
  A: {
    X: 4,
    Y: 8,
    Z: 3,
  },
  B: {
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: {
    X: 7,
    Y: 2,
    Z: 6,
  }
}

combi.forEach(game => {
  // console.log(game);
  score1 += STRATEGY1[game[0]][game[1]]
})

// PART 2

var score2 = 0

const STRATEGY2 = {
  A: {
    X: 'Z',
    Y: 'X',
    Z: 'Y',
  },
  B: {
    X: 'X',
    Y: 'Y',
    Z: 'Z',
  },
  C: {
    X: 'Y',
    Y: 'Z',
    Z: 'X',
  },
};

combi.forEach((game) => {
  // console.log(game);
  var moveToPlay = STRATEGY2[game[0]][game[1]]
  score2 += STRATEGY1[game[0]][moveToPlay];
});

console.log(score2);
