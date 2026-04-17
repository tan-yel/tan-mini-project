const gameBoard = document.getElementById("gameboard")
const infoDisplay = document.getElementById("info")
const pokeName = document.getElementById("pokeName")
const sprite = document.getElementById("sprite")
const cells = ["", "", "", "", "", "", "", "", ""]
const players = ["Player 1", "Player 2"]
let turn = players[0]


infoDisplay.textContent = `${players[0]} goes first`

function createBoard() {
    cells.forEach((cell) => {
        const squareElement = document.createElement("div")
        squareElement.classList.add("square")
        squareElement.id = cell
        squareElement.addEventListener("click", addTurn)
        gameBoard.append(squareElement)
    })
}

createBoard()

function addTurn(e) {
    console.log("clicked", e)
    const turnDisplay = document.createElement("div")
    if (turn == players[0]){
        turnDisplay.classList.add('cross')
    } else {
        turnDisplay.classList.add('circle')
    }
    e.target.append(turnDisplay)
    turn = turn === players[0] ? players[1] : players[0] // if current turn is circle assign cross else assign circle
    infoDisplay.textContent = "Now, " + turn + " it is your turn!"
    e.target.removeEventListener("click", addTurn)
    checkScore()
}

function checkScore () {
    const squares = document.querySelectorAll(".square")
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // across
        [0, 3 ,6], [1, 4, 7], [2, 5, 8],  // down
        [0, 4, 8], [2, 4, 6]              // diagonal
    ]
    winningCombos.forEach(array => {
        const circleWins = array.every(cell => 
            squares[cell].firstElementChild?.classList.contains("circle"))
            if (circleWins) {
                infoDisplay.textContent = `${turn} Wins!`
            squares.forEach(square => square.removeEventListener("click", addTurn))
        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            squares[cell].firstElementChild?.classList.contains("cross"))
        if (crossWins) {
            infoDisplay.textContent = `${turn} Wins!`
            squares.forEach(square => square.removeEventListener("click", addTurn))
        }
    })
}

// Pokemon bit
async function generateRandomPokemon() {
    const pokemonId = Math.floor(Math.random() * 500) + 1
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Not found')
            
        const data = await response.json()
        pokeName.textContent = data.name.toUpperCase()
        sprite.src = data.sprites.front_default
    }
    catch(error){
        return { error: 'Not found' }
    }
}
