import React, { Component } from 'react';
import './Palettes.scss';
import MiniPalette from './MiniPalette';
import { FaTrash } from "react-icons/fa";

class Palettes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reload: false
    }
  }

  handleSetPaletteEnter = (e, palette) => {
    if (e.keyCode === 13) {
      this.props.setCurrentPalette(palette)
    }
  }

  handleDeleteEnter = (e, palette) => {
    if (e.keyCode === 13){
      this.props.deletePalette(palette)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.folder !== prevProps.folder) {
      this.setState( { reload: true })
    }
  }

  getPalettesList = () => {
   return this.props.folder.palettes.map(palette => {
      return <li key={palette.id}>
        <div class="palette-div">
          <p tabIndex={0} 
          onKeyDown={(e) => this.handleSetPaletteEnter(e, palette)} 
          onClick={() => this.props.setCurrentPalette(palette)}>
            {palette.name}
          </p>
          <div className="trash"> 
            <FaTrash 
            tabIndex={0} 
            onKeyDown={(e) => this.handleDeleteEnter(e, palette)} 
            onClick={() => this.props.deletePalette(palette)}/>
          </div>
        </div>
        <MiniPalette 
        tabIndex={0} 
        onKeyDown={(e) => this.handleEnter(e, palette)} 
        setCurrentPalette={this.props.setCurrentPalette} 
        palette={palette}/>
      </li>
    })
  }

  render = () => {
    if (this.props.folder) {
      let { palettes } = this.props.folder

      return(
        <div className="Palettes">
        <ul>
          {!palettes.length && <li>This folder has no palettes.</li>}
          {palettes.length > 0 && this.getPalettesList()}
        </ul>
      </div>
      )
    } else {
      return(
        <div className="Palettes">
          <ul>
            <li style={{width: "300px", textAlign: "center"}}>
              Click the random button above to generate random palettes,
              save a palette with the save button,
              or select a folder (left) to see saved palettes.
            </li>
          </ul>
        </div>
      )
    }

  }
}

export default Palettes;