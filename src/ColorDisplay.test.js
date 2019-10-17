import React from 'react';
import { shallow } from 'enzyme';
import ColorDisplay from './ColorDisplay';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { postPalette } from './util/apiCalls';

jest.mock('./util/apiCalls')

configure({ adapter: new Adapter() });

describe('ColorDisplay', () => {

  let wrapper;

  let mockPalette = {
    id: 22,
    name: 'Winter Wonders',
    folder_id: 1,
    colors: [{hex: 'blue'}, {hex: 'green'}, {hex: 'pink'}, {hex: 'purple'}, {hex: 'black'}]
  }

  let mockDisplayFolderPalettes = jest.fn();

  let mockReAssignData = jest.fn().mockImplementation(() => {
    return Promise.resolve();
  })

  beforeEach(() => {
    wrapper = shallow(<ColorDisplay 
        palette={mockPalette}
        folders={[]}
        reAssignData={mockReAssignData}
        displayFolderPalettes={mockDisplayFolderPalettes}
      />)
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('componentDidMount', () => {
    it('should fire generateNewRandomPalette when props.palette is null', () => {
      let wrapper = shallow(<ColorDisplay palette={null} />)
    
      let mockGenerateNewRandomPalette = jest.fn()
      wrapper.instance().generateNewRandomPalette = mockGenerateNewRandomPalette;
    
      wrapper.instance().componentDidMount();
    
      expect(mockGenerateNewRandomPalette).toHaveBeenCalled();
    })

    it('Should not fire generateNewRandomPalette when props.palette is not null', () => {
    
      let mockGenerateNewRandomPalette = jest.fn()
      wrapper.instance().generateNewRandomPalette = mockGenerateNewRandomPalette;
    
      wrapper.instance().componentDidMount();
    
      expect(mockGenerateNewRandomPalette).toHaveBeenCalledTimes(0);
    })
  })

  describe('toggleLock', () => {
    it('should toggle locked property on index of color that was clicked', () => {

      wrapper.instance().setState({ 
        currentPalette: { 
          name: 'Palettey',
          colors: [
          {hex: 'blue', locked:false},
          {hex: 'green', locked: false}
          ]
        }
      })

      let expected = {"colors": [{"hex": "blue", "locked": false}, {"hex": "green", "locked": true}], "name": "Palettey"}

      wrapper.instance().toggleLock(1)

      expect(wrapper.state().currentPalette).toEqual(expected)
    })

  })

  describe('generateNewRandomPalette', () => {
    it('should create an palette with 5 randomly-generated hex codes', () => {
      wrapper.instance().generateNewRandomPalette();

      let colors = wrapper.state().currentPalette.colors

      expect(colors.length).toEqual(5);

      expect(colors[0].hex[0]).toEqual('#');
      expect(colors[0].hex.length).toEqual(7);
    })
  })

  // describe('getNewColors', () => {
  //   it('should generate new colors for any unlocked colors in the palette', () => {

  //   })

  //   it('should fire generateColorsElements', () => {

  //   })
  // })

  describe('displayModal', () => {
    it('should change showModal in state to true', () => {
      wrapper.instance().setState({showModal: false})

      wrapper.instance().displayModal();

      expect(wrapper.state().showModal).toEqual(true);
    })
  })

  describe('hideModal', () => {
    it('should change showModal in state to false', () => {
      wrapper.instance().setState({showModal: true})

      wrapper.instance().hideModal();

      expect(wrapper.state().showModal).toEqual(false);
    })
  })

  describe('savePalette', () => {

    let mockEvent;
    beforeEach(() => {
      mockEvent = {preventDefault: () => {}};

      postPalette.mockImplementation(() => {
        return Promise.resolve()
      })
    })

    it('should call postPalette with current palette info', () => {
      
      wrapper.instance().savePalette(mockEvent, {id: 1}, 'Palletteee');

      expect(postPalette).toHaveBeenCalledWith("blue", "green", "pink", "purple", "black", 1, "Palletteee")
    })

    it('should fire reAssignData', () => {
      
      wrapper.instance().savePalette(mockEvent, {id: 2}, 'Pallettooo');

      expect(mockReAssignData).toHaveBeenCalled();
    })

    it('should fire displayFolderPalettes', () => {

      wrapper.instance().savePalette(mockEvent, {id: 2}, 'Pallettooo');

      expect(mockDisplayFolderPalettes).toHaveBeenCalledWith(2);

    })

    it('should fire hideModal', async () => {

      let mockHideModal = jest.fn()
      wrapper.instance().hideModal = mockHideModal
      wrapper.instance().displayModal();
      await wrapper.instance().savePalette(mockEvent, {id: 2}, 'Pallettooo');
      expect(mockHideModal).toHaveBeenCalled();
    })
  })

})