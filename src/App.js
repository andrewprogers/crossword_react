import React, { Component } from 'react';
import CrosswordContainer from './components/CrosswordContainer'
import data from './constants/exampleCrossword'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello react</h1>
        <CrosswordContainer
          initialPuzzle={data}
          />
      </div>
    );
  }
}

export default App;
