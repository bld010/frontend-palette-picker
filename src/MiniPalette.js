import React from 'react';
import './MiniPalette.scss';
import PropTypes from 'prop-types'

const MiniPalette = (props) => {
  let { colors } = props.palette;


  return(
    <div onClick={() => props.setCurrentPalette(props.palette)} className="MiniPalette">
      <div style={{backgroundColor: colors[0].hex}}></div>
      <div style={{backgroundColor: colors[1].hex}}></div>
      <div style={{backgroundColor: colors[2].hex}}></div>
      <div style={{backgroundColor: colors[3].hex}}></div>
      <div style={{backgroundColor: colors[4].hex}}></div>
    </div>
  )
}

export default MiniPalette;


MiniPalette.propTypes = {
  setCurrentPalette: PropTypes.func,
  palette: PropTypes.object
}