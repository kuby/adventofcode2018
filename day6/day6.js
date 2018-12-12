const fs = require('fs');

const loadData = fs.readFileSync('input.txt', 'utf8');

const data = loadData.split('\n').map((row, index) => {
  const [x, y] = row.split(',');

  return {
    id: `#${index}`,
    x: parseInt(x),
    y: parseInt(y),
  }
});

const maximums = data.reduce((acc, row) => {
  return {
    xMax: row.x > acc.xMax ? row.x : acc.xMax,
    yMax: row.y > acc.yMax ? row.y : acc.yMax,
  }
}, { xMax: 0, yMax: 0 })

const { xMax, yMax } = maximums
const scope = 1;

let dataGrid = {}

const calculateDistance = ([x1, y1], [x2, y2]) => Math.abs(x1 - x2) + Math.abs(y1 - y2)

for (let i = 0; i <= (xMax + scope); i++) {
  for (let a = 0; a <= (yMax + scope); a++) {
    for (let b = 0; b < data.length; b++) {
      const curPos = `${i},${a}`
      const distance = calculateDistance([i, data[b].x], [a, data[b].y])
      const curVal = ((dataGrid[curPos] && dataGrid[curPos].distance) || Infinity)

      if (curVal !== -Infinity) {
        if (curVal === distance) {
          dataGrid[curPos] = { distance: -Infinity, id: data[b].id }
        } else if (curVal > distance) {
          dataGrid[curPos] = { distance, id: data[b].id }
        } else {
          // console.log(curVal, distance)
        }
      }
    }
  }
}

const withoutDuplicates = Object.keys(dataGrid).filter(pos => {
  return dataGrid[pos].distance !== -Infinity
})

//console.log(dataGrid.filter(item => item.distance === Infinity))