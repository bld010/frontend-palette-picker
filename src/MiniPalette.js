import React from 'react';
import './MiniPalette.scss';

const MiniPalette = (props) => {

  let { colors } = props.palette;

  return(
    <div className="MiniPalette">
      <div style={{backgroundColor: colors[0].hex}}></div>
      <div style={{backgroundColor: colors[1].hex}}></div>
      <div style={{backgroundColor: colors[2].hex}}></div>
      <div style={{backgroundColor: colors[3].hex}}></div>
      <div style={{backgroundColor: colors[4].hex}}></div>
    </div>
  )
}

export default MiniPalette;