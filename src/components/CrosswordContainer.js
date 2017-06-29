import React from 'react';
import CrosswordGrid from './CrosswordGrid'
import CluesContainer from './CluesContainer';

class CrosswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      puzzle: this.props.initialPuzzle,
      grid: this.parseGrid(this.props.initialPuzzle.grid),
      selectedCellRow: 0,
      selectedCellColumn: 0,
      clueDirection: "across"
    }
    this.updateSelectedCell = this.updateSelectedCell.bind(this);
    //this.changeClueDirection = this.changeClueDirection.bind(this);
  }

  parseGrid(puzzleArray) {
    let size = Math.sqrt(puzzleArray.length)
    let newGrid = []
    for (var i = 0; i < size; i++) {
      let start = i * size
      newGrid.push(puzzleArray.slice(start, start + size))
    }
    return newGrid;
  }

  updateSelectedCell(row, column) {
    this.setState({
      selectedCellRow: row,
      selectedCellColumn: column
    })
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
            onCellChange={this.updateSelectedCell} />
        </div>
        <div className='small-12 large-6 columns'>
          <CluesContainer
            grid={this.state.grid}
            clues={this.state.puzzle.clues}
            gridNums={gridNums}
            selectedCellRow={this.state.selectedCellRow}
            selectedCellColumn={this.state.selectedCellColumn}
            clueDirection={this.state.clueDirection} />
        </div>
      </div>

    )
  }
}

export default CrosswordContainer;
