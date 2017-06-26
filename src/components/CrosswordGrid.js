import React from 'react';
import Cell from './Cell';
import {createRelativeFontUpdater, getCustomSheetUpdater} from '../modules/dynamicFont'

class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedCell: 1
    }
    this.size = this.props.puzzle.size.cols;
    this.changeSelectedCell = this.changeSelectedCell.bind(this);
  }

  changeSelectedCell(cellId) {
    debugger;
    this.setState({selectedCell: cellId})
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
    let cells = [];
    let grid = this.props.puzzle.grid
    let gridnums = this.props.puzzle.gridnums
    for (var i = 0; i < grid.length; i++) {

      cells.push(
        <Cell
          key={i}
          number={gridnums[i]}
          letter={grid[i]}
          selected={this.state.selectedCell === i + 1}
           />
      )
    }

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
