const fs = require('fs');

let loadData = fs.readFileSync('input.txt', 'utf8');

// Parse the data
const data = loadData.split('\n').map(row => {
  const [id, coords] = row.split(' @ ');
  const parsedAt = coords.split(': ')
  const pos = parsedAt[0].split(',');
  const size = parsedAt[1].split('x');
  return  {
    id,
    posX: parseInt(pos[0]),
    posY: parseInt(pos[1]),
    sizeX: parseInt(size[0]),
    sizeY: parseInt(size[1]),
  };
});

// console.log('Input length', data.length);

const items = [];
let isDuplicate = {};
let duplicates = 0;

for(let x=0;x<data.length;x++) { // Loop through all rows
  for (let i=1;i<=data[x].sizeX;i++) { // Loop through X axis
    for (let a=1;a<=data[x].sizeY;a++) { // Loop through Y axis
      items.push(`x${data[x].posX+i}y${data[x].posY+a}`); // create a big array of all taken positions
    }
  }
}

// console.log('Squares count', items.length);

// Part 1
items.forEach(item => {
  duplicates += isDuplicate[item] === 1 ? 1 : 0; // if exists in isDuplicate, increment the duplicates count number
  isDuplicate[item] = (isDuplicate[item] || 0) + 1;
})

console.log('Result of duplicates:', duplicates);

// Part 2
let itemsData = {}
let ids = {}
data.forEach(item => { ids[item.id] = item.id }) // Create an object with all IDs

for(let x=0;x<data.length;x++) { // Loop through all rows
  for (let i=1;i<=data[x].sizeX;i++) { // Loop through X axis
    for (let a=1;a<=data[x].sizeY;a++) { // Loop through Y axis
      const item = `x${data[x].posX+i}y${data[x].posY+a}`;

      if (!itemsData[item]) {
        itemsData[item] = [data[x].id]; // Create the itemsData array with items key and initialize the value of the current ID
      } else {
        itemsData[item].push(data[x].id); // If the itemsData array with items key exists, push the current ID to it
      }
    }
  }
}

// Remove all used IDs, keep only the one not used by any square
Object.keys(itemsData).forEach(item => {
  if(itemsData[item].length > 1) {
    for(let i=0;i<itemsData[item].length;i++) {
      delete ids[itemsData[item][i]];
    }
  }
});

console.log('The ID is:', Object.keys(ids)[0]);
