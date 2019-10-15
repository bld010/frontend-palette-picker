import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<App />)
  
    expect(wrapper).toMatchSnapshot();
  });

  describe('displayFolderPalettes', () => {
    it('should set state with correct folder based on id', () => {

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

