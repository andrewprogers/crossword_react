import React from 'react';
import Cell from './Cell';
import {createRelativeFontUpdater, getCustomSheetUpdater} from '../modules/dynamicFont'

class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);

    this.size = this.props.puzzle.size.cols;
    let emptyLetters = []
    let totalLength = this.size * this.size;
    for (var i = 0; i < totalLength ; i++) {
      emptyLetters.push('')
    }

    this.state ={
      userLetters: emptyLetters
    }

    this.updateUserLetters = this.updateUserLetters.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  updateUserLetters(letter) {
    let newLetters = this.state.userLetters.slice();
    newLetters[this.props.selectedCell] = letter.toUpperCase();
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
    let gridnums = this.props.puzzle.gridnums;
    let puzzleGrid = this.props.puzzle.grid;
    let cells = this.state.userLetters.map((letter, index) => {
      let cellLetter = (puzzleGrid[index] === '.') ? '.' : letter;
      let clickHandler = () => {this.props.onCellChange(index)}
      return(
        <Cell
          key={index}
          number={gridnums[index]}
          letter={cellLetter}
          selected={this.props.selectedCell === index}
          onKeyDown={this.handleKeyDown}
          onClick={clickHandler}
           />
       )
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
