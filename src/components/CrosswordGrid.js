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

  createCells() {
    let puzzleGrid = this.props.grid;
    let cells = this.state.userLetters.map((row, rIndex) => {
      let cellRow = row.map((letter, cIndex) => {
        let cellLetter = (puzzleGrid[rIndex][cIndex] === '.') ? '.' : letter;
        let clickHandler = () => {this.props.onCellChange(rIndex, cIndex)};
        let selected = ((this.props.selectedCellRow === rIndex) && (this.props.selectedCellColumn === cIndex))
        return(
          <Cell
            key={rIndex + " " + cIndex}
            number={this.props.gridNums[rIndex][cIndex]}
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
