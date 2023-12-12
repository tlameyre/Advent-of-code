// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();

// PART 1

const items = input.split("\n");

function is_unique(str) {
  var obj = {};
  for (var z = 0; z < str.length; ++z) {
    var ch = str[z];
    if (obj[ch]) return false;
    obj[ch] = true;
  }
  return true;
}

for (let i = 0; i < items[0].length-3; i++) {
  if (is_unique(items[0].slice(i, i + 14))) {
    console.log(i+14);
    break
  }
}
