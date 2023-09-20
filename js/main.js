const cell = document.querySelectorAll('.cell')
const gameBoard = document.querySelector('.wrapper')
const btn = document.createElement('button')
const resultInfo = document.querySelector('.result')
const popup = document.querySelector('.popup')
const cpu = 'O'
const player = 'X'
let playersMoves = []
let cpusMoves = []

// Here i've used forEach method for marking squares with player marks, and by 'for' loop im adding cpu's marks. There is also function here that is checking for winner
cell.forEach(cell => {
    cell.addEventListener('click', e => {
        if (e.target.textContent === '' && e.target.textContent !== cpu && e.target.textContent !== player) {
            e.target.textContent = player
            playersMoves.push(Number(e.target.id))
            checkWinner()
        }

        for (let id = 1; id < 10; id++) {
            if (
                document.getElementById(id).textContent === '' &&
                document.getElementById(id).textContent !== cpu &&
                document.getElementById(id).textContent !== player
            ) {
                document.getElementById(id).textContent = cpu
                cpusMoves.push(Number(id))

                checkWinner()
                return
            }
        }
    })
})

// This Function is checking who won, or if it was a draw. By each click im adding numbers to arrays (one array for each player) by 'reduce' method im checking if players achievied certain number of points (there is limited number of sums that can win the game) As a base i used 'Magic square
const checkWinner = () => {
    let playerPointsSummary = playersMoves.reduce((a, b) => a + b, 0)
    let cpuPointsSummary = cpusMoves.reduce((a, b) => a + b, 0)

    if (
        (playersMoves.length > 2 && playerPointsSummary === 15) ||
        (playerPointsSummary === 23 && playersMoves.length > 4) ||
        (playerPointsSummary === 21 && playersMoves.length > 3)
    ) {
        resultInfo.textContent = 'You win!'

        createPopup()
    } else if (
        (cpusMoves.length > 2 && cpuPointsSummary === 15) ||
        (cpuPointsSummary === 7 && cpusMoves.length > 4) ||
        (cpuPointsSummary === 12 && cpusMoves.length > 4) ||
        cpuPointsSummary === 16 ||
        cpuPointsSummary === 17 && cpusMoves.length <= 5 ||
        cpuPointsSummary === 18 ||
        cpuPointsSummary === 19 ||
        cpuPointsSummary === 20 ||
        cpuPointsSummary === 23
    ) {
        resultInfo.textContent = 'You lose!'

        createPopup()
    } else if (playersMoves.length + cpusMoves.length === 9) {
        resultInfo.textContent = 'Draw!'

        createPopup()
    }
    return
}
// This function is resetting the game
const gameReset = () => {
    cell.forEach(cell => {
        cell.textContent = ''
        cell.classList.remove('clickStop')
    })
    document.body.removeChild(btn)
    popup.classList.remove('active')
    playersMoves = []
    cpusMoves = []
}

// This function is creating popup with information who won the game. It also prevents from adding new marks when game is finished and it creates reset button
const createPopup = () => {
    popup.classList.add('active')
    document.body.appendChild(btn)
    btn.textContent = 'Reset'
    btn.classList.add('reset-btn')
    btn.addEventListener('click', gameReset)
    cell.forEach(cell => {
        cell.classList.add('clickStop')
    })
}
