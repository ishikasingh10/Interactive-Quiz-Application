const questions = [
  {
    question: "What does HTML stand for?",
    answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    answers: ["HTML", "JQuery", "CSS"],
    correct: 2
  },
  {
    question: "What does JS stand for?",
    answers: ["JavaScript", "JavaSource", "JustScript"],
    correct: 0
  },
  {
    question: "Which is not a JavaScript framework?",
    answers: ["React", "Angular", "Laravel"],
    correct: 2
  }, // ✅ Added missing comma here
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    answers: ["<a>", "<link>", "<href>"],
    correct: 0
  },
  {
    question: "Which property is used to change the background color in CSS?",
    answers: ["color", "background-color", "bgcolor"],
    correct: 1
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Google", "Netscape", "Microsoft"],
    correct: 1
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["<script>", "<js>", "<javascript>"],
    correct: 0
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    answers: ["//", "/* */", "#"],
    correct: 0
  },
  {
    question: "Which method is used to select an element by ID in JavaScript?",
    answers: ["getElementById()", "querySelector()", "getElementsByClassName()"],
    correct: 0
  }
]; // ✅ Removed the extra closing bracket

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timeEl = document.getElementById("time");
const progressEl = document.getElementById("progress");
const resultContainer = document.getElementById("result-container");
const questionContainer = document.getElementById("question-container");
const scoreText = document.getElementById("score-text");

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  resultContainer.classList.add("hidden");
  questionContainer.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();
  const current = questions[currentQuestion];
  questionEl.textContent = current.question;

  current.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(btn);
  });

  progressEl.style.width = `${((currentQuestion) / questions.length) * 100}%`;
  startTimer();
}

function resetState() {
  answersEl.innerHTML = "";
  clearInterval(timer);
  timeLeft = 15;
  timeEl.textContent = timeLeft;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      disableOptions();
      nextQuestion();
    }
  }, 1000);
}

function selectAnswer(index) {
  const correctIndex = questions[currentQuestion].correct;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((btn, i) => {
    if (i === correctIndex) {
      btn.classList.add("correct");
    } else if (i === index) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  });

  if (index === correctIndex) {
    score++;
  }

  clearInterval(timer);
  setTimeout(nextQuestion, 1000);
}

function disableOptions() {
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreText.textContent = `You scored ${score} out of ${questions.length}`;
  progressEl.style.width = `100%`;
}

document.getElementById("restart-btn").addEventListener("click", startQuiz);

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Start the quiz on page load
startQuiz();
