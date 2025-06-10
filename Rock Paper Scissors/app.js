let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');
const userScoreDisplay = document.querySelector('#user-score');
const compScoreDisplay = document.querySelector('#comp-score');
const resetBtn = document.querySelector('#reset-btn');

// Returns a random choice for the computer
function getComputerChoice() {
    const options = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

// Handles the user's choice
function handleUserChoice(event) {
    const userChoice = event.currentTarget.id;
    playRound(userChoice);
}

// Main game logic for a round
function playRound(userChoice) {
    const computerChoice = getComputerChoice();

    if (userChoice === computerChoice) {
        showDraw();
    } else {
        const userWins = isUserWinner(userChoice, computerChoice);
        showResult(userWins, userChoice, computerChoice);
    }
}

// Determines if the user wins
function isUserWinner(user, computer) {
    return (
        (user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")
    );
}

// Updates UI for a draw
function showDraw() {
    msg.innerText = "It's a draw!";
    msg.style.backgroundColor = "yellow";
    msg.style.color = "black";
}

// Updates UI and scores for win/loss
function showResult(userWins, userChoice, computerChoice) {
    if (userWins) {
        userScore++;
        msg.innerText = `You win! ${capitalize(userChoice)} beats ${capitalize(computerChoice)}.`;
        msg.style.backgroundColor = "green";
        msg.style.color = "white";
    } else {
        compScore++;
        msg.innerText = `You lose! ${capitalize(computerChoice)} beats ${capitalize(userChoice)}.`;
        msg.style.backgroundColor = "red";
        msg.style.color = "white";
    }
    updateScores();
}

// Updates the score display
function updateScores() {
    userScoreDisplay.innerText = userScore;
    compScoreDisplay.innerText = compScore;
}

// Capitalizes the first letter of a string
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Resets the game
function resetGame() {
    userScore = 0;
    compScore = 0;
    updateScores();
    msg.innerText = "Game reset!";
    msg.style.backgroundColor = "white";
    msg.style.color = "black";
}

// Event listeners
choices.forEach(choice => choice.addEventListener("click", handleUserChoice));
resetBtn.addEventListener("click", resetGame);