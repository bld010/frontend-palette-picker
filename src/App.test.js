import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App', () => {

  let wrapper;

  let mockPalette1 = {
    folder_id: 1,
    id: 22,
    colors: [],
    name: "Mock Palette 1"
  }

  let mockPalette2 = {
    folder_id: 1,
    id: 23,
    colors: [],
    name: "Mock Palette 2"
  }

  let mockPalette3 = {
    folder_id: 2,
    id: 24,
    colors: [],
    name: "Mock Palette 3"
  }

  let mockPalette4 = {
    folder_id: 2,
    id: 24,
    colors: [],
    name: "Mock Palette 3"
  }

  let mockFolders = [
    { name: "Folder 1", 
      id: 1,
      palettes: [
        mockPalette1,
        mockPalette2
      ], 
    }, 
    { name: "Folder 2", 
      id: 2,
      palettes: [
        mockPalette3,
        mockPalette4
      ], 
    }, 
    
  ]

  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('displayFolderPalettes', () => {
    it('should set state with correct folder based on id', async () => {
      
      await wrapper.instance().setState({folders: mockFolders})

      wrapper.instance().displayFolderPalettes(1)

      let expected = { 
        name: "Folder 1", 
        id: 1,
        palettes: [
          mockPalette1,
          mockPalette2
        ], 
      }
      
      expect(wrapper.state().currentFolder).toEqual(expected);
      
    })
  })

  describe('setCurrentPalette', () => {
    it('should set state with the palette selected', () => {

    })
  })

  describe('reAssignData', () => {
    it('should fire getPalettes', () => {

    })

    it('should fire cleanPalettes with the fetched palettes', () => {

    })

    it('should fire getFolders', () => {

    })

    it('should fire cleanFolders with the fetched folders', () => {

    })

    it('should fire cleanFolders with the cleaned palettes and folders', () => {

    })

    it('should set state with the cleaned data', () => {

    })
  })

  describe('deleteFolder', () => {
    it('should fire deleteFolder with the correct id', () => {

    })

    it('should fire reAssignData', () => {

    })

    it('should set the currentFolder property to null', () => {

    })
  })

  describe('deletePalette', () => {
    it('should fire deletePalette with the correct id', () => {

    })

    it('should fire reAssignData', () => {

    })

    it('should update the palettes in currentFolder in state with deleted palette removed', () => {

    })
  })

  describe('componentDidMount', () => {
    it('should fire reAssignData', () => {

    })

    it('should set state with an error message if a fetch call fails', () => {

    })
  })

})

