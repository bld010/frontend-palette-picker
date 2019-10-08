import React, { Component } from 'react';
import ColorDisplay from './ColorDisplay';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPalette: null
    }
  }

  render = () => {

    return(
      <main className="App">
        <h1>Palette Picker</h1>
        <ColorDisplay palette={this.state.currentPalette} />
      </main>
    )
  }
}

export default App;
