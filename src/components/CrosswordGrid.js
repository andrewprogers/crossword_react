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
      selectedCell: 1,
      userLetters: emptyLetters
    }

    this.changeSelectedCell = this.changeSelectedCell.bind(this);
    this.updateUserLetters = this.updateUserLetters.bind(this)
  }

  changeSelectedCell(cellId) {
    this.setState({selectedCell: cellId})
  }

  updateUserLetters(event, cellIndex) {
    let newLetters = this.state.userLetters.slice();
    newLetters[cellIndex] = event.key.toUpperCase();
    this.setState({userLetters: newLetters});
  }

  createCells() {
    let gridnums = this.props.puzzle.gridnums;
    let cells = this.state.userLetters.map((letter, index) => {
      let clickHandler = () => {this.changeSelectedCell(index)}
      let keyPressHandler = event => {
        this.updateUserLetters(event, index)
      }
      return(
        <Cell
          key={index}
          number={gridnums[index]}
          letter={letter}
          selected={this.state.selectedCell === index}
          onKeyPress={keyPressHandler}
          onClick={clickHandler}
           />
       )
    })
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
