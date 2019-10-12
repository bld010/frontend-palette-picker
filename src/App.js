import React, { Component } from "react";
import ColorDisplay from "./ColorDisplay";
import { Folders } from './Folders';
import Palettes from './Palettes';
import { getFolders, getPalettes } from "./util/apiCalls";
import { cleanFolders, cleanPalettes, cleanData } from "./util/cleaners"
import "./App.scss";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPalette: null,
      currentFolder: null,
      folders: [],
      error: ""
    };
  }

  displayFolderPalettes = (id) => {
    let currentFolder = this.state.folders.find(folder => id === folder.id);
    this.setState({ currentFolder })
  }

  setCurrentPalette = () => {

  }

  componentDidMount = async () => {
    try {
      const fetchedPalettes = await getPalettes(process.env.REACT_APP_BACKEND_URL + '/api/v1/palettes')
      const cleanedPalettes = await cleanPalettes(fetchedPalettes)
      const fetchedFolders = await getFolders(process.env.REACT_APP_BACKEND_URL + '/api/v1/folders');
      const cleanedFolders = await cleanFolders(fetchedFolders)
      const cleanedData = await cleanData(cleanedFolders, cleanedPalettes)
      await this.setState({ folders: cleanedData });
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  render = () => {
    return(
      <main className="App">
        <h1>Palette Picker</h1>
        <ColorDisplay palette={this.state.currentPalette} />
        <section>
          <div className="Folders">
            {this.state.folders && <Folders displayFolderPalettes={this.displayFolderPalettes} folders={this.state.folders} /> }
          </div>
          <div className="Palettes">
            {this.state.currentFolder && <Palettes setCurrentPalette={this.setCurrentPalette} palettes={this.state.currentFolder.palettes} /> }
          </div>
        </section>
      </main>
    );
  };
}

export default App;
