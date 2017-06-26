import React from 'react';
import {createRelativeFontUpdater, getCustomSheetUpdater} from '../modules/dynamicFont'

class CrosswordGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state ={

    }
    this.size = 15;
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
    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        cells.push(
          <div className="cell">
            <div className="cell-number">12</div>
            <div className="cell-letter">A</div>
          </div>
        )
      }
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
