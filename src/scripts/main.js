'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const score = document.querySelector('.game-score');
const messages = document.querySelectorAll('.message');
const btn = document.querySelector('.button');

function updateScore() {
  const currentScore = game.getScore();

  score.textContent = currentScore;
}

document.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'ArrowRight':
      game.moveRight();
      updateScore();
      break;

    case 'ArrowLeft':
      game.moveLeft();
      updateScore();
      break;

    case 'ArrowUp':
      game.moveUp();
      updateScore();
      break;

    case 'ArrowDown':
      game.moveDown();
      updateScore();
      break;
  }
});

function showMsg() {
  const gameState = game.getStatus();

  if (gameState !== 'idle') {
    const className = `message-${gameState}`;
    const message = document.querySelector(`.${className}`);

    if (message) {
      message.classList.remove('hidden');
    }

    messages.forEach((msg) => {
      if (!msg.classList.contains(className)) {
        msg.classList.add('hidden');
      }
    });
  }
}

function changeBtn() {
  const gameState = game.getStatus();

  if (gameState === 'playing') {
    btn.classList.remove('start');
    btn.classList.add('restart');
    btn.textContent = 'Restart';
  } else {
    btn.classList.remove('restart');
    btn.classList.add('start');
    btn.textContent = 'Start';
  }
}

btn.addEventListener('click', () => {
  if (btn.classList.contains('start')) {
    game.start();
  }

  if (btn.classList.contains('restart')) {
    game.restart();
  }

  changeBtn();
  showMsg();
});
