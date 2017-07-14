import React from 'react';
import CrosswordGrid from './CrosswordGrid';
import CluesContainer from './CluesContainer';
import Crossword from '../modules/Crossword'
import UserActionController from '../modules/UserActionController'

class CrosswordContainer extends React.Component {
  constructor(props) {
    super(props);

    // Placeholder to be removed in the future
    let puzzle = this.props.initialPuzzle
    let size = puzzle.size.rows;

    this.state = {
      grid: Crossword.parseArrayToGrid(puzzle.grid),
      clues: puzzle.clues,
      userLetters: Crossword.generateEmptyGrid(size),
      selectedCellRow: 0,
      selectedCellColumn: 0,
      clueDirection: "across"
    }

    this.on = {
      updateSelectedCell: this.updateSelectedCell.bind(this),
      changeClueDirection: this.changeClueDirection.bind(this),
      updateUserLetters: this.updateUserLetters.bind(this),
      handleKeyDown: this.handleKeyDown.bind(this)
    }
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
    let controller = new UserActionController(this.state)
    this.setState(controller.keyPress(event.key))
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

  render() {
    let crossword = new Crossword(this.state.grid, this.state.clues, this.state.userLetters);
    return(
      <div id='crossword-container' className="row">
        <div className='small-12 large-6 columns'>
          <CrosswordGrid
            crossword={crossword}
            selectedCellRow={this.state.selectedCellRow}
            selectedCellColumn={this.state.selectedCellColumn}
            clueDirection={this.state.clueDirection}
            on={this.on} />
        </div>
        <div className='small-12 large-6 columns'>
          <CluesContainer
            crossword={crossword}
            selectedCellRow={this.state.selectedCellRow}
            selectedCellColumn={this.state.selectedCellColumn}
            clueDirection={this.state.clueDirection}
            on={this.on} />
        </div>
      </div>
    )
  }
}

export default CrosswordContainer;
