const cell = document.querySelectorAll('.cell')
const gameBoard = document.querySelector('.wrapper')
const btn = document.createElement('button')
const resultInfo = document.querySelector('.result')
const popup = document.querySelector('.popup')
const cpu = 'O'
const player = 'X'
const winCombos = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
]
let playersMoves = []
let cpusMoves = []
let gameEnd = false
// Here i've used forEach method for marking squares with player marks, and by 'for' loop im adding cpu's marks. There is also function here that is checking for winner
cell.forEach(cell => {
	cell.addEventListener('click', e => {
		if (!gameEnd && e.target.textContent === '' && e.target.textContent !== cpu && e.target.textContent !== player) {
			e.target.textContent = player
			playersMoves.push(Number(e.target.id))
			
			checkWinner()
		}

		if(!gameEnd){for (let id = 1; id < 10; id++) {
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
		}}
	})
})
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
	gameEnd = false
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

// This Function is checking who won, or if it was a draw. Function iterates through winCombos array and checks if array with players or cpus marks is present. If it is, function calls createPopup function and declaring winner
const checkWinner=() =>{
	for (const combo of winCombos) {
		const [a, b, c] = combo;
		
		// Check if player has won
		if (playersMoves.includes(a) && playersMoves.includes(b) && playersMoves.includes(c)) {
		  resultInfo.textContent = "You Win!";
		  gameEnd = true
		  createPopup();
		
		  return;
		} 
		
		// Check if CPU has won
		else if (cpusMoves.includes(a) && cpusMoves.includes(b) && cpusMoves.includes(c)) {
		  resultInfo.textContent = "You LOSE!";
		  gameEnd = true
		  createPopup();
		  return;
		}
	  }
	
	  // checking for draw
	  if (playersMoves.length + cpusMoves.length === 9) {
		resultInfo.textContent = "It's a draw!";
		createPopup();
	  }
}
