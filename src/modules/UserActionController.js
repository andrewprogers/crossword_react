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
      key = key.toUpperCase();
      this.state.userLetters[this.state.selectedCellRow][this.state.selectedCellColumn] = key;
      newState.userLetters = this.state.userLetters;
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
}

export default UserActionController;
