import React from "react";
import { FaTrash } from "react-icons/fa";
import "./Folders.scss";

export const Folders = props => {
  const handleEnter = (e, id) => {
    if (e.keyCode == 13) {
      props.displayFolderPalettes(id);
    }
  };

  let foldersList = props.folders.map(folder => {
    return (
      <li>
        <p tabIndex={0} onKeyDown={e => handleEnter(e, folder.id)} onClick={() => props.displayFolderPalettes(folder.id)}>
          {folder.name}</p>
        <FaTrash onClick={() => props.deleteFolder(folder)}/>
      </li>
    );
  });

  return (
    <section className="Folders">
      <ul>{foldersList}</ul>
    </section>
  );
};

