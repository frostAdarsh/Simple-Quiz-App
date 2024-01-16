const questions = [
  {
    question: "The largest sugar mill in Asia is located",
    answers: [
      { text: " Karnataka", correct: "false" },
      { text: " U.P", correct: "true" },
      { text: " West Bengal", correct: "false" },
      { text: " Maharashtra", correct: "false" },
    ],
  },
  {
    question: "International Commonwealth Day is celebrated every year on",
    answers: [
      { text: " 22 May", correct: "false" },
      { text: " 23 May", correct: "false" },
      { text: " 24 May", correct: "true" },
      { text: " 25 May", correct: "false" },
    ],
  },

  {
    question:
      "The Maitree Express and Bandhan Express trains connect India with which of the following countries?",
    answers: [
      { text: " Mynamar", correct: "false" },
      { text: " Pakistan", correct: "false" },
      { text: " Nepal", correct: "false" },
      { text: " Bangladesh", correct: "true" },
    ],
  },

  {
    question: " SEBI was set up in",
    answers: [
      { text: " 1992", correct: "true" },
      { text: " 1980", correct: "fales" },
      { text: " 1984", correct: "false" },
      { text: " 1988", correct: "false" },
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ' .' + currentQuestion.question
   

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    if(isCorrect){
        selectBtn.classList.add('correct');
        score++;
    }else{
        selectBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length};`
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();