class Crossword {
  constructor(gridArray, clues) {
    if (Array.isArray(gridArray)) {
      this.grid = this.parseArrayToGrid(gridArray);
      this.clues = clues;
    }
  }

  parseArrayToGrid(gridArray) {
    let size = Math.sqrt(gridArray.length);
    let newGrid = [];
    for (var i = 0; i < size; i++) {
      let start = i * size
      newGrid.push(gridArray.slice(start, start + size))
    }
    return newGrid;
  }

  generateEmptyGrid(size) {
    let emptyLetters = []
    for (var r = 0; r < size ; r++) {
      let row = [];
      for (var c = 0; c < size; c++) {
        row.push('')
      }
      emptyLetters.push(row);
    }
    return emptyLetters;
  }

  getGridNums() {
    let grid = this.grid
    let gridNums = [];
    let currentNumber = 1;

    for (var r = 0; r < grid.length; r++) {
      let rowNums = [];
      for (var c = 0; c < grid.length; c++) {
        if (grid[r][c] === '.') {
          rowNums.push(0);
        } else if ((r === 0) || (c === 0)) {
          rowNums.push(currentNumber);
          currentNumber += 1;
        } else if ( (grid[r-1][c] !== '.') && (grid[r][c-1] !== '.') ) {
          rowNums.push(0);
        } else {
          rowNums.push(currentNumber);
          currentNumber += 1;
        }
      }
      gridNums.push(rowNums);
    }
    return gridNums;
  }

  getAcrossClues() {
    let acrossClues = [];
    let acrossClueTextCopy = this.clues.across.slice();
    let gridNums = this.getGridNums()
    let length = gridNums.length

    for (var r = 0; r < length; r++) {
      for (var c = 0; c < length; c++) {
        if (gridNums[r][c] === 0){
          continue;
        } else {
          if ((c === 0) || (this.grid[r][c - 1] === '.')) {
            let clue = {
              gridNum: gridNums[r][c],
              row: r,
              column: c,
              text: acrossClueTextCopy.shift()
            }
            acrossClues.push(clue)
          }
        }
      }
    }
    return acrossClues;
  }

  getDownClues() {
    let downClues = [];
    let downClueTextCopy = this.clues.down.slice();
    let gridNums = this.getGridNums()
    let length = gridNums.length;

    for (var r = 0; r < length; r++) {
      for (var c = 0; c < length; c++) {
        if (gridNums[r][c] === 0){
          continue;
        } else {
          if ((r === 0) || (this.grid[r - 1][c] === '.')) {
            let clue = {
              gridNum: gridNums[r][c],
              row: r,
              column: c,
              text: downClueTextCopy.shift()
            }
            downClues.push(clue)
          }
        }
      }
    }
    return downClues;
  }

}

export default Crossword;
