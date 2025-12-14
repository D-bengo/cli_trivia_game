// triviaGame.js

// Import readline module for CLI interaction
const readline = require("readline");

// Create CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Array of trivia questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["1) Paris", "2) London", "3) Berlin", "4) Madrid"],
    answer: 1,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["1) Earth", "2) Mars", "3) Jupiter", "4) Venus"],
    answer: 2,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["1) Charles Dickens", "2) William Shakespeare", "3) Mark Twain", "4) J.K. Rowling"],
    answer: 2,
  },
];

// User score object
let score = {
  correct: 0,
  incorrect: 0,
};

// Timer variables
let timeLimit = 30; // seconds for entire game
let timer;

// Function to start the game
function startGame() {
  console.log("Welcome to the Trivia Game!");
  console.log(`You have ${timeLimit} seconds to answer all questions.`);
  console.log("Let's begin...\n");

  // Start countdown timer
  timer = setTimeout(() => {
    console.log("\nTime's up!");
    endGame();
  }, timeLimit * 1000);

  askQuestion(0); // Start with first question
}

// Function to ask a question recursively
function askQuestion(index) {
  if (index >= questions.length) {
    return endGame();
  }

  const q = questions[index];
  console.log(q.question);
  q.options.forEach((option) => console.log(option));

  rl.question("Your answer (enter the number): ", (input) => {
    const userAnswer = parseInt(input);

    // Validate answer
    if (userAnswer === q.answer) {
      console.log("✅ Correct!\n");
      score.correct++;
    } else {
      console.log(`❌ Incorrect! The correct answer was option ${q.answer}\n`);
      score.incorrect++;
    }

    // Ask next question
    askQuestion(index + 1);
  });
}

// Function to end the game
function endGame() {
  clearTimeout(timer); // Stop timer if game ends early
  console.log("\nGame Over!");
  console.log(`Correct answers: ${score.correct}`);
  console.log(`Incorrect answers: ${score.incorrect}`);

  rl.question("\nDo you want to play again? (yes/no): ", (input) => {
    if (input.toLowerCase() === "yes") {
      // Reset score and start again
      score.correct = 0;
      score.incorrect = 0;
      startGame();
    } else {
      console.log("Thanks for playing! Goodbye!");
      rl.close();
    }
  });
}

// Start the game
startGame();
