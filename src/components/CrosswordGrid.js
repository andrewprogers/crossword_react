import React from 'react';
import Cell from './Cell';
import {createRelativeFontUpdater, getCustomSheetUpdater} from '../modules/dynamicFont'

class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);

    this.size = this.props.grid.length;
    let emptyLetters = []
    for (var r = 0; r < this.size ; r++) {
      let row = [];
      for (var c = 0; c < this.size; c++) {
        row.push('')
      }
      emptyLetters.push(row);
    }

    this.state ={
      userLetters: emptyLetters
    }

    this.updateUserLetters = this.updateUserLetters.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  updateUserLetters(letter) {
    debugger;
    let old = this.state.userLetters
    let newLetters = [];
    for (var i = 0; i < old.length; i++) {
      newLetters.push(old[i].slice())
    }
    newLetters[this.props.selectedCellRow][this.props.selectedCellColumn] = letter.toUpperCase();
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

  createGridNums() {
    let grid = this.props.grid;
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

  createCells() {
    let gridnums = this.createGridNums()
    let puzzleGrid = this.props.grid;
    let cells = this.state.userLetters.map((row, rIndex) => {
      let cellRow = row.map((letter, cIndex) => {
        let cellLetter = (puzzleGrid[rIndex][cIndex] === '.') ? '.' : letter;
        let clickHandler = () => {this.props.onCellChange(rIndex, cIndex)};
        let selected = ((this.props.selectedCellRow === rIndex) && (this.props.selectedCellColumn === cIndex))
        return(
          <Cell
            key={rIndex + " " + cIndex}
            number={gridnums[rIndex][cIndex]}
            letter={cellLetter}
            selected={selected}
            onKeyDown={this.handleKeyDown}
            onClick={clickHandler}
             />
         )
      }, this)
      return cellRow;
    }, this)
    return cells;
  }

  componentDidMount() {
    let gridElement = document.getElementById('grid-container');
    let cellFontUpdater = createRelativeFontUpdater(gridElement, '#grid-container .cell', 1.3 * this.size);
    cellFontUpdater();
    window.addEventListener('resize', cellFontUpdater);

    let updateSheet = getCustomSheetUpdater();
    let pctWidth = (100 / this.size);
    updateSheet(`#grid-container .cell { width: ${pctWidth}%;}`);
  }

  render() {
    let cells = this.createCells();
    return(
      <div className="scale-container">
        <div id="grid-container">
          {cells}
        </div>
      </div>
    )
  }
}

export default CrosswordGrid;
