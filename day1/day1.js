const fs = require('fs');

const loadData = fs.readFileSync('input.txt', 'utf8');

// parse thw rows
const data = loadData.split("\n").map(row => parseInt(row));

// Part 1
const res1 = data.reduce((acc, num) => {
	return acc + num;
}, 0);

console.log('Part 1 result: ', res1)

// Part 2
let numOfIterations = 0;
const numbers = [];
let current = 0;
function countNums() {
	numOfIterations += 1;
	for (i = 0; i < data.length; i++) {
		current += data[i];

		if (numbers.indexOf(current) !== -1) {
			return current;
		}

		numbers.push(current)
	}

	if (numOfIterations < 200) {
		return countNums();
	} else {
		return 'cant find, needs more iterations';
	}
}

console.log('Part 2 result: ', countNums())
