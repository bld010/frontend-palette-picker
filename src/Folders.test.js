import React from "react";
import { shallow } from "enzyme";
import {Folders} from "./Folders";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Folders", () => {

  let mockDisplayFolderPalettes = jest.fn();
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

  let mockDeleteFolder = jest.fn();

  let wrapper = shallow(
    <Folders
      displayFolderPalettes={mockDisplayFolderPalettes}
      folders={mockFolders}
      deleteFolder={mockDeleteFolder}
    />
  );

  it("should match the snapshots", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleDisplayFolderEnter', () => {

    it('should fire on enter of a folder', () => {
      wrapper.instance().handleDisplayFolderEnter = jest.fn()
      wrapper.find('.folder-list').first().simulate('keydown', {keyCode: 13})
      expect(wrapper.instance().handleDisplayFolderEnter).toHaveBeenCalled()
    });

    it('should fire displayFolderPalettes', () => {
      let mockEvent = {keyCode: 13}

      let wrapper = shallow(
        <Folders
          displayFolderPalettes={mockDisplayFolderPalettes}
          folders={mockFolders}
          deleteFolder={mockDeleteFolder}
        />
      );
      
      wrapper.instance().handleDisplayFolderEnter(mockEvent, 2);

      expect(wrapper.instance().props.displayFolderPalettes).toHaveBeenCalled();
    })
    
    
  })
  
  it('should call displayFolderPalettes on the click of a folder', () => {
    wrapper.find('p').first().simulate('click')
    expect(mockDisplayFolderPalettes).toHaveBeenCalled()
  });
  
  describe('handleDeleteFolderEnter', () => {

    it('should fire on enter on trash can', () => {
      wrapper.instance().handleDeleteFolderEnter = jest.fn()
      wrapper.find('.faTrash').first().simulate('keydown', {keyCode: 13})
      expect(wrapper.instance().handleDeleteFolderEnter).toHaveBeenCalled()
    });

    it('should fire deleteFolder', () => {
      let mockEvent = {keyCode: 13};

      let wrapper = shallow(
        <Folders
          displayFolderPalettes={jest.fn()}
          folders={mockFolders}
          deleteFolder={mockDeleteFolder}
        />
      );

      wrapper.instance().handleDeleteFolderEnter(mockEvent, {id: 2});

      expect(wrapper.instance().props.deleteFolder).toHaveBeenCalled();
    })
    
    it('should call deleteFolder on the click of a trash', () => {
      wrapper.find('.faTrash').first().simulate('click')
      expect(mockDeleteFolder).toHaveBeenCalled()
    });

  })


});
