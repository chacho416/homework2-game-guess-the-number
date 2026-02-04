let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const resultParas = document.querySelectorAll('.resultParas p');

let guessCount = 1;
let resetButton;

function checkGuess() {
    const userGuess = Number(guessField.value);
    if (!userGuess) return; // evita entradas vacías o no numéricas

    if (guessCount === 1) {
        guesses.textContent = 'Conjeturas previas: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = '¡Felicidades! ¡Acertaste!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '¡FIN DEL JUEGO!';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = '';
        setGameOver();
    } else {
        lastResult.textContent = 'Incorrecto';
        lastResult.style.backgroundColor = 'red';
        lowOrHi.textContent = userGuess < randomNumber ? '¡Demasiado bajo!' : '¡Demasiado alto!';
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Comenzar nuevo juego';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;

    for (let i = 0; i < resultParas.length; i++) {
        resultParas[i].textContent = '';
    }

    if (resetButton && resetButton.parentNode) {
        resetButton.parentNode.removeChild(resetButton);
    }

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
    guesses.textContent = '';
    lowOrHi.textContent = '';
}

// Inicialización: limpiar paras y enfocar campo
for (let i = 0; i < resultParas.length; i++) {
    resultParas[i].textContent = '';
}
guessField.focus();