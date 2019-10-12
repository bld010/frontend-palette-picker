import React, { Component } from 'react';
import './Palettes.scss';

class Palettes extends Component {
  constructor(props) {
    super(props)
  }

  getPalettesList = () => {
   return this.props.palettes.map(palette => {
      return <p onClick={() => this.props.setCurrentPalette(palette)}>{palette.name}</p>
    })
  }

  render = () => {

    let palettesList = this.getPalettesList();

    return(
      <div>
        {palettesList}
      </div>
    )
  }
}

export default Palettes;