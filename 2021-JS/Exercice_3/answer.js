// INPUT / SAMPLE TREATMENT
const fs = require("fs");

const input = fs.readFileSync(__dirname + "/input.txt").toString();
var lines = input.split(/\r?\n/);

// PART 1
var gamma = ''
var delta = ''
for (let i = 0; i < lines[0].length; i++) {
  var tab = lines.map((e) => e[i])
  var nb_0 = tab.filter((x) => x == '0').length
  var nb_1 = tab.filter((x) => x == '1').length

  nb_0 > nb_1 ? (gamma += '0', delta += '1') : (gamma += '1', delta += '0')

}
// console.log('Gamma :',gamma, parseInt(gamma, 2),'\nDelta :', delta, parseInt(delta, 2));
// console.log(parseInt(gamma, 2)*parseInt(delta, 2));

// PART 2
var good_sample = ''
var oxy = [...lines]
var compteur = 0

while (oxy.length >= 2) {
  var tab = oxy.map((e) => e[compteur])
  var nb_0 = tab.filter((x) => x == '0').length
  var nb_1 = tab.filter((x) => x == '1').length

  nb_0 > nb_1 ? good_sample += '0' : good_sample += '1'

  var regex = new RegExp('^' + good_sample + '.*')

  var oxy = oxy.filter(element => regex.test(element))
  compteur += 1
}

var good_sample = ''
var co2 = [...lines]
var compteur = 0

while (co2.length >= 2) {
  var tab = co2.map((e) => e[compteur])
  var nb_0 = tab.filter((x) => x == '0').length
  var nb_1 = tab.filter((x) => x == '1').length

  nb_0 <= nb_1 ? good_sample += '0' : good_sample += '1'

  var regex = new RegExp('^' + good_sample + '.*')

  var co2 = co2.filter(element => regex.test(element))
  compteur += 1
}

console.log("oxy : ", parseInt(oxy.join(), 2))
console.log("co2 : ",parseInt(co2.join(), 2))
console.log("Result final : ",parseInt(oxy.join(), 2)*parseInt(co2.join(), 2))

