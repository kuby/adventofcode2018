const fs = require('fs');

const loadData = fs.readFileSync('input.txt', 'utf8');

// parse thw rows
const data = loadData.split("\n").map(row => row.replace(/\t/g, ' ')).map(row => row.split(''));

// Part 1
const result1 = data.reduce((acc, row) => {
	let filtered = row;
	let count = 0;
	let hasTwo = false;
	let hasThree = false;

	for(let i=0;i<row.length;i++) {
		if(filtered.indexOf(row[i]) !== -1) {
			const length = filtered.filter(l => l === row[i]).length;
			if(length === 2) {
				hasTwo = true;
			}
			if(length === 3) {
				hasThree = true;
			}
			filtered = filtered.filter(l => l !== row[i]);
		}
	}

	if (hasTwo) {
		acc = { ...acc, two: acc.two + 1 };
	}

	if (hasThree) {
		acc = { ...acc, three: acc.three + 1 };
	}

	return acc;
}, { two: 0, three: 0 });

console.log('Part 1 result: ', result1.two * result1.three)

// Part 2
let result2 = '';
let commonLetters = {a: [], b: []};

for(let i=0;i<data.length;i++) {
	for(let b=0;b<data.length;b++) {
		count = 0;
		if (i !== b) {
			for(let a=0;a<data[i].length;a++) {
				if(data[i][a] !== data[b][a]) {
					count++;
				}
			}

			if(count === 1) {
				commonLetters = { a: data[i], b: data[b] };
				break;
			}
		}
	}
}

if(commonLetters.a.length !== 0 && commonLetters.b.length !== 0) {
	result2 = commonLetters.a.reduce((acc, letter, index) => {
		if (commonLetters.b[index] === letter) {
			return acc + letter;
		}
		return acc;
	}, '');
}

console.log('Part 2 result: ', result2)
