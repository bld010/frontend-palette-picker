import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getPalettes, getFolders, deletePalette } from './util/apiCalls';
import { cleanPalettes, cleanFolders, cleanData } from './util/cleaners';

jest.mock('./util/apiCalls');
jest.mock('./util/cleaners');

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
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<App />)

    getPalettes.mockImplementation(() => {
      return Promise.resolve([
        mockPalette1, 
        mockPalette2, 
        mockPalette3, 
        mockPalette4])
    })
 
    getFolders.mockImplementation(() => {
      return Promise.resolve([
        { id: 1, name: "Folder 1"},
        { id: 2, name: 'Folder2'}
      ])
    })
  })


  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('displayFolderPalettes', () => {
    it('should set state with correct folder based on id', async () => {
      
      wrapper.instance().setState({folders: mockFolders})

      await wrapper.instance().displayFolderPalettes(1)

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

      wrapper.instance().setCurrentPalette(mockPalette1)

      expect(wrapper.state().currentPalette).toEqual(mockPalette1)
    })
  })

  describe('reAssignData', () => {

    beforeEach(() => {
      wrapper.instance().reAssignData();
    })

    it('should fire getPalettes', () => {
      expect(getPalettes).toHaveBeenCalled()
    })

    it('should fire cleanPalettes with the fetched palettes', () => {
      let expected = [mockPalette1, mockPalette2, mockPalette3, mockPalette4]
      expect(cleanPalettes).toHaveBeenCalledWith(expected);
    })

    it('should fire getFolders', () => {
      expect(getFolders).toHaveBeenCalled();
    })

    it('should fire cleanFolders with the fetched folders', () => {
      let expected = [
        { id: 1, name: "Folder 1"},
        { id: 2, name: 'Folder2'}
      ]
      expect(cleanFolders).toHaveBeenCalledWith(expected)
    })

    it('should set state with cleaned data', async () => {
      
      let wrapper = shallow(<App />)
      
      getPalettes.mockImplementation(() => {
        return Promise.resolve(['rawPalettes'])
      })
      
      wrapper.instance().cleanPalettes = jest.fn().mockImplementation(() => {
        return Promise.resolve(['cleanedPalettes'])
      })

      getFolders.mockImplementation(() => {
        return Promise.resolve(['rawFolders'])
      })

      cleanFolders.mockImplementation(() => {
        return Promise.resolve(['cleanedFolders'])
      })

      cleanData.mockImplementation(() => {
        return Promise.resolve(['cleanedData'])
      })

      await wrapper.instance().reAssignData();

      expect(wrapper.state().folders).toEqual(['cleanedData'])

    })

  })

  describe('deleteFolder', () => {
    // it('should fire deleteFolder with the correct id', () => {

    // })

    // it('should fire reAssignData', () => {

    // })

    // it('should set the currentFolder property to null', () => {

    // })
  })

  describe('deletePaletteAndFetch', () => {

    it('should fire deletePalette with the correct id', async () => {

      deletePalette.mockImplementation(() => {
        return Promise.resolve()
      })

      wrapper.instance().deletePaletteAndFetch(mockPalette1);
      expect(deletePalette).toHaveBeenCalledWith(mockPalette1.id)

    })

    it('should fire reAssignData', async () => {

      deletePalette.mockImplementation(() => {
        return Promise.resolve();
      })

      wrapper.instance().reAssignData = jest.fn().mockImplementation(() => {
        return Promise.resolve();
      })

      wrapper.instance().deletePaletteAndFetch(mockPalette1);

      await wrapper.instance().forceUpdate()
      expect(wrapper.instance().reAssignData).toHaveBeenCalled()

    })

    // it('should update the palettes in currentFolder in state with deleted palette removed', async () => {
    //   wrapper.instance().setState({folders: mockFolders})



    //   // deletePalette.mockImplementation(() => {
    //   //   return Promise.resolve();
    //   // })

    //   // wrapper.instance().reAssignData = jest.fn().mockImplementation(() => {
    //   //   return Promise.resolve();
    //   // })


    //   wrapper.instance().deletePaletteAndFetch(mockPalette1);
    //   // await wrapper.instance().forceUpdate()

      

    // })

    it('should set an error in state if deletePalette rejects', async () => {
      deletePalette.mockImplementation(() => {
        return Promise.reject('Something went wrong')
      })

      wrapper.instance().deletePaletteAndFetch(mockPalette1)
       await wrapper.instance().forceUpdate()

      expect(wrapper.state().error).toEqual('Something went wrong')

    })

    it('should set an error in state if reAssignData rejects', async () => {
      

      wrapper.instance().reAssignData = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('Something went wrong'))
      })
       
      wrapper.instance().deletePaletteAndFetch(mockPalette1)
      
      await wrapper.instance().forceUpdate()

      expect(wrapper.state().error).toEqual('Something went wrong')

    })

  })

  describe('componentDidMount', () => {
    it('should fire reAssignData', async () => {

      wrapper.instance().reAssignData = jest.fn();
      wrapper.instance().componentDidMount();

      expect(wrapper.instance().reAssignData).toHaveBeenCalled();

    })

    it('should set state with an error message if reAssignData throws an error', () => {

      wrapper.instance().reAssignData = jest.fn().mockImplementation(() => {
        throw Error('There was an error getting your data')
      })

      wrapper.instance().componentDidMount();

      expect(wrapper.state().error).toEqual('There was an error getting your data')

    })
  })

})
