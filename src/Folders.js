import React from 'react';
import './Folders.scss'

export const Folders = (props) => {

  let foldersList = props.folders.map(folder => {
    return <li onClick={() => props.displayFolderPalettes(folder.id)}>{folder.name}</li>
  })

  return(
    <section className="Folders">
      <ul>
        {foldersList}
      </ul>
    </section>

  )
}