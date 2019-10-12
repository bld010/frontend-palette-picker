import React from 'react';
import './Folders.scss'

export const Folders = (props) => {

  let foldersList = props.folders.map(folder => {
    return <p onClick={() => props.displayFolderPalettes(folder.id)}>{folder.name}</p>
  })

  return(
    <section className="Folders">
    
    {foldersList}
    </section>

  )
}