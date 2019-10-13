import React from "react";
import { FaTrash } from "react-icons/fa";
import "./Folders.scss";

export const Folders = props => {
  const handleEnter = (e, id) => {
    if (e.keyCode == 13) {
      props.displayFolderPalettes(id);
    }
  };

  let alphabetizedFolders = props.folders.sort((a,b) => {
    var folderNameA = a.name.toUpperCase();
    var folderNameB = b.name.toUpperCase();

    if (folderNameA < folderNameB) {
      return -1
    } else {
      return 1
    }
  })

  let foldersList = alphabetizedFolders.map(folder => {
    return <li tabIndex={0} 
    onKeyDown={(e) => handleEnter(e, folder.id)}
    onClick={() => props.displayFolderPalettes(folder.id)}>{folder.name}</li>
  })

  return (
    <section className="Folders">
      <ul>{foldersList}</ul>
    </section>
  );
};

