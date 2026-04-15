const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const cells = ["", "", "", "", "", "", "", "", ""]
let turn = "circle"

infoDisplay.textContent = "Circle goes first"

function createBoard() {
    cells.forEach((cells, index) => {
        const squareElement = document.createElement("div")
        squareElement.classList.add("square")
        squareElement.id = index
        squareElement.addEventListener("click", addTurn)
        gameBoard.append(squareElement)
    })
}

createBoard()

function addTurn(e) {
    console.log("clicked", e)
    const turnDisplay = document.createElement("div")
    turnDisplay.classList.add(turn)
    e.target.append(turnDisplay)
    turn = turn === "circle" ? "cross" : "circle" // if current turn is circle assign cross else assign circle
    infoDisplay.textContent = "it is now " + turn + "'s turn"
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
            infoDisplay.textContent = "Circle Wins!"
            squares.forEach(square => square.replaceWith(square.cloneNode(true)))
        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            squares[cell].firstElementChild?.classList.contains("cross"))
        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            squares.forEach(square => square.replaceWith(square.cloneNode(true)))
        }
    })

}
