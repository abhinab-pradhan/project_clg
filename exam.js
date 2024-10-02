let questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], answer: 2 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: 1 },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Tolkien"], answer: 0 },
    { question: "What is the square root of 16?", options: ["2", "4", "6", "8"], answer: 1 },
    { question: "Which is the smallest prime number?", options: ["1", "2", "3", "5"], answer: 1 },
    { question: "What is the chemical symbol for water?", options: ["HO", "H2O", "O2H", "H2O2"], answer: 1 },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 }
];

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);
let timeLeft = 900; // 15 minutes in seconds

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    startTimer();
});

function loadQuestion() {
    document.getElementById("question-number").innerText = currentQuestion + 1;
    let questionContainer = document.getElementById("question-container");
    let question = questions[currentQuestion];
    
    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        ${question.options.map((option, index) => `
            <label>
                <input type="radio" name="answer" value="${index}" ${selectedAnswers[currentQuestion] === index ? 'checked' : ''}> ${option}
            </label><br>
        `).join('')}
    `;

    // Enable or disable navigation buttons
    document.getElementById("prev-btn").disabled = currentQuestion === 0;
    document.getElementById("next-btn").disabled = currentQuestion === questions.length - 1;
    
    // Show submit button if on the last question
    if (currentQuestion === questions.length - 1) {
        document.getElementById("next-btn").style.display = "none";
        document.getElementById("submit-btn").style.display = "inline-block";
    } else {
        document.getElementById("next-btn").style.display = "inline-block";
        document.getElementById("submit-btn").style.display = "none";
    }
}

function prevQuestion() {
    saveAnswer();
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function nextQuestion() {
    saveAnswer();
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function saveAnswer() {
    let selected = document.querySelector('input[name="answer"]:checked');
    if (selected) {
        selectedAnswers[currentQuestion] = parseInt(selected.value);
    }
}

function startTimer() {
    let timerElement = document.getElementById("timer");
    let timerInterval = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();  // Automatically submit when the time runs out
        }
    }, 1000);
}

function submitExam() {
    saveAnswer();
    
    // Calculate the result
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer) {
            correctAnswers++;
        }
    });

    // Store the results in localStorage
    localStorage.setItem('correctAnswers', correctAnswers);
    localStorage.setItem('totalQuestions', questions.length);

    // Redirect to result page
    window.location.href = "result.html"; 
}

