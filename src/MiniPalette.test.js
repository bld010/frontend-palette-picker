import React from "react";
import { shallow } from "enzyme";
import MiniPalette from "./MiniPalette";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

// onKeyDown={(e) => this.handleEnter(e, palette)} setCurrentPalette={this.props.setCurrentPalette} palette={palette}

describe('Mini Palettes', () => {
    mockOnKeyDown = jest.fn()
    mockSetCurrentPalette = jest.fn()
    mockPalette = {
        
    }
})