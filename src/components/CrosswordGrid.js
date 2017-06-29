import React from 'react';
import Cell from './Cell';
import {createRelativeFontUpdater, getCustomSheetUpdater} from '../modules/dynamicFont'

class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  createCells() {
    let puzzleGrid = this.props.grid;
    let cells = this.props.userLetters.map((row, rIndex) => {
      let cellRow = row.map((letter, cIndex) => {
        let cellLetter = (puzzleGrid[rIndex][cIndex] === '.') ? '.' : letter;
        let clickHandler = () => {
          if ((this.props.selectedCellRow === rIndex) && (this.props.selectedCellColumn === cIndex)){
            this.props.changeClueDirection();
          } else {
            this.props.onCellChange(rIndex, cIndex)
          }
        };
        let selected = ((this.props.selectedCellRow === rIndex) && (this.props.selectedCellColumn === cIndex))
        return(
          <Cell
            key={rIndex + " " + cIndex}
            number={this.props.gridNums[rIndex][cIndex]}
            letter={cellLetter}
            selected={selected}
            onKeyDown={this.props.handleKeyDown}
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
    let cellFontUpdater = createRelativeFontUpdater(gridElement, '#grid-container .cell', 1.3 * this.props.grid.length);
    cellFontUpdater();
    window.addEventListener('resize', cellFontUpdater);

    let updateSheet = getCustomSheetUpdater();
    let pctWidth = (100 / this.props.grid.length);
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
