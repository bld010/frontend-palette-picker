import React from "react";
import { FaTrash } from "react-icons/fa";
import "./Folders.scss";

export const Folders = props => {

  const handleDisplayFolderEnter = (e, id) => {
    if (e.keyCode == 13) {
      props.displayFolderPalettes(id);
    }
  };

  const handleDeleteFolderEnter = (e, folder) => {
    if (e.keyCode == 13){
      props.deleteFolder(folder)
    }
  }

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
    return (
      <li>
        <p tabIndex={0} onKeyDown={e => handleDisplayFolderEnter(e, folder.id)} onClick={() => props.displayFolderPalettes(folder.id)}>
          {folder.name}</p>
        <FaTrash tabIndex={0} onKeyDown={e=> handleDeleteFolderEnter(e, folder)} onClick={() => props.deleteFolder(folder)}/>
      </li>
    );
  });

  return (
    <section className="Folders">
      <ul>{foldersList}</ul>
    </section>
  );
};

