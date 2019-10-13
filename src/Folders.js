import React from 'react';
import './Folders.scss'

export const Folders = (props) => {

  const handleEnter = (e, id) => {
    if (e.keyCode == 13) {
      props.displayFolderPalettes(id)
    }
  }

  let foldersList = props.folders.map(folder => {
    return <li tabIndex={0} 
    onKeyDown={(e) => handleEnter(e, folder.id)}
    onClick={() => props.displayFolderPalettes(folder.id)}>{folder.name}</li>
  })

  return(
    <section className="Folders">
      <ul>
        {foldersList}
      </ul>
    </section>

  )
}

//will have to change to component, and use component did update to rerender list of available folders