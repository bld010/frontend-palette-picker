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
          folders: this.props.folders || null,
          error: ''
      };
    }

    handleChangeOfInput = e => {
        e.preventDefault()
        this.setState({[e.target.name]: e.target.value });
      };

    createNewFolder = async e => {
        e.preventDefault()
        const sameName = this.state.folders.find(folder => folder.name === this.state.folderName)
        if(sameName){
            this.setState({error: 'This folder already exists! Please choose a new name!'})
        } else {
            await postFolder(this.state.folderName)
            let allFolders = await getFolders()
            await this.setState({folders: allFolders})
            const correctFolder = this.state.folders.find(folder => folder.name === this.state.folderName)
            await this.setState({currentFolder: correctFolder})
            await this.setState({error: ''})
        }
    }

    setCurrentFolderByClick = (e, folder) => {
        e.preventDefault()
        this.setState({currentFolder: folder})
    }

    displayFolders = () => {
        return this.state.folders.map(folder => {
            return (
                <p className={this.state.currentFolder === folder ? 'active' : ' '}
                    onClick={() => this.setState({currentFolder: folder})}>{folder.name}</p> 
            )
        })
    }

    handleSave = (e) => {
        e.preventDefault()
        if(this.state.currentFolder && this.state.paletteName){
            this.props.savePalette(e,this.state.currentFolder, this.state.paletteName)
        } else {
            this.setState({error: 'Please enter a name for a palette and select a folder!'})
        }
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
                <button onClick={(e) => this.handleSave(e)}>Submit!</button>
                <button onClick={this.props.hideModal}>Cancel</button>
            </div>
            {this.state.error && <p className="error">{this.state.error}</p>}
        </form>
        )
    }
}

export default SavePaletteForm;