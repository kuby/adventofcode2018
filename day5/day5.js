const fs = require('fs');

const loadData = fs.readFileSync('input.txt', 'utf8');

const data = loadData.split('');

// Part 1
function reduceData(input) {
  let newInput = '';
  let reduceCounter = 0;

  for(let i=0; i<input.length; i++) {
    const current = input[i]
    const next = input[i+1] || null

    if (next) {
      if ((current.toLowerCase() === next.toLowerCase()) && (current !== next)) {
        i += 1;
        reduceCounter += 1;
      } else {
        newInput += current;
      }
    } else {
      newInput += current;
    }
  }

  if (reduceCounter === 0) {
    return newInput
  }

  return reduceData(newInput)
}

const reducedData = reduceData(data);

console.log('Part 1 result:', reducedData.length)

// Part 2
function clearDataFromUnit(input, unitLower, unitUpper) {
  let newInput = '';

  for(let i=0; i<input.length; i++) {
    if (input[i] !== unitLower && input[i] !== unitUpper) {
      newInput += input[i]
    }
  }

  return newInput
}

let shortestPolymer = Infinity
const units = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

for(let i=0; i<units.length; i++) {
  const clearedData = clearDataFromUnit(data, units[i], units[i].toUpperCase())
  const reducedClearedData = reduceData(clearedData)

  if (reducedClearedData.length < shortestPolymer) {
    shortestPolymer = reducedClearedData.length
  }
}

console.log('Part 2 result:', shortestPolymer);
