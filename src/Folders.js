import React, { Component } from "react";
import { FaTrash } from "react-icons/fa";
import "./Folders.scss";
import PropTypes from "prop-types";

export class Folders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDisplayFolderEnter = (e, id) => {
    if (e.keyCode === 13) {
      this.props.displayFolderPalettes(id);
    }
  };

  handleDeleteFolderEnter = (e, folder) => {
    if (e.keyCode === 13) {
      this.props.deleteFolder(folder);
    }
  };

  alphabetizedFolders = () => {
    return this.props.folders.sort((a, b) => {
      var folderNameA = a.name.toUpperCase();
      var folderNameB = b.name.toUpperCase();
  
      if (folderNameA < folderNameB) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  foldersList = () => {
    let alpha = this.alphabetizedFolders()
    return alpha.map(folder => {
      return (
        <li key={folder.id}>
          <p
            tabIndex={0}
            onKeyDown={e => this.handleDisplayFolderEnter(e, folder.id)}
            onClick={() => this.props.displayFolderPalettes(folder.id)}
            className="folder-list"
          >
            {folder.name}
          </p>
          <div className="trash">
            <FaTrash
              tabIndex={0}
              onKeyDown={e => this.handleDeleteFolderEnter(e, folder)}
              onClick={() => this.props.deleteFolder(folder)}
              className="faTrash"
            />
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <section className="Folders">
        <ul>{this.foldersList()}</ul>
      </section>
    );
  }
}

export default Folders;

Folders.propTypes = {
  displayFolderPalettes: PropTypes.func,
  folders: PropTypes.array,
  deleteFolder: PropTypes.func
};
