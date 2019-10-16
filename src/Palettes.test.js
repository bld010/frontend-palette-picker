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
      {
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
  let newProps;
  let wrapper = shallow(
    <Palettes
      setCurrentPalette={mockSetCurrentPalette}
      folder={mockFolder}
      deleteFolder={mockDeleteFolder}
    />
  );

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleSetPaletteEnter on the keydown', () => {
    wrapper.instance().handleSetPaletteEnter = jest.fn()
    wrapper.find('p').simulate('keydown', {keyCode: 13})

    expect(wrapper.instance().handleSetPaletteEnter).toHaveBeenCalled()
  })

  it('should call handleDeleteEnter on the keydown', () => {
    wrapper.instance().handleDeleteEnter = jest.fn()
    wrapper.find('.trash').simulate('keydown', {keyCode: 13})

    expect(wrapper.instance().handleSetPaletteEnter).toHaveBeenCalled()
  })

  it('should call componentDidUpdate on a props change', () => {
    const handleComponentDidUpdate = jest.fn()
    const prevProps = {
        folder: {
            id: 86,
            name: "Mocky",
            palettes: [
              {
                colors: [
                  { hex: "#ad0c34", locked: false },
                  { hex: "#74dbd4", locked: false },
                  { hex: "#db9b6b", locked: false },
                  { hex: "#9863f9", locked: false },
                  { hex: "#f9dc98", locked: false }
                ]
              }
            ]
          },
        handleComponentDidUpdate
    }
    const newprops = {
        folder: {
            id: 86,
            name: "Blahhh",
            palettes: [
              {
                colors: [
                  { hex: "#ad0c34", locked: false },
                  { hex: "#74dbd4", locked: false },
                  { hex: "#db9b6b", locked: false },
                  { hex: "#9863f9", locked: false },
                  { hex: "#f9dc98", locked: false }
                ]
              }
            ]
          },
        handleComponentDidUpdate
      }

    const wrapper = shallow(<Palettes {...prevProps} />)
    wrapper.setProps(newProps)

    expect(handleComponentDidUpdate).toHaveBeenCalled()
  })
});
