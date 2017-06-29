import React from 'react';
import CrosswordGrid from './CrosswordGrid';
import CluesContainer from './CluesContainer';
import Crossword from '../modules/Crossword'

class CrosswordContainer extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder to be removed in the future
    let size = this.props.initialPuzzle.size.rows;

    this.state = {
      puzzle: this.props.initialPuzzle,
      grid: this.parseArrayToGrid(this.props.initialPuzzle.grid),
      selectedCellRow: 0,
      selectedCellColumn: 0,
      clueDirection: "across",
      userLetters: this.generateEmptyGrid(size),
      c: new Crossword(this.props.initialPuzzle.grid,this.props.initialPuzzle.clues)
    }
    this.updateSelectedCell = this.updateSelectedCell.bind(this);
    this.changeClueDirection = this.changeClueDirection.bind(this);
    this.updateUserLetters = this.updateUserLetters.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  parseArrayToGrid(puzzleArray) {
    let size = Math.sqrt(puzzleArray.length)
    let newGrid = []
    for (var i = 0; i < size; i++) {
      let start = i * size
      newGrid.push(puzzleArray.slice(start, start + size))
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

  updateUserLetters(letter) {
    let old = this.state.userLetters
    let newLetters = [];
    for (var i = 0; i < old.length; i++) {
      newLetters.push(old[i].slice())
    }
    newLetters[this.state.selectedCellRow][this.state.selectedCellColumn] = letter.toUpperCase();
    this.setState({userLetters: newLetters});
  }

  handleKeyDown(event) {
    let key = event.key
    if (key.match(/[a-z]/) && key.length === 1){
      this.updateUserLetters(key)
    } else {
      switch (key) {
        case 'Backspace':
          this.updateUserLetters('');
          break;
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          console.log(key);
          break;
        default:
      }
    }
  }

  updateSelectedCell(row, column) {
    this.setState({
      selectedCellRow: row,
      selectedCellColumn: column
    })
  }

  changeClueDirection(newDirection) {
    if (newDirection === undefined) {
      newDirection = (this.state.clueDirection === 'across') ? 'down' : 'across'
    }
    this.setState({clueDirection: newDirection})
  }

  createGridNums() {
    let grid = this.state.grid;
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

  render() {
    debugger;
    let gridNums = this.createGridNums();

    return(
      <div id='crossword-container' className="row">
        <div className='small-12 large-6 columns'>
          <CrosswordGrid
            grid={this.state.grid}
            gridNums={gridNums}
            selectedCellRow={this.state.selectedCellRow}
            selectedCellColumn={this.state.selectedCellColumn}
            clueDirection={this.state.clueDirection}
            onCellChange={this.updateSelectedCell}
            changeClueDirection={this.changeClueDirection}
            userLetters={this.state.userLetters}
            handleKeyDown={this.handleKeyDown} />
        </div>
        <div className='small-12 large-6 columns'>
          <CluesContainer
            grid={this.state.grid}
            clues={this.state.puzzle.clues}
            gridNums={gridNums}
            selectedCellRow={this.state.selectedCellRow}
            selectedCellColumn={this.state.selectedCellColumn}
            clueDirection={this.state.clueDirection}
            onClueClick={this.updateSelectedCell}
            changeClueDirection={this.changeClueDirection} />
        </div>
      </div>

    )
  }
}

debugger;

export default CrosswordContainer;
