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
      let randomPalette = {
        name: '',
        color1: randomColor(),
        color2: randomColor(),
        color3: randomColor(),
        color4: randomColor(),
        color5: randomColor()
      }

      this.setState({ currentPalette: randomPalette })
    }
  }

  render = () => {

    
    if (this.state.currentPalette !== null) {
      let { color1, color2, color3, color4, color5 } = this.state.currentPalette

      return (
        <div className="ColorDisplay">
          <div style={{backgroundColor: color1}}><p>color1</p></div>
          <div style={{backgroundColor: color2}}><p>color2</p></div>
          <div style={{backgroundColor: color3}}><p>color3</p></div>
          <div style={{backgroundColor: color4}}><p>color4</p></div>
          <div style={{backgroundColor: color5}}><p>color5</p></div>
        </div>
      )
    } else {
      return <></>
    }
  }
}