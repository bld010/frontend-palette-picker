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

  handleEnter = (e, palette) => {
    if (e.keyCode == 13) {
      this.props.setCurrentPalette(palette)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.folder !== prevProps.folder) {
      this.setState( { reload: true })
    }
  }

  getPalettesList = () => {
   return this.props.folder.palettes.map(palette => {
      return <li>

        <p tabIndex={0} onKeyDown={(e) => this.handleEnter(e, palette)} onClick={() => this.props.setCurrentPalette(palette)}>
          {palette.name}
        </p> 
        <FaTrash tabIndex={0} onClick={() => this.props.deletePalette(palette)}/>
        <MiniPalette tabIndex={0} onKeyDown={(e) => this.handleEnter(e, palette)} setCurrentPalette={this.props.setCurrentPalette} palette={palette}/>
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
            <li>Select a folder to see the palettes.</li>
          </ul>
        </div>
      )
    }

  }
}

export default Palettes;