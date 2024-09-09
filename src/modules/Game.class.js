'use strict';

// const r = require("@mate-academy/jest-mochawesome-reporter");

class Game {
  static STATUS = {
    idle: 'idle',
    playing: 'playing',
    win: 'win',
    lose: 'lose',
  };

  constructor(
    initialState = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ) {
    this.status = Game.STATUS.idle;
    this.initialState = initialState;
    this.state = initialState.map((row) => [...row]);
    this.score = 0;
  }

  checkScore() {
    if (this.score === 2048) {
      this.status = Game.STATUS.win;
    }
  }

  updateTable() {
    const tableRows = document.querySelectorAll('.field-row');

    this.state.forEach((row, rowIndex) => {
      const cells = tableRows[rowIndex].querySelectorAll('.field-cell');

      row.forEach((cellValue, colIndex) => {
        const cell = cells[colIndex];

        if (cellValue <= 0) {
          cell.textContent = '';
          cell.className = 'field-cell';
        } else {
          cell.textContent = `${cellValue}`;
          cell.className = `field-cell field-cell--${cellValue}`;
        }
      });
    });
  }

  moveLeft() {
    this.state = this.state.map((row) => {
      for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1] && row[i] !== 0) {
          row[i] = row[i] + row[i + 1];
          row[i + 1] = 0;
          this.score += row[i];
        }
      }
    });

    this.checkScore();
    this.getRundomCellNumber();
    this.updateTable();
  }

  moveRight() {
    this.state = this.state.map((row) => {
      for (let i = row.length - 1; i > 0; i--) {
        if (row[i] === row[i - 1] && row[i] !== 0) {
          row[i] = row[i] + row[i - 1];
          row[i - 1] = 0;
          this.score += row[i];
        }
      }
    });

    this.checkScore();
    this.getRundomCellNumber();
    this.updateTable();
  }

  moveUp() {
    for (let col = 0; col < 4; col++) {
      let column = [];

      for (let row = 0; row < 4; row++) {
        if (this.state[row][col] !== 0) {
          column.push(this.state[row][col]);
        }
      }

      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] = column[i] + column[i + 1];
          column[i + 1] = 0;
          this.score += column[i];
        }
      }

      column = column.filter((value) => value !== 0);

      for (let row = 0; row < 4; row++) {
        this.state[row][col] = column[row] || 0;
      }
    }

    this.checkScore();
    this.getRundomCellNumber();
    this.updateTable();
  }

  moveDown() {
    for (let col = 0; col < 4; col++) {
      let column = [];

      for (let row = 0; row < 4; row++) {
        if (this.state[row][col] !== 0) {
          column.push(this.state[row][col]);
        }
      }

      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] = 0;
          column[i + 1] = column[i] + column[i + 1];
          this.score += column[i + 1];
        }
      }

      column = column.filter((value) => value !== 0);

      for (let row = 0; row < 4; row++) {
        this.state[row][col] = column[row] || 0;
      }
    }

    this.checkScore();
    this.getRundomCellNumber();
    this.updateTable();
  }

  getScore() {
    return this.score;
  }

  getState() {
    return this.state;
  }

  getStatus() {
    return this.status;
  }

  start() {
    this.status = Game.STATUS.playing;
    this.getRundomCellNumber();
    this.getRundomCellNumber();
    this.updateTable();
  }

  restart() {
    this.status = Game.STATUS.idle;
    this.state = this.initialState.map((row) => [...row]);
    this.score = 0;

    this.updateTable();
  }

  getRundomCellNumber() {
    const emptyCells = [];

    this.state.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) {
          emptyCells.push([rowIndex, colIndex]);
        }
      });
    });

    if (emptyCells.length === 0) {
      this.status = Game.STATUS.lose;
    } else {
      const [randomRow, randomCol] =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];

      this.state[randomRow][randomCol] = Math.random() < 0.9 ? 2 : 4;

      this.addNumberToBord(
        randomRow,
        randomCol,
        this.state[randomRow][randomCol],
      );
    }
  }

  addNumberToBord(row, column, value) {
    const rows = [...document.querySelectorAll('.field-row')];

    if (row < rows.length) {
      const cells = rows[row].querySelectorAll('.field-cell');

      if (column < cells.length) {
        const cell = cells[column];

        cell.textContent = value;
        cell.classList.add(`field-cell--${value}`);
      }
    }
  }
}

module.exports = Game;
