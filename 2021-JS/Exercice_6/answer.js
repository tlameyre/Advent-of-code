const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/sample.txt").toString();
var fishes_days = input.split(',').map(Number);



// console.log("Initial state : ", fishes_days)
for (let day = 1; day <= 256; day++) {
  var nvx_poissons = 0
  var array_to_substract = new Array(fishes_days.length).fill(1)
  fishes_days = fishes_days.map((val,idx)=> val-array_to_substract[idx])
  fishes_days.forEach((fish_countdown, index) => {
    if (fish_countdown == -1) {
      nvx_poissons++
      fishes_days[index] = 6
    }
  })
  for (let i = 1; i <= nvx_poissons; i++) {
    fishes_days.push(8)
  }
  // console.log(`Après ${day} jours : `, fishes_days.join(','))
}
console.log(fishes_days.length);
