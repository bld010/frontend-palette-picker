import React from 'react';
import { shallow } from 'enzyme';
import ColorDisplay from './ColorDisplay';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('ColorDisplay', () => {

  let wrapper;

  let mockPalette = {
    id: 22,
    name: 'Winter Wonders',
    folder_id: 1,
    colors: ['blue', 'green', 'pink', 'purple', 'black']
  }

  let mockDisplayFolderPalettes = jest.fn();

  let mockReAssignData = jest.fn()

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

    })
  })

  describe('getNewColors', () => {
    it('should generate new colors for any unlocked colors in the palette', () => {

    })

    it('should fire generateColorsElements', () => {

    })
  })

  describe('displayModal', () => {
    it('should change showModal in state to true', () => {

    })
  })

  describe('hideModal', () => {
    it('should change showModal in state to false', () => {

    })
  })

  describe('savePalette', () => {
    it('should create a properly-formatted palette with currentPalette', () => {

    })

    it('should fire postPalette', () => {

    })

    it('should fire reAssignData', () => {

    })

    it('should fire displayFolderPalettes', () => {

    })

    it('should fire hideModal', () => {

    })
  })


  describe('componentDidUpdate', () => {
    it('should set currentPalette in state if palette from props changes', () => {

    })
  })

})