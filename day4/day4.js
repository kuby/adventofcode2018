const fs = require('fs');

const loadData = fs.readFileSync('input.txt', 'utf8');

// Prase data
const data = loadData.split('\n').map(row => {
  const splitRow = row.split('] ')
  const time = splitRow[0].substr(1)
  const action = splitRow[1];

  return {
    time,
    action,
  }
})

// Sort by time
const sortedData = data.sort((a, b) => {
  if (a.time < b.time) return -1
  if (a.time > b.time) return 1
  return 0
})

// Parse more the sorted data
const entries = sortedData.map(row => {
  const [action, id] = row.action.split(' ')
  const time = row.time.split(' ')[1]
  const minutes = time.split(':')[1]

  return {
    action,
    id: id !== 'asleep' && id !== 'up' ? id : false,
    minutes: parseInt(minutes),
  }
})

let currentGuard = null
let guardsSleepTimes = {}
let guardsMostCommonSleepTime = {}

for(let i=0; i<entries.length; i++) {
  if(entries[i].action === 'Guard') {
    currentGuard = entries[i].id
  } else {
    if(entries[i].action === 'falls') {
      const fallSleepMinute = entries[i].minutes
      const wakeUpMinute = entries[i+1].minutes

      // Calculates the guards sleep minute
      guardsSleepTimes[currentGuard] = (guardsSleepTimes[currentGuard] || 0) + (wakeUpMinute - fallSleepMinute)

      for(let a=fallSleepMinute; a<wakeUpMinute; a++) {
        if(!guardsMostCommonSleepTime[currentGuard]) {
          guardsMostCommonSleepTime[currentGuard] = [a]
        } else {
          guardsMostCommonSleepTime[currentGuard].push(a)
        }
      }
    }
  }
}

// Convert the values to array
const theGuardSleepTimes = Object.values(guardsSleepTimes)
// Find the index of the biggest number in the previous converted array of values
const theGuardIndex = theGuardSleepTimes.indexOf(Math.max(...theGuardSleepTimes));
// Convert the keys to array and get the one with the found index from previous step
const theGuardId = Object.keys(guardsSleepTimes)[theGuardIndex]

// Count the most sleeped times of the found guard
let mostSleepedTimesCalculated = {}
guardsMostCommonSleepTime[theGuardId].forEach(minute => {
  mostSleepedTimesCalculated[minute] = (mostSleepedTimesCalculated[minute] || 0) + 1
})
// Convert the values to array
const foundTimes = Object.values(mostSleepedTimesCalculated)
// Find the index of the biggest number in the previous converted array of values
const foundTimeIndex = foundTimes.indexOf(Math.max(...foundTimes));
// Convert the keys to array and get the one with the found index from previous step
const foundTime = Object.keys(mostSleepedTimesCalculated)[foundTimeIndex]

const result = parseInt(theGuardId.substr(1)) * parseInt(foundTime);

console.log('Part 1 result:', result)

// Part 2
let guard2Id = null
let guard2commonTimeCount = 0
let guard2commonTime = 0

let guard2MostCommonTimes = {}

Object.keys(guardsMostCommonSleepTime).forEach(guardId => {
  for(let i=0; i<guardsMostCommonSleepTime[guardId].length; i++) {
    let tempTimes = {}
    guardsMostCommonSleepTime[guardId].forEach(minute => {
      tempTimes[minute] = (tempTimes[minute] || 0) + 1
    })
    guard2MostCommonTimes[guardId] = tempTimes
  }
})

Object.keys(guard2MostCommonTimes).forEach(guardId => {
  const curGuard2Times = Object.values(guard2MostCommonTimes[guardId])
  const curFoundTimeIndex = curGuard2Times.indexOf(Math.max(...curGuard2Times));

  if(curGuard2Times[curFoundTimeIndex] > guard2commonTimeCount) {
    guard2Id = guardId
    guard2commonTimeCount = curGuard2Times[curFoundTimeIndex]
    guard2commonTime = Object.keys(guard2MostCommonTimes[guardId])[curFoundTimeIndex]
  }
})

const result2 = parseInt(guard2Id.substr(1)) * parseInt(guard2commonTime);

console.log('Part 2 result:', result2);