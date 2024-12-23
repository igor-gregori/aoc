import { input, initGuardPos } from '../input.js'

let guardPos = initGuardPos

function nextStep(row, col, dir) {
    if (dir === 'up') return [row - 1, col]
    if (dir === 'down') return [row + 1, col]
    if (dir === 'right') return [row, col + 1]
    if (dir === 'left') return [row, col - 1]
}

function nextDir(dir) {
    if (dir === 'up') return 'right'
    if (dir === 'down') return 'left'
    if (dir === 'right') return 'down'
    if (dir === 'left') return 'up'
}

function prevDir(dir) {
    if (dir === 'right') return 'up'
    if (dir === 'left') return 'down'
    if (dir === 'down') return 'right'
    if (dir === 'up') return 'left'
}

let loopCount = 0

function run(guardPos, isSim) {
    let firstPos = structuredClone(guardPos)
    firstPos[2] = prevDir(firstPos[2])

    let isFirstStep = true

    while (true) {
        if (isSim && !isFirstStep && (firstPos.toString() === guardPos.toString()))
            return 'loop'

        isFirstStep = false

        let [row, col, dir] = guardPos

        let [nextRow, nextCol] = nextStep(row, col, dir)

        if (nextRow < 0) return 'end'
        if (nextRow >= input.length) return 'end'
        if (nextCol < 0) return 'end'
        if (nextCol >= input[0].length) return 'end'

        if (input[nextRow][nextCol] !== '#') {
            guardPos = [nextRow, nextCol, dir]
            console.log('andou')

            if (!isSim) {
                let simPos = structuredClone(guardPos)
                simPos[2] = nextDir(guardPos[2])

                let result = run(simPos, true)

                // console.log('guardPos: ', guardPos.toString(), '/ ', 'simPos: ', simPos.toString())
                // console.log('sim result:', result)
                // console.log('')

                if (result === 'loop')
                    loopCount++
            }
        }
        else {
            guardPos[2] = nextDir(dir)

            if (isSim)
                console.log('sim virou')
        }
    }
}

run(guardPos, false)

console.log(loopCount)
