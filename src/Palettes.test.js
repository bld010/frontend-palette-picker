import React from "react";
import { shallow } from "enzyme";
import Palettes from "./Palettes";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";


configure({ adapter: new Adapter() });

describe("Palettes", () => {

  let mockSetCurrentPalette = jest.fn();
  let mockFolder = {
    id: 86,
    name: "Mocky",
    palettes: [
      { id: 1,
        colors: [
          { hex: "#ad0c34", locked: false },
          { hex: "#74dbd4", locked: false },
          { hex: "#db9b6b", locked: false },
          { hex: "#9863f9", locked: false },
          { hex: "#f9dc98", locked: false }
        ]
      }, 
      { id: 2,
        colors: [
          { hex: "#ad0c34", locked: false },
          { hex: "#74dbd4", locked: false },
          { hex: "#db9b6b", locked: false },
          { hex: "#9863f9", locked: false },
          { hex: "#f9dc98", locked: false }
        ]
      }
    ]
  };

  let mockDeleteFolder = jest.fn();
  let wrapper = shallow(
    <Palettes
      setCurrentPalette={mockSetCurrentPalette}
      folder={mockFolder}
      deleteFolder={mockDeleteFolder}
    />
  );


  it("should match the snapshot when folder is passed through props", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when folder is not provided', () => {
    let wrapper = shallow(
      <Palettes
        setCurrentPalette={mockSetCurrentPalette}
        folder={undefined}
        deleteFolder={mockDeleteFolder}
      />
    );

    expect(wrapper).toMatchSnapshot();
  })

  describe('handleSetPaletteEnter', () => {

    it('should call fire on enter', () => {
      wrapper.instance().handleSetPaletteEnter = jest.fn()
      wrapper.find('p').first().simulate('keydown', {keyCode: 13})
  
      expect(wrapper.instance().handleSetPaletteEnter).toHaveBeenCalled()
    })

    it('should fire setCurrentPalette', () => {
      let wrapper = shallow(<Palettes 
        setCurrentPalette={jest.fn()}
        folder={{id: 2, palettes: []}}
        deletePalette={jest.fn()}
      />)
      let mockEvent = {keyCode: 13}

      wrapper.instance().handleSetPaletteEnter(mockEvent, {id: 2}) 

      expect(wrapper.instance().props.setCurrentPalette).toHaveBeenCalled()
    })
  })


  describe('handleDeleteEnter', () => {
    it('should call handleDeleteEnter on enter', () => {
      wrapper.instance().handleDeleteEnter = jest.fn()
      wrapper.find('.trash').first().simulate('keydown', {keyCode: 13})
  
      expect(wrapper.instance().handleSetPaletteEnter).toHaveBeenCalled()
    })

    it('should fire deletePalette with palette', () => {
      let wrapper = shallow(<Palettes 
        setCurrentPalette={jest.fn()}
        folder={{id: 2, palettes: []}}
        deletePalette={jest.fn()}
      />)
      let mockEvent = {keyCode: 13}
      wrapper.instance().handleDeleteEnter(mockEvent, {id: 2}) 
      expect(wrapper.instance().props.deletePalette).toHaveBeenCalled()
    })
  })

  describe('getPalettesList', () => {

    it('should return li elements from the palettes of the given folder', () => {
      let palettesList = wrapper.instance().getPalettesList();

      expect(palettesList.length).toEqual(2)
    })
  })
});
