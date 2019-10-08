import React, { Component } from 'react';
import randomColor from 'randomcolor';
import './ColorDisplay.scss'

export default class ColorDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPalette: this.props.palette || null,
      lockedColorIndices: []
    }
  }


  componentDidMount = () => {
    if (this.props.palette === null) {
      this.generateNewRandomPalette();
    }
  }
 
  toggleLock = (indexOfClickedColor) => {
    let colors = this.state.currentPalette.colors;
    let name = this.state.currentPalette.name;

    let newColors = colors.map((color, index) => {
      if (indexOfClickedColor === index) {
        color.locked = !color.locked;
        return color
      } else { 
        return color
      }
    })

    this.setState({ currentPalette: {
      name: name,
      colors: newColors
    }})
    console.log(this.state.currentPalette)
  }

  generateNewRandomPalette = () => {
    let randomPalette = {
      name: '',
      colors: [
        { hex: randomColor(), locked: false },
        { hex: randomColor(), locked: false },
        { hex: randomColor(), locked: false },
        { hex: randomColor(), locked: false },
        { hex: randomColor(), locked: false }
      ]
    }

    this.setState({ currentPalette: randomPalette })
  
  }

  getNewColors = () => {
    let colors = this.state.currentPalette.colors;
    let name = this.state.currentPalette.name;

    let newColors = colors.map(color => {
      if (color.locked) {
        return color
      } else {
        return { hex: randomColor(), locked: false }
      }
    })



    this.setState({ currentPalette: {
      name: name,
      colors: newColors
    }})

    this.generateColorsElements();
  }

  generateColorsElements = () => {
    let colors = this.state.currentPalette.colors;

    let colorsElements = colors.map((color, index) => {
      return <div key={index} style={{backgroundColor: color.hex}}>
          <p>color{index}</p>
          <p onClick={() => this.toggleLock(index)}>lock</p>
        </div>
    })
    
    return colorsElements;
  }

  render = () => {
    if (this.state.currentPalette !== null) {
      let colorsElements = this.generateColorsElements()
      return (
        <div className="ColorDisplay">
          {colorsElements}
          <button onClick={this.getNewColors}>Click for more colors</button>
        </div>
      )
    } else {
      return <></>
    }
  }
}