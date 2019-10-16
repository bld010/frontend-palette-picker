import React from "react";
import { shallow } from "enzyme";
import MiniPalette from "./MiniPalette";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// onKeyDown={(e) => this.handleEnter(e, palette)} setCurrentPalette={this.props.setCurrentPalette} palette={palette}

describe("Mini Palettes", () => {

  let mockOnKeyDown = jest.fn();
  let mockSetCurrentPalette = jest.fn();
  let mockPalette = {
    id: 125,
    colors: [{hex: "#00ed3f"}, {hex: "#00ed3f"},{hex: "#00ed3f"},{hex: "#00ed3f"},{hex: "#00ed3f"}],
    name: "1",
    folder_id: 84,
    created_at: "2019-10-15T01:01:16.495Z",
    updated_at: "2019-10-15T01:01:16.495Z"
  };

  let wrapper = shallow(<MiniPalette onKeyDown={mockOnKeyDown} setCurrentPalette={mockSetCurrentPalette} palette={mockPalette} />)

  it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
  })

  it('should fire setCurrentPalette when clicked', () => {
      wrapper.find('.MiniPalette').simulate('click')
      expect(mockSetCurrentPalette).toHaveBeenCalled()
  })
});
