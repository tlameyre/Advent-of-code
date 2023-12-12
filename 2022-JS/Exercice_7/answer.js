// INPUT / SAMPLE TREATMENT
const fs = require("fs");
var util = require("util");

const input = fs.readFileSync(__dirname + "/sample.txt").toString();


// PART 1

const items = input.split("\n");
// console.log(items);

var arborescence = {
  size: 0,
  type: 'dir'
};
var currentDir = arborescence;
var path = [];
var dirSize = {};

const goToNewFolder = (folderName) => {
  if (typeof currentDir[folderName] === "undefined") {
    currentDir[folderName] = { size: 0, type: 'dir'};
  }
  currentDir = currentDir[folderName];
  path.push(folderName);
};

const goToParentFolder = () => {
  path.pop();
  newCurrentDir = {};
  path.forEach((item) => {
    item == "/"
      ? (newCurrentDir = arborescence[item])
      : (newCurrentDir = newCurrentDir[item]);
  });
  currentDir = newCurrentDir;
};

const addFile = (fileSize, fileName) => {
  currentDir[fileName] = { size: fileSize, type: 'file'};
  newCurrentDir = {};
  path.forEach((item) => {
    item = item.trim()
    if (item == "/") {
      arborescence['size'] += fileSize;
      newCurrentDir = arborescence[item];
      newCurrentDir["size"] += fileSize;
    } else {
      newCurrentDir = newCurrentDir[item];
      newCurrentDir['size'] += fileSize;
    }
  });
};

items.forEach((line) => {
  if (line.includes("$ cd ")) {
    var folderName = line.split("$ cd")[1].trim();
    if (folderName !== "..") {
      goToNewFolder(folderName);
    } else if (folderName == "..") {
      goToParentFolder();
    }
  } else if (line.match(/\d+/)) {
    var fileSize = parseInt(line.split(" ")[0]);
    var fileName = line.split(" ")[1];
    addFile(fileSize, fileName);
  }
});

console.log(JSON.stringify(arborescence, null, 2));

var goodDir = []
var maxSize = 0

const exploreChildrens = (object) => {
  // // PART 1
  // if (object.type == 'dir' && object.size < 100000) {
  //   goodDir.push(object.size)
  // }
  // PART 2
  if (object.type == 'dir') {
    goodDir.push(object.size)
  }
  for (const [key, value] of Object.entries(object)) {
    if (typeof value == "object") {
      exploreChildrens(value)
    }
  }
}
exploreChildrens(arborescence)

// console.log(goodDir.reduce((partialSum, a) => partialSum + a, 0));
goodDirDecreasing = goodDir.sort((a, b) => a - b).reverse().slice(1, goodDir.length);
goodDirIncreasing = goodDirDecreasing.reverse();

var maxSpace = 70000000;
var updateSpace = 30000000;
var parentDirSpace = goodDir[0]

var unusedSpace = maxSpace - parentDirSpace
var spaceNeeded = updateSpace - unusedSpace

goodDirIncreasing.forEach(value => {
  if (value > spaceNeeded) {
    console.log(value);
  }
})

// console.log(arborescence);
