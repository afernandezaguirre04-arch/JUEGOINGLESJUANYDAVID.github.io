// ==========================================
// 1. FUNCIÓN DE BARAJADO (Fisher-Yates)
// ==========================================
function shuffleArray(array) {
    var newArray = array.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
    }
    return newArray;
}

// ==========================================
// 2. BANCO DE VOCABULARIO
// ==========================================
const vocabData = [
    // Página 1
    { en: 'can', es: 'poder', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'could', es: 'podía / podría(s)', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'must', es: 'deber', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'should', es: 'debería', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'brother', es: 'hermano', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'grandfather', es: 'abuelo', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'grandmother', es: 'abuela', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'parents', es: 'padres', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'uncle', es: 'tio', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'husband', es: 'marido', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'niece', es: 'sobrina', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'wife', es: 'mujer', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'father', es: 'padre', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'mother', es: 'madre', cat: 'Página 1 (Verbos modales y Familia)' },
    { en: 'stepson', es: 'hijastro', cat: 'Página 1 (Verbos modales y Familia)' },
    // Página 3
    { en: 'catch', es: 'Alcanzar, coger, pillar', cat: 'Página 3 (Vocabulario policial/crímenes)' },
    // Página 4
    { en: 'while', es: 'mientras', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'was', es: 'Estaba', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'when', es: 'cuando', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'what', es: 'que', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'which', es: 'cual', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'where', es: 'donde', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'why', es: 'porque', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'who', es: 'quien', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'how', es: 'como', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'How often', es: 'con qué frecuencia', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'How long', es: 'cuánto tiempo', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'How much', es: 'cuánto', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'How many', es: 'cuántos', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    { en: 'what time', es: 'a qué hora', cat: 'Página 4 (Conectores y Partículas interrogativas)' },
    // Página 6
    { en: 'clean up', es: 'limpiar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'cut down', es: 'talar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'damage', es: 'dañar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'donate', es: 'donar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'endanger', es: 'poner en peligro', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'fix', es: 'arreglar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'pick up', es: 'recoger', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'plant', es: 'plantar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'recycle', es: 'reciclar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'replace', es: 'reemplazar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'reuse', es: 'reutilizar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'throw', es: 'tirar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'use', es: 'gastar/usar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    { en: 'waste', es: 'desperdiciar', cat: 'Página 6 (Medio ambiente / Verbos)' },
    // Página 8
    { en: 'believe', es: 'Creer', cat: 'Página 8 (Verbos variados)' },
    { en: 'borrow', es: 'pedir prestado / tomar prestado', cat: 'Página 8 (Verbos variados)' },
    { en: 'crawl', es: 'arrastrarse', cat: 'Página 8 (Verbos variados)' },
    { en: 'cry', es: 'llorar', cat: 'Página 8 (Verbos variados)' },
    { en: 'forget', es: 'olvidar', cat: 'Página 8 (Verbos variados)' },
    { en: 'keep', es: 'mantener', cat: 'Página 8 (Verbos variados)' },
    { en: 'laugh', es: 'reír', cat: 'Página 8 (Verbos variados)' },
    { en: 'lend', es: 'dejar', cat: 'Página 8 (Verbos variados)' },
    { en: 'open', es: 'abrir', cat: 'Página 8 (Verbos variados)' },
    { en: 'promise', es: 'prometer', cat: 'Página 8 (Verbos variados)' },
    { en: 'purchase', es: 'comprar', cat: 'Página 8 (Verbos variados)' },
    { en: 'remember', es: 'recordar', cat: 'Página 8 (Verbos variados)' },
    { en: 'return', es: 'volver', cat: 'Página 8 (Verbos variados)' },
    { en: 'sell', es: 'vender', cat: 'Página 8 (Verbos variados)' },
    { en: 'shut', es: 'Cerrar', cat: 'Página 8 (Verbos variados)' },
    { en: 'smile', es: 'Sonrisa / sonreír', cat: 'Página 8 (Verbos variados)' }
];

// ==========================================
// 3. ELEMENTOS DEL DOM
// ==========================================
var mainMenu = document.getElementById('main-menu');
var quizMain = document.getElementById('quiz-main');
var playerNameInput = document.getElementById('player-name');
var startBtn = document.getElementById('start-game-btn');

var questionContainer = document.getElementById('question-container');
var categoryText = document.getElementById('category-text');
var questionText = document.getElementById('question-text');
var answerButtonsElement = document.getElementById('answer-buttons');

var statsBar = document.querySelector('.stats-bar'); 
var quizFooter = document.querySelector('.quiz-footer');
var prevButton = document.getElementById('prev-btn');
var menuButton = document.getElementById('menu-btn');
var nextButton = document.getElementById('next-btn');

var scoreText = document.getElementById('score-text');
var errorsText = document.getElementById('errors-text'); 
var endGameControls = document.getElementById('end-game-controls');
var resultText = document.getElementById('result-text');
var restartButton = document.getElementById('restart-btn');
var quizTitle = document.getElementById('quiz-title');

var scoreboardContainer = document.getElementById('scoreboard-container');
var scoresList = document.getElementById('scores-list');
var viewScoresBtn = document.getElementById('view-scores-btn');
var closeScoresBtn = document.getElementById('close-scores-btn');
var clearScoresBtn = document.getElementById('clear-scores-btn');

// ==========================================
// 4. VARIABLES DEL QUIZ
// ==========================================
var playerName = '';
var gameQuestions = []; 
var currentQuestionIndex;
var score = 0;
var errors = 0; 
var totalQuestions = 0; 
var scoreHistory = {}; 
var errorDetails = []; // Cesta para las palabras falladas

// ==========================================
// 5. LÓGICA DE GENERACIÓN
// ==========================================
function generateQuiz() {
    let shuffledVocab = shuffleArray(vocabData);
    let totalItems = shuffledVocab.length;
    
    // 70% Español a Inglés
    let esToEnCount = Math.floor(totalItems * 0.7);
    let generatedQuestions = [];

    shuffledVocab.forEach((item, index) => {
        let isEsToEn = index < esToEnCount;
        let questionWord = isEsToEn ? item.es : item.en;
        let correctWord = isEsToEn ? item.en : item.es;
        
        let sameCategoryDistractors = vocabData.filter(v => v !== item && v.cat === item.cat);
        let finalDistractors = [];
        
        if (sameCategoryDistractors.length >= 2) {
            finalDistractors = shuffleArray(sameCategoryDistractors).slice(0, 2);
        } else {
            finalDistractors = [...sameCategoryDistractors];
            let otherCategoryDistractors = vocabData.filter(v => v !== item && v.cat !== item.cat);
            let shuffledOthers = shuffleArray(otherCategoryDistractors);
            while (finalDistractors.length < 2) {
                finalDistractors.push(shuffledOthers.pop());
            }
        }
        
        let answers = [
            { text: correctWord, correct: true },
            { text: isEsToEn ? finalDistractors[0].en : finalDistractors[0].es, correct: false },
            { text: isEsToEn ? finalDistractors[1].en : finalDistractors[1].es, correct: false }
        ];

        generatedQuestions.push({
            category: item.cat,
            question: questionWord,
            answers: shuffleArray(answers),
            isAnswered: false,
            userAnswerText: null
        });
    });

    return shuffleArray(generatedQuestions);
}

// ==========================================
// 6. FUNCIONES PRINCIPALES DEL QUIZ
// ==========================================
function startGame() {
    playerName = playerNameInput.value.trim();
    if (playerName === "") {
        alert("Por favor, introduce tu nombre antes de empezar.");
        return;
    }
    
    gameQuestions = generateQuiz();
    totalQuestions = gameQuestions.length;

    mainMenu.classList.add('hide');
    endGameControls.classList.add('hide');
    scoreboardContainer.classList.add('hide');
    quizMain.classList.remove('hide');
    quizFooter.classList.remove('hide');
    statsBar.classList.remove('hide'); 

    score = 0;
    errors = 0;
    errorDetails = []; 
    scoreHistory = {};
    updateStats(); 
    
    quizTitle.innerText = "¡A jugar, " + playerName + "!";
    currentQuestionIndex = 0;
    showQuestion(gameQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    categoryText.innerText = question.category;
    questionText.innerText = question.question; 

    if (currentQuestionIndex > 0) {
        prevButton.classList.remove('invisible');
    } else {
        prevButton.classList.add('invisible');
    }
    
    if (question.isAnswered) {
        if (gameQuestions.length > currentQuestionIndex + 1) {
            nextButton.innerText = "Siguiente";
        } else {
            nextButton.innerText = "Finalizar Quiz";
        }
        nextButton.classList.remove('invisible');
    } else {
        nextButton.classList.add('invisible');
    }

    question.answers.forEach(function(answer) {
        var button = document.createElement('button');
        button.innerText = answer.text; 
        button.classList.add('btn');
        
        if (answer.correct) {
            button.dataset.correct = true; 
        }
        
        if (!question.isAnswered) {
             button.addEventListener('click', selectAnswer);
        }
       
        answerButtonsElement.appendChild(button);
    });

    if (question.isAnswered) {
        for (var i = 0; i < answerButtonsElement.children.length; i++) {
            var btn = answerButtonsElement.children[i];
            btn.disabled = true; 
            setStatusClass(btn, btn.dataset.correct === "true"); 
        }
    }
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct === "true";
    var selectedText = selectedButton.innerText; 

    var currentQuestion = gameQuestions[currentQuestionIndex];
    var firstAttempt = !currentQuestion.isAnswered;
    
    currentQuestion.isAnswered = true;
    currentQuestion.userAnswerText = selectedText; 

    if (correct) {
        scoreHistory[currentQuestionIndex] = 1;
    } else {
        scoreHistory[currentQuestionIndex] = 0;
        if (firstAttempt) { 
            errors++;
            
            // --- ACTUALIZADO: CAPTURAR EL ERROR SÚPER DETALLADO ---
            let correctAnswerText = currentQuestion.answers.find(a => a.correct === true).text;
            // Lo guardamos en formato: Pregunta (respondió: X, era: Y)
            errorDetails.push(currentQuestion.question + " (respondió: " + selectedText + ", era: " + correctAnswerText + ")");
        }
    }
    recalculateScore(); 
    updateStats(); 

    for (var i = 0; i < answerButtonsElement.children.length; i++) {
        var button = answerButtonsElement.children[i];
        button.disabled = true; 
        setStatusClass(button, button.dataset.correct === "true");
    }

    if (gameQuestions.length > currentQuestionIndex + 1) {
        nextButton.innerText = "Siguiente";
    } else {
        nextButton.innerText = "Finalizar Quiz";
    }
    nextButton.classList.remove('invisible'); 
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        if (element.disabled) { 
             var answeredText = gameQuestions[currentQuestionIndex].userAnswerText;
             if (element.innerText === answeredText && !correct) {
                 element.classList.add('wrong');
             }
        }
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function recalculateScore() {
    score = 0;
    for (var key in scoreHistory) {
        score += scoreHistory[key];
    }
}

function updateStats() {
    scoreText.innerText = 'Puntuación: ' + score + ' / ' + totalQuestions;
    errorsText.innerText = 'Errores: ' + errors; 
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < gameQuestions.length) {
        showQuestion(gameQuestions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function showPrevQuestion() {
    currentQuestionIndex--;
    showQuestion(gameQuestions[currentQuestionIndex]);
}

function endQuiz() {
    questionContainer.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    quizFooter.classList.add('hide');
    statsBar.classList.add('hide'); 
    document.getElementById('quiz-header').classList.add('hide');
    
    var finalScore = (score / totalQuestions) * 10;
    resultText.innerHTML = '<h2>¡Juego completado, ' + playerName + '!</h2><p>Tu puntuación final es: ' + score + ' de ' + totalQuestions + '.</p><p>Total de errores (al primer intento): ' + errors + '</p><h3>Nota: ' + finalScore.toFixed(1) + '/10</h3>';
    
    saveScoreToHistory(finalScore.toFixed(1));
    
    endGameControls.classList.remove('hide');
}

function showMainMenu() {
    quizMain.classList.add('hide');
    quizFooter.classList.add('hide'); 
    statsBar.classList.add('hide'); 
    endGameControls.classList.add('hide');
    scoreboardContainer.classList.add('hide');
    
    document.getElementById('quiz-header').classList.remove('hide');
    questionContainer.classList.remove('hide');
    answerButtonsElement.classList.remove('hide');
    
    mainMenu.classList.remove('hide');
    playerNameInput.value = ''; 
}

// ==========================================
// 7. LÓGICA DE REGISTRO DE PUNTUACIONES
// ==========================================
function saveScoreToHistory(grade) {
    var history = JSON.parse(localStorage.getItem('englishQuizScores')) || {};
    if (!history[playerName]) { history[playerName] = []; }
    var fechaActual = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Convertimos la cesta de errores detallados en texto para Sheets
    var errorString = errorDetails.length > 0 ? errorDetails.join(', ') : 'Ninguno';
    
    history[playerName].push({
        score: score,
        total: totalQuestions,
        errors: errors,
        errorList: errorString, 
        grade: grade,
        date: fechaActual
    });
    localStorage.setItem('englishQuizScores', JSON.stringify(history));

    // GUARDADO EN LA NUBE (Google Sheets)
    var scriptURL = 'https://script.google.com/macros/s/AKfycbwk-hLFeqDNjVv-hUBAYn_gAV7uwDMP6ETxl2ar_KVIqjOxKv3BT86TlcNm7Tp5NozxnA/exec'; 
    
    var data = {
        nombre: playerName,
        nota: grade,
        errores: errors,
        fecha: fechaActual,
        errores_detalle: errorString 
    };

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
    })
    .then(response => console.log('Petición enviada a Google Sheets con detalle completo.'))
    .catch(error => console.error('Error al enviar a Sheets:', error));
}

function showScoreboard() {
    mainMenu.classList.add('hide');
    quizMain.classList.add('hide');
    scoreboardContainer.classList.remove('hide');
    
    var history = JSON.parse(localStorage.getItem('englishQuizScores')) || {};
    scoresList.innerHTML = ''; 
    
    if (Object.keys(history).length === 0) {
        scoresList.innerHTML = '<p style="text-align:center; color:#6c757d; font-size: 1.2em;">Aún no hay puntuaciones registradas.</p>';
        return;
    }
    
    for (var player in history) {
        var partidas = history[player];
        
        partidas.forEach(function(partida, index) {
            var entryDiv = document.createElement('div');
            entryDiv.classList.add('score-entry');
            var numPartida = index + 1;
            
            entryDiv.innerHTML = '<span class="score-name">' + player + ' (Partida ' + numPartida + ')</span><br>' +
                                 '<span class="score-detail">Nota: <strong>' + partida.grade + '/10</strong> | Errores totales: ' + partida.errors + ' | Fecha: ' + partida.date + '</span><br>' +
                                 '<span class="score-detail" style="color: var(--color-incorrecto); font-size: 0.9em; display:block; margin-top: 5px;"><strong>Fallos:</strong> ' + (partida.errorList || 'Ninguno') + '</span>';
            
            scoresList.appendChild(entryDiv);
        });
    }
}

// ==========================================
// 8. EVENT LISTENERS
// ==========================================
startBtn.addEventListener('click', startGame);
playerNameInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') startGame(); });
nextButton.addEventListener('click', showNextQuestion);
prevButton.addEventListener('click', showPrevQuestion);
menuButton.addEventListener('click', showMainMenu); 
restartButton.addEventListener('click', showMainMenu); 
viewScoresBtn.addEventListener('click', showScoreboard);
closeScoresBtn.addEventListener('click', showMainMenu);

clearScoresBtn.addEventListener('click', function() {
    if (confirm('¿Estás seguro de que quieres borrar TODAS las puntuaciones registradas en este ordenador?')) {
        localStorage.removeItem('englishQuizScores');
        showScoreboard(); 
    }
});
