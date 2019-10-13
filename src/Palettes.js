import React, { Component } from 'react';
import './Palettes.scss';

class Palettes extends Component {
  constructor(props) {
    super(props)
  }

  getPalettesList = () => {
   return this.props.palettes.map(palette => {
      return <li onClick={() => this.props.setCurrentPalette(palette)}>{palette.name}</li>
    })
  }

  render = () => {

    let palettesList = this.getPalettesList();

    return(
      <div>
        <ul>
          {palettesList}
        </ul>
      </div>
    )
  }
}

export default Palettes;