import React, { Component } from 'react';
import CrosswordContainer from './components/CrosswordContainer'
import data from './constants/27'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CrosswordContainer
          initialPuzzle={data}
          />
      </div>
    );
  }
}

export default App;
