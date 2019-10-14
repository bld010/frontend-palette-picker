import React, {Component} from 'react';
import { postFolder, getFolders } from './util/apiCalls';
import './SavePaletteForm.scss';
import MiniPalette from './MiniPalette';

export class SavePaletteForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          currentFolder: null,
          paletteName: '',
          folderName: '',
          reload: false,
          folders: this.props.folders || null
      };
    }

    handleChangeOfInput = e => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value });
      };

    createNewFolder = async e => {
        e.preventDefault()
        await this.setState({currentFolder: this.state.folderName})
        await postFolder(this.state.folderName)
        let allFolders = await getFolders()
        await this.setState({folders: allFolders})
    }

    setCurrentFolderByClick = (e, folder) => {
        e.preventDefault()
        this.setState({currentFolder: folder})
    }

    displayFolders = () => {
        return this.state.folders.map(folder => {
            return (
                <p className={this.state.currentFolder === folder ? 'active' : ' '}
                    onClick={(e) => this.setState({currentFolder: folder})}>{folder.name}</p> 
            )
        })
    }


    componentDidUpdate = (prevProps) => {
        if (this.props.folders !== prevProps.folders) {
          this.setState( { reload: true })
        }
      }

    

    render() {
        return (
        <form className="SavePaletteForm">
            <h2>Save Your Palette</h2>


            <input type='text' placeholder='New palette name' name='paletteName' value={this.state.paletteName} onChange={e => this.handleChangeOfInput(e)}/>
            <div className="miniPalette"> 
                <MiniPalette palette={this.props.palette} />
            </div>
            <section>
                <div className="selectFolder">
                    <h3>Select A Folder</h3>
                        <div className="folderList">
                            {this.displayFolders()} 
                        </div>
                </div>
                <div className="createFolder">
                    <h3>Create a New Folder</h3>
                    <input type='text' placeholder='New folder name' name='folderName' value={this.state.folderName} onChange={e => this.handleChangeOfInput(e)}/>
                    <button onClick={this.createNewFolder}>Create Folder</button>
                   
                </div>
            </section>
            <div className="bottom-buttons">
                <button onClick={(e) => this.props.savePalette(e,this.state.currentFolder, this.state.paletteName)}>Submit!</button>
                <button onClick={this.props.hideModal}>Cancel</button>
            </div>
        </form>
        )
    }
}

export default SavePaletteForm;