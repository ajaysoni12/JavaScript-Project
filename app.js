// Select all the box elements (the 9 cells of the Tic Tac Toe board)
let boxes = document.querySelectorAll(".box");

// Select the Reset and New Game buttons
let btnReset = document.querySelector("#btnReset");
let btnNewGame = document.querySelector("#btnNewGame");

let scoreX = document.querySelector("#scoreX");
let scoreO = document.querySelector("#scoreO");
let scoreDraw = document.querySelector("#scoreDraw"); 
let turnText = document.querySelector("#turnText"); // Text to show whose turn it is
let scoreXCount = 0; // Initialize score for player X
let scoreOCount = 0; // Initialize score for player O
let scoreDrawCount = 0; // Initialize score for draws
let leftMoves = 9; // Variable to keep track of remaining moves


// Select the message container and message paragraph for showing winner messages
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg"); 

// Variable to keep track of whose turn it is (true = O's turn, false = X's turn)
let turnO = true; // true -> playerO, false -> playerX

// All possible winning patterns (rows, columns, diagonals)
const winningPatterns = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal \
    [2, 4, 6]  // Diagonal /
]; 

// Add click event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Place O or X depending on whose turn it is
        if(turnO)  {
            box.innerText = "O"; 
            turnO = false; // Switch turn to X
            turnText.innerText = "Player X's Turn"; // Update turn text
        } else {
            box.innerText = "X"; 
            turnO = true; // Switch turn to O
            turnText.innerText = "Player O's Turn"; // Update turn text
        }
        box.disabled = true; // Disable the box after it's clicked
        checkWinner(); // Check if someone has won after this move

        // Decrease the count of remaining moves, if no winner and moves left
        leftMoves--;
        if(leftMoves == 0) {
            scoreDrawCount++; 
            scoreDraw.innerText = scoreDrawCount; // Update score for draws
            msgContainer.classList.remove("hide"); 
            msg.innerText = "It's a Draw!"; // Show draw message
        }
    }); 
}); 

// Enable all boxes and clear their text (used for resetting the game)
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false; // Enable the box
        box.innerText = "";   // Clear the box
    });
}

// Disable all boxes (used when game is over)
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true; // Disable the box
    });
}

// Show the winner message and disable the board
const showWinner = (winner) => {
    if(winner === "X") 
        scoreXCount++; // Increment score for X
    else  
        scoreOCount++; // Increment score for O
  
    disableBoxes(); // No more moves allowed
    msg.innerText = "Congratulations,  " + winner + " is the Winner!";
    msgContainer.classList.remove("hide"); // Show the winner message
    // alternate way is: use one more class show, and add here

    console.log(scoreXCount, scoreOCount); // Log scores for debugging
    scoreX.innenrText = scoreXCount; // Update score for X
    scoreO.innerText = scoreOCount; // Update score for O   
}

// Check if any winning pattern is matched
function checkWinner() {
    for(let pattern of winningPatterns) {
        const [a, b, c] = pattern; 

        // If all three boxes in a pattern are filled and have the same value, we have a winner
        if(boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            // Show the winner
            showWinner(boxes[a].innerText); 
        }
    }
}

// Reset the game to the initial state
const resetGame = () => {
    enableBoxes(); // Enable all boxes and clear them
    msgContainer.classList.add("hide"); // Hide the winner message
    turnO = true; // Set turn back to O
    leftMoves = 9; // Reset the count of remaining moves
};

// Add event listeners to the Reset and New Game buttons
btnReset.addEventListener("click", resetGame); 
btnNewGame.addEventListener("click",  resetGame); 