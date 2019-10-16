import React from "react";
import { shallow } from "enzyme";
import SavePaletteForm from "./SavePaletteForm";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("SavePaletteForm", () => {
  let mockPostFolder;
  let mockHideModal = jest.fn();
  let mockSavePalette = jest.fn();
  let mockFolders = [
    {
      id: 84,
      name: "Almost Blues",
      created_at: "2019-10-15T01:01:13.675Z",
      updated_at: "2019-10-15T01:01:13.675Z"
    },
    {
      id: 85,
      name: "Fuzzy Purple",
      created_at: "2019-10-15T01:01:50.370Z",
      updated_at: "2019-10-15T01:01:50.370Z"
    },
    {
      id: 86,
      name: "Rubber Ducky Takes a Bath",
      created_at: "2019-10-15T01:01:13.675Z",
      updated_at: "2019-10-15T01:01:13.675Z"
    },
    {
      id: 87,
      name: "Money Greens",
      created_at: "2019-10-15T01:01:50.370Z",
      updated_at: "2019-10-15T01:01:50.370Z"
    }
  ];

  let mockCurrentPalette = {
    id: 125,
    color1: "#00ed3f",
    color2: "#e09e72",
    color3: "#166c8e",
    color4: "#d1ce25",
    color5: "#f9dd89",
    name: "1",
    folder_id: 84,
    created_at: "2019-10-15T01:01:16.495Z",
    updated_at: "2019-10-15T01:01:16.495Z"
  };

  let wrapper = shallow(
    <SavePaletteForm
      hideModal={mockHideModal}
      savePalette={mockSavePalette}
      folders={mockFolders}
      palette={mockCurrentPalette}
    />
  );

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should update state when handleChangeOfInput is called", () => {
    const mockEvent = {
      target: { name: "folderName", value: "Sweet Potatoes" },
      preventDefault: jest.fn()
    };
    const expected = "Sweet Potatoes";
    wrapper.instance().handleChangeOfInput(mockEvent);
    expect(wrapper.state("folderName")).toEqual(expected);
  });

  it("should update state when createNewFolders is called", async () => {
    const mockEvent = { preventDefault: jest.fn() };
    // const result = wrapper.instance().createNewFolder(mockEvent);
    wrapper.instance().postFolder = jest.fn().mockImplementation(() => {
      return Promise.resolve()
    })
    wrapper.instance().getFolders = jest.fn().mockImplementation(() => {
      return Promise.resolve([
       {id: 'blabhaoejrowe'}
      ])
    })

    // console.log(wrapper.instance().getFolders)
    mockPostFolder = jest.fn()
    const mockCurrentFolder = {
      id: 84,
      name: "Almost Blues",
      created_at: "2019-10-15T01:01:13.675Z",
      updated_at: "2019-10-15T01:01:13.675Z"
    };
    // wrapper.setState({currentFolder: mockCurrentFolder})

    wrapper.instance().createNewFolder(mockEvent)
    wrapper.instance().forceUpdate();
    // await console.log(wrapper.state())
    // expect(wrapper.instance().postFolder).toHaveBeenCalled();
  });

  it("should fire savePallete when the currentFolder and paletteName are true in state", () => {
    let mockEvent = { preventDefault: jest.fn() };
    let defaultState = { currentFolder: true, paletteName: true };

    wrapper.instance().setState(defaultState);
    wrapper.instance().handleSave(mockEvent);

    expect(mockSavePalette).toHaveBeenCalled();
  });

  //update for currFolder being false as well
  it("should update state with an error when a form field is missing", () => {
    let mockEvent = { preventDefault: jest.fn() };
    let defaultState = { currentFolder: true, paletteName: false };

    wrapper.instance().setState(defaultState);
    wrapper.instance().handleSave(mockEvent);
    expect(wrapper.state().error).toEqual(
      "Please enter a name for a palette and select a folder!"
    );
  });

  it("should set currentFolder on a click", () => {
    wrapper
      .find(".folderList")
      .childAt(0)
      .simulate("click");
    expect(wrapper.state().currentFolder.name).toEqual("Almost Blues");
  });
});
