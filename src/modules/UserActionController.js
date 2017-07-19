import Crossword from './Crossword';

class UserActionController {
  constructor(state) {
    this.state = {
      grid: [],
      clues: {},
      userLetters: [],
      selectedCellRow: state.selectedCellRow,
      selectedCellColumn: state.selectedCellColumn,
      clueDirection: state.clueDirection
    }
    for (var i = 0; i < state.grid.length; i++) {
      this.state.grid.push(state.grid[i].slice())
      this.state.userLetters.push(state.userLetters[i].slice())
    }
    this.state.clues = {
      across: state.clues.across.slice(),
      down: state.clues.down.slice()
    }
  }

  keyPress(key) {
    let newState = {}
    let next;
    let crossword = new Crossword(this.state.grid, this.state.clues, this.state.userLetters)
    if (key.match(/[a-zA-Z]/) && key.length === 1){
      Object.assign(newState, this.handleLetter(key));
    } else {
      switch (key) {
        case 'Backspace':
          this.state.userLetters[this.state.selectedCellRow][this.state.selectedCellColumn] = '';
          newState.userLetters = this.state.userLetters;
          break;
        case ' ':
          newState.clueDirection = this.nextDirection();
          break;
        case 'ArrowUp':
          next = crossword.nextCell('up', this.state.selectedCellRow, this.state.selectedCellColumn)
          newState.selectedCellRow = next.row
          newState.selectedCellColumn = next.column
          break;
        case 'ArrowDown':
          next = crossword.nextCell('down', this.state.selectedCellRow, this.state.selectedCellColumn)
          newState.selectedCellRow = next.row
          newState.selectedCellColumn = next.column
          break;
        case 'ArrowLeft':
          next = crossword.nextCell('left', this.state.selectedCellRow, this.state.selectedCellColumn)
          newState.selectedCellRow = next.row
          newState.selectedCellColumn = next.column
          break;
        case 'ArrowRight':
          next = crossword.nextCell('right', this.state.selectedCellRow, this.state.selectedCellColumn)
          newState.selectedCellRow = next.row
          newState.selectedCellColumn = next.column
          break;
        default:

      }
    }
    return newState;
  }

  mouseClick(currentCell) {
    let newState = {};
    if ((currentCell.row === this.state.selectedCellRow)
    && (currentCell.column === this.state.selectedCellColumn)) {
      newState.clueDirection = this.nextDirection();
    } else {
      newState.selectedCellRow = currentCell.row;
      newState.selectedCellColumn = currentCell.column;
    }
    return newState;
  }

  nextDirection() {
    if (this.state.clueDirection === 'across'){
      return 'down';
    } else {
      return 'across';
    }
  }

  handleLetter(key) {
    let newState = {};
    let row = this.state.selectedCellRow;
    let column = this.state.selectedCellColumn;
    let crossword = new Crossword(this.state.grid, this.state.clues, this.state.userLetters)
    let isCellEmpty = (this.state.userLetters[row][column] === '')

    this.state.userLetters[row][column] = key.toUpperCase();
    newState.userLetters = this.state.userLetters;
    let currentClue = crossword.getSelectedClue(this.state.clueDirection, row, column)

    if (!crossword.hasEmptyCells() || (!isCellEmpty && ((currentClue.rowEnd !== row) || (currentClue.columnEnd !== column)))) {
      if ((currentClue.rowEnd !== row) || (currentClue.columnEnd !== column)) {
        let nextCell = crossword.nextCellWithinClue(currentClue, row, column)
        newState.selectedCellRow = nextCell.row;
        newState.selectedCellColumn = nextCell.column;
      } else {
        let nextClue = crossword.nextClue(currentClue)
        newState.selectedCellRow = nextClue.row.start;
        newState.selectedCellColumn = nextClue.column.start;
      }
    } else {
      //crossword has empty cells somewhere
      let nextEmpty = crossword.nextEmptyCellWithinClue(currentClue, row, column)
      while (!nextEmpty) {
        currentClue = crossword.nextClue(currentClue)
        nextEmpty = crossword.nextEmptyCellWithinClue(currentClue, currentClue.row.end, currentClue.column.end)
      }
      newState.selectedCellRow = nextEmpty.row;
      newState.selectedCellColumn = nextEmpty.column;
    }
    if (this.state.clueDirection !== currentClue.direction){
      newState.clueDirection = currentClue.direction();
    }

    return newState;
  }
}

export default UserActionController;
