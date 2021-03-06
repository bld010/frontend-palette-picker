import React, { Component } from "react";
import ColorDisplay from "./ColorDisplay";
import Folders from './Folders';
import Palettes from './Palettes';
import { getFolders, getPalettes, deleteFolder, deletePalette } from "./util/apiCalls";
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

  setCurrentPalette = (palette) => {
    this.setState({ currentPalette: palette })
  }

  reAssignData = async() => {
    try {
      const fetchedPalettes = await getPalettes();
      const cleanedPalettes = await cleanPalettes(fetchedPalettes);
      const fetchedFolders = await getFolders();
      const cleanedFolders = await cleanFolders(fetchedFolders);
      const cleanedData = await cleanData(cleanedFolders, cleanedPalettes);
      await this.setState({ folders: cleanedData });
    } catch (error) {
      await this.setState({ error })
    }
  }

  deleteFolder = async (folder) => {
    await deleteFolder(folder.id)
    await this.reAssignData()
    await this.setState({currentFolder: null})
  }

  deletePaletteAndFetch = async(palette) => {
    try {
      await deletePalette(palette.id)
      await this.reAssignData()

      let updatedCurrentFolder = await this.state.folders.find(folder => folder.id === palette.folder_id)

      this.setState({currentFolder: updatedCurrentFolder})
    } catch (error) {
      this.setState({ error })
    } 
  }
  
  componentDidMount = async () => {
    try {
      this.reAssignData();
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  render = () => {
    return(
      <main className="App">
        <h1>Palette Picker</h1>
        <ColorDisplay 
          palette={this.state.currentPalette} 
          folders={this.state.folders} 
          reAssignData={this.reAssignData} 
          displayFolderPalettes={this.displayFolderPalettes}
        />
        <section>
          <div className="folders">
            <h3>Folders</h3>
            {this.state.folders && <Folders displayFolderPalettes={this.displayFolderPalettes} folders={this.state.folders} deleteFolder={this.deleteFolder}/> }
          </div>
          <div className="palettes">
          <h3>Palettes {this.state.currentFolder !== null && <>in <span>{this.state.currentFolder.name}</span></>}</h3>
            {this.state.currentFolder && <Palettes setCurrentPalette={this.setCurrentPalette} folder={this.state.currentFolder} deletePalette={this.deletePaletteAndFetch}/>}
            {!this.state.currentFolder && <Palettes setCurrentPalette={this.setCurrentPalette}/>}
          </div>
        </section>
      </main>
    );
  };
}

export default App;