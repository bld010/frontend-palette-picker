import React, { Component } from 'react';
import './Palettes.scss';

class Palettes extends Component {
  constructor(props) {
    super(props)
  }

  getPalettesList = () => {
   return this.props.folder.palettes.map(palette => {
      return <li onClick={() => this.props.setCurrentPalette(palette)}>{palette.name}</li>
    })
  }

  render = () => {
    console.log(this.props)

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