const questionsData = [
    {
        question: "What are two things you can never eat for breakfast?",
        a: "Lunch and Breakfast",
        b: "Lunch and Dinner",
        c: "Breakfast and Dinner",
        d: "Dinner and Breakfast",
        correct: "b"
    },
    {
        question: "What is always coming but never arrives? ",
        a: "Tomorrow",
        b: "Yesterday",
        c: "Today",
        d: "No correct answer",
        correct: "a"
    },
    {
        question: "What is it that lives if it is fed, and dies if you give it a drink?",
        a: "Forest",
        b: "Water",
        c: "Fire",
        d: "Sea",
        correct: "c"
    },
    {
        question: "What goes up but never ever comes down?",
        a: "Immunity",
        b: "Thrown thing",
        c: "Sun",
        d: "Age",
        correct: "d"
    },
    {
        question: "What can one catch that is not thrown?",
        a: "Cold",
        b: "Breakfast",
        c: "Ball",
        d: "No correct answer",
        correct: "a"
    },
];

const refs = {
    question: document.getElementById('question'),
    aText: document.getElementById('a-text'),
    bText: document.getElementById('b-text'),
    cText: document.getElementById('c-text'),
    dText: document.getElementById('d-text'),
    submitBtn: document.getElementById('button'),
    answer: document.querySelectorAll('.answer'),
    quizWrapper: document.querySelector('.wrapper'),
}

let questionData = 0;
let score = 0;

loadQuiz();

refs.submitBtn.addEventListener('click', onSubmitBtnClick);

function loadQuiz() {
    updateRadioSelect();

    const currentQuestion = questionsData[questionData];
    refs.question.innerHTML = currentQuestion.question;
    refs.aText.innerHTML = currentQuestion.a;
    refs.bText.innerHTML = currentQuestion.b;
    refs.cText.innerHTML = currentQuestion.c;
    refs.dText.innerHTML = currentQuestion.d; 
}

function updateRadioSelect(){
    refs.answer.forEach(ans => {
        ans.checked = false;
    });
}

function selectedVariant() {
    let answer = undefined;

    refs.answer.forEach(ans => {
        if (ans.checked) {
            answer = ans.id;
        } 
    });
    
    return answer;
}

function onSubmitBtnClick() {
    let answer = selectedVariant();

    if (answer === undefined) {
        alert("Please choose your variant");
        return;
    }

    if (answer === questionsData[questionData].correct) {

        score += 1;
    }

    questionData += 1;

    if (questionData < questionsData.length) {
        loadQuiz();
    } else {
        refs.quizWrapper.innerHTML = 
            `<h2 class="question">Quiz is finished. Your result is ${score} / ${questionsData.length}</h2>
<button class="button" onclick="location.reload()">Reload</button>`
    };
}