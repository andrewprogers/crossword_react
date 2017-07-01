class Crossword {
  constructor(gridArray, clues, userLetters) {
    this.grid = gridArray
    this.clues = clues;
    this.userLetters = userLetters;
  }

  getGridNums() {
    if (this.gridNums !== undefined){
      return this.gridNums
    }

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
    this.gridNums = gridNums;
    return gridNums;
  }

  getAcrossClues() {
    if (this.acrossClues !== undefined) {
      return this.acrossClues
    }

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
    this.acrossClues = acrossClues;
    return acrossClues;
  }

  getDownClues() {
    if (this.downClues !== undefined) {
      return this.downClues
    }
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
    this.downClues = downClues;
    return downClues;
  }

  getSelectedClue(direction, row, column) {
    let lastIndex = this.grid.length - 1
    if (direction === 'across') {
      let columnStart = column
      while (columnStart > 0 && this.grid[row][columnStart - 1] !== '.') {
        columnStart -= 1;
      }
      let columnEnd = column
      while (columnEnd < lastIndex && this.grid[row][columnEnd + 1] !== '.') {
        columnEnd += 1;
      }
      return ({
        rowStart: row,
        rowEnd: row,
        columnStart: columnStart,
        columnEnd: columnEnd,
        gridNum: this.getGridNums()[row][columnStart]
      })
    } else {
      let rowStart = row;
      while (rowStart > 0 && this.grid[rowStart - 1][column] !== '.') {
        rowStart -= 1;
      }
      let rowEnd = row;
      while (rowEnd < lastIndex && this.grid[rowEnd + 1][column] !== '.') {
        rowEnd += 1;
      }
      return ({
        rowStart: rowStart,
        rowEnd: rowEnd,
        columnStart: column,
        columnEnd: column,
        gridNum: this.getGridNums()[rowStart][column]
      })
    }
  }
}

Crossword.generateEmptyGrid = (size) => {
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

Crossword.parseArrayToGrid = (gridArray) => {
    let size = Math.sqrt(gridArray.length);
    let newGrid = [];
    for (var i = 0; i < size; i++) {
      let start = i * size
      newGrid.push(gridArray.slice(start, start + size))
    }
    return newGrid;
  }

export default Crossword;
