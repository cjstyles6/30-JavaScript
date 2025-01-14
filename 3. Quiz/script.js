const questions = [
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: "false" },
      { text: "Elephant", correct: "false" },
      { text: "Blue Whale", correct: "true" },
      { text: "Giraffe", correct: "false" },
    ],
  },
  {
    question: "Which is largest continent in the world?",
    answers: [
      { text: "North America", correct: "false" },
      { text: "Europe", correct: "false" },
      { text: "Asia", correct: "true" },
      { text: "South America", correct: "false" },
    ],
  },
  {
    question: "Which one is Prime Number?",
    answers: [
      { text: "10", correct: "false" },
      { text: "11", correct: "true" },
      { text: "9", correct: "false" },
      { text: "12", correct: "false" },
    ],
  },
  {
    question: "Which is smallest planet in Solar System?",
    answers: [
      { text: "Mercury", correct: "true" },
      { text: "Venus", correct: "false" },
      { text: "Earth", correct: "false" },
      { text: "Mars", correct: "false" },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    ShowScore();
  }
}

function ShowScore() {
  resetState();
  questionElement.innerHTML = `You Scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
