import React, { Component } from 'react';
import randomColor from 'randomcolor';
import './ColorDisplay.scss'
import { MdLock, MdLockOpen } from 'react-icons/md'
import { FaSave, FaRandom } from 'react-icons/fa'
import ReactModal from 'react-modal';
import SavePaletteForm from './SavePaletteForm'
import {postPalette} from './util/apiCalls'

export default class ColorDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPalette: this.props.palette || null,
      lockedColorIndices: [],
      showModal: false
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
      return <div className="colorBlock" key={index}>
        <div className="color"  style={{backgroundColor: color.hex}}>
          <div className="lock" onClick={() => this.toggleLock(index)}>
            {color.locked ? <MdLock size={62}/> : <MdLockOpen color="white" size={62}/>}
            {color.locked ? <p>locked</p> : <></>}
          </div>
        </div>
        </div>
    })
    
    return colorsElements;
  }

  displayModal = () => {
    this.setState({showModal: true})
  }

  // (colorOne, colorTwo, colorThree, colorFour, colorFive, folderId, paletteName)
  savePalette = async (e, folder, paletteName) => {
    e.preventDefault()
    let colorOne = this.state.currentPalette.colors[0].hex
    let colorTwo = this.state.currentPalette.colors[1].hex
    let colorThree = this.state.currentPalette.colors[2].hex
    let colorFour = this.state.currentPalette.colors[3].hex
    let colorFive = this.state.currentPalette.colors[4].hex
    await postPalette(colorOne, colorTwo, colorThree, colorFour, colorFive, folder.id, paletteName)
    this.props.reAssignData()
    this.setState({showModal: false})
  }


  componentDidUpdate = (prevProps) => {
    if (this.props.palette !== prevProps.palette) {
      this.setState( { currentPalette: this.props.palette })
    }
  }



  render = () => {
    if (this.state.currentPalette !== null) {
      let colorsElements = this.generateColorsElements()
      return (
        <div className="ColorDisplay">
          <ReactModal isOpen={this.state.showModal}>
            <SavePaletteForm savePalette={this.savePalette} folders={this.props.folders} />
          </ReactModal>
          <div className="buttons">
            <button onClick={this.getNewColors}><FaRandom size={25} />Random</button>
            <button onClick={this.displayModal}><FaSave size={25} />Save</button>
          </div>
          <div className="colors">
            {colorsElements}
          </div>
            
        </div>
      )
    } else {
      return <></>
    }
  }
}