// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();

// PART 1

const items1 = input
  .split("\n")
  .map((x) => [
    x.slice(0, x.length / 2),
    x.slice(x.length / 2, x.length),
  ]);


var sumPart1 = 0

const getCommonCharacters = (string1, string2) => {
  let duplicateCharacter = "";
  for (let i = 0; i < string1.length; i += 1) {
    if (duplicateCharacter.indexOf(string1[i]) === -1) {
      if (string2.indexOf(string1[i]) !== -1) {
        duplicateCharacter += string1[i];
      }
    }
  }
  return duplicateCharacter;
};

var charVals = items1
  .map((item) => {
    var duplicateChar = getCommonCharacters(item[0], item[1]);
    var duplicateCharVal = duplicateChar.charCodeAt(0);
    if (duplicateCharVal >= 97 && duplicateCharVal <= 122) {
      duplicateCharVal -= 96;
    } else {
      duplicateCharVal -= 64;
      duplicateCharVal += 26;
    }
    return duplicateCharVal;
  })
  .reduce((partialSum, a) => partialSum + a, 0);

// console.log(charVals);

// PART 2
function groupArr(data, n) {
  var group = [];
  for (var i = 0, j = 0; i < data.length; i++) {
    if (i >= n && i % n === 0) j++;
    group[j] = group[j] || [];
    group[j].push(data[i]);
  }
  return group;
}

const items2 = groupArr(input.split("\n"), 3);

var charVals = items2
  .map((item) => {
    var duplicateChar12 = getCommonCharacters(item[0], item[1]);
    var duplicateChar = getCommonCharacters(duplicateChar12, item[2]);
    var duplicateCharVal = duplicateChar.charCodeAt(0);
    if (duplicateCharVal >= 97 && duplicateCharVal <= 122) {
      duplicateCharVal -= 96;
    } else {
      duplicateCharVal -= 64;
      duplicateCharVal += 26;
    }
    return duplicateCharVal;
  })
  .reduce((partialSum, a) => partialSum + a, 0);

console.log(charVals);
