import { cleanPalettes, cleanFolders, cleanData } from "./cleaners";
import React from "react";
import { shallow } from "enzyme";
import cleaners from "./cleaners";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

describe("cleaners", () => {
  let mockPalettes = [
    {
      id: 140,
      color1: "#6ed657",
      color2: "#f75d09",
      color3: "#1bfced",
      color4: "#dd7975",
      color5: "#2797c6",
      name: "Picnic in July",
      folder_id: 92,
      created_at: "2019-10-17T00:07:46.936Z",
      updated_at: "2019-10-17T00:07:46.936Z"
    }
  ];

  let mockCleanPalettes = [{
    name: 'Picnic in July',
    id: 140,
    folder_id: 92, 
    colors: [
      {hex: "#6ed657", locked: false},
      {hex: "#f75d09", locked: false},
      {hex: "#1bfced", locked: false},
      {hex: "#dd7975", locked: false},
      {hex: "#2797c6", locked: false}
    ]
  }]

  let mockFolders = [
    {
        "id": 91,
        "name": "Money Greens",
        "created_at": "2019-10-17T00:05:59.474Z",
        "updated_at": "2019-10-17T00:05:59.474Z"
    }
]

  let mockCleanFolder = [
    {id: 91,
    name: 'Money Greens',
    palettes: []
    }
  ]


  describe("cleanPalettes", () => {
    it("should clean a palette", () => {
      expect(cleanPalettes(mockPalettes)).toEqual(mockCleanPalettes)
    })
  });

  describe("cleanFolders", () => {
    it('should clean a folder', () => {
      expect(cleanFolders(mockFolders)).toEqual(mockCleanFolder)
    })
  });

  describe("cleanData", () => {
    it('should clean data',() => {
      const result = [{"created_at": "2019-10-17T00:05:59.474Z", "id": 91, "name": "Money Greens", "updated_at": "2019-10-17T00:05:59.474Z"
    }]
      expect(cleanData(mockFolders, mockPalettes)).toEqual(result)
    })
  });
});