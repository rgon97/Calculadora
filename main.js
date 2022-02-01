//Declaracion de variables
var num1 = 0;
var num2 = 0;
var pantalla = 0;
var historico = "1\n1";
var opera;
console.log(historico);

//Función que coloca el número presionado
function darNumero(numero) {
   console.log(numero);
   if (num1 == 0 && num1 !== '0.') {
      num1 = numero;
   } else {
      num1 += numero;
   }
   refrescar(num1);
}

//Función que coloca la coma al presionar dicho botón
function darComa() {
   if (num1 == 0) {
      num1 = '0.';
   } else if (num1.indexOf('.') == -1) {
      num1 += '.';
   }
   refrescar(num1);
}

//Función que coloca la C al presionar dicho botón
function darC() {
   num1 = 0;
   num2 = 0;
   refrescar(num1);
}


//Esta función realiza las distintas operaciones aritméticas en función del botón pulsado
function operar(valor) {
   console.log(valor);
   if (num1 == 0) {
      num1 = parseFloat(document.getElementById("valor_numero").value);
   }
   num2 = parseFloat(num1);
   num1 = 0;
   opera = valor;
}

//Función para pulsar igual
/*
suma = 1
resta = 2
multiplicacion = 3
division = 4
potencia = 5
*/

function esIgual() {
   console.log(num1);
   // convertimos a comillas el numero para evitar un posible error por truncamiento, ya que al decir que un número con comillas es entero, perderá el valor fraccionado
   num1 = parseFloat(num1);
   // evalua las posibles operaciones matemáticas a realizar
   switch (opera) {
      case 1:
         pantalla = num1 + '+'+ num2 + '=' + (parseFloat(num1) + parseFloat(num2));
         num1 += num2;
         break;
      case 2:
         pantalla = num1 + '-'+ num2 + '=' + (parseFloat(num1) - parseFloat(num2));
         num1 = num2 - num1;
         
         break;
      case 3:
         num1 *= num2;
         break;
      case 4:
         num1 = num2 / num1;
         break;
      case 5:
         num1 = Math.pow(num2, num1);
         break;
   }
   refrescar(pantalla);
   num2 = parseFloat(num1);
   num1 = 0;
}

function refrescar(x) {
   document.getElementById("valor_numero").value = x;
}

//JS Piedra, papel o tijera
'use strict';
//Variables
const playerEl = document.querySelector('.player');
const computerEl = document.querySelector('.computer-option');
const nextRound = document.querySelector('#next-round');
const message = document.querySelector('.message');
const PlayerBtns = document.querySelectorAll('.player-option');

let gameActive = true;
let winner, computer;

const rps = [
  {
    option: `rock`,
    html: `<i class="far fa-hand-rock fa-7x"></i>`,
    bgColor: `linear-gradient(to top left, #e52a5a, #ff585f)`,
  },
  {
    option: `paper`,
    html: `<i class="far fa-hand-paper fa-7x"></i>`,
    bgColor: `linear-gradient(to top left, #39b385, #9be15d)`,
  },
  {
    option: `scissors`,
    html: `<i class="far fa-hand-scissors fa-7x"></i>`,
    bgColor: `linear-gradient(to top left, #ffb003, #ffcb03)`,
  },
];

//Clicking buttons
playerEl.addEventListener('click', function (e) {
  if (gameActive) {
    const clicked = e.target.closest('.player-option');
    if (!clicked) return;
    let player = clicked.dataset.options;
    //Guard clause

    computerRandom();
    compare(player, computer);
    gameActive = false;
    PlayerBtns.forEach((btn) => (btn.style.cursor = 'default'));
  }
});

//Random generator
const computerRandom = () => {
  let randomNumber = Math.floor(Math.random() * rps.length);

  computer = rps[randomNumber].option;
  computerEl.innerHTML = rps[randomNumber].html;
  computerEl.style.background = rps[randomNumber].bgColor;
  return computer;
};

//comparison
const compare = (player, computer) => {
  if (player === computer) {
    //tie
    message.textContent = `Tie!`;
    message.style.opacity = 1;
  } else if (player === `rock` && computer === `paper`) {
    winner = computer;
    win();
  } else if (player === `rock` && computer === `scissors`) {
    winner = player;
    win();
  } else if (player === `paper` && computer === `rock`) {
    winner = player;
    win();
  } else if (player === `paper` && computer === `scissors`) {
    winner = computer;
    win();
  } else if (player === `scissors` && computer === `rock`) {
    winner = computer;
    win();
  } else if (player === `scissors` && computer === `paper`) {
    winner = player;
    win();
  }
};

//Game won function
const win = () => {
  if (winner === computer) {
    message.textContent = `You Lost!`;
    message.style.opacity = 1;
  } else {
    message.textContent = `You Won!`;
    message.style.opacity = 1;
  }
};

//next round button
nextRound.addEventListener('click', function () {
  computerEl.innerHTML = ``;
  computerEl.style.background = `linear-gradient(to top left, #c8c8c8, #a8a7a7)`;
  message.style.opacity = 0;
  message.textContent = ``;
  gameActive = true;
  PlayerBtns.forEach((btn) => (btn.style.cursor = 'pointer'));
});
