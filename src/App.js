import React, { Component } from 'react';
import ColorDisplay from './ColorDisplay';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPalette: {
        color1: 'green',
        color2: 'red',
        color3: 'green',
        color4: 'red',
        color5: 'green'
      }
    }
  }

  render = () => {

    return(
      <main className="App">
        <h1>Palette Picker</h1>
        {/* <ColorDisplay palette={this.state.currentPalette} /> */}
        <ColorDisplay palette={null} />

      </main>
    )
  }
}

export default App;
