import {
  getFolders,
  getPalettes,
  deleteFolder,
  deletePalette,
  postFolder,
  postPalette
} from "./apiCalls";

describe("apiCalls", () => {
  it("should return true", () => {
    expect(true).toEqual(true);
  });

  describe("GET folders", () => {
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

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockFolders)
        });
      });
    });

    it("should fetch all folders", () => {
      getFolders();

      expect(window.fetch).toHaveBeenCalled();
    });

    it("should return all folders (HAPPY)", async () => {
      const result = await getFolders();

      expect(result).toEqual(mockFolders);
    });

    it("should return an error when the promise rejects (SAD)", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      await expect(getFolders()).rejects.toEqual(
        Error("There was an error retrieving your folders!")
      );
    });

    it("should return an error when the promise rejects, ex. the server is down (SAD)", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("fetch error message"));
      });

      expect(getFolders()).rejects.toEqual(Error("fetch error message"));
    });
  });

  describe("GET Palettes", () => {
    let mockPalettes = [
      {
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
      },
      {
        id: 126,
        color1: "#bcfc9c",
        color2: "#2b2496",
        color3: "#e05567",
        color4: "#009b48",
        color5: "#179ec4",
        name: "2",
        folder_id: 84,
        created_at: "2019-10-15T01:01:25.376Z",
        updated_at: "2019-10-15T01:01:25.376Z"
      },
      {
        id: 127,
        color1: "#dc7aef",
        color2: "#e5646d",
        color3: "#a598e0",
        color4: "#1d0966",
        color5: "#8af2db",
        name: "3",
        folder_id: 84,
        created_at: "2019-10-15T01:01:31.406Z",
        updated_at: "2019-10-15T01:01:31.406Z"
      },
      {
        id: 128,
        color1: "#d353ef",
        color2: "#d2a4e8",
        color3: "#efa0b5",
        color4: "#79e088",
        color5: "#7f0fdb",
        name: "1",
        folder_id: 85,
        created_at: "2019-10-15T01:01:53.024Z",
        updated_at: "2019-10-15T01:01:53.024Z"
      },
      {
        id: 129,
        color1: "#579b0d",
        color2: "#bf680b",
        color3: "#df54ff",
        color4: "#a50310",
        color5: "#dbc42e",
        name: "2",
        folder_id: 85,
        created_at: "2019-10-15T01:02:01.035Z",
        updated_at: "2019-10-15T01:02:01.035Z"
      },
      {
        id: 130,
        color1: "#b0fbfc",
        color2: "#e2c47c",
        color3: "#44ea91",
        color4: "#5145d8",
        color5: "#c3ed89",
        name: "3",
        folder_id: 85,
        created_at: "2019-10-15T01:02:08.382Z",
        updated_at: "2019-10-15T01:02:08.382Z"
      }
    ];

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPalettes)
        });
      });
    });

    it("should fetch all palettes", () => {
      getPalettes();

      expect(window.fetch).toHaveBeenCalled();
    });

    it("should return all palettes", async () => {
      const result = await getPalettes();

      expect(result).toEqual(mockPalettes);
    });

    it("should return an error when the promise rejects (SAD)", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });

      await expect(getPalettes()).rejects.toEqual(
        Error("There was an error retrieving your palettes!")
      );
    });

    it("should return an error when the promise rejects, ex. the server is down (SAD)", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("fetch error message"));
      });

      expect(getPalettes()).rejects.toEqual(Error("fetch error message"));
    });
  });

  describe("DELETE folder", () => {
    let mockFolder;

    beforeEach(() => {
      mockFolder = {
        id: 84,
        name: "Almost Blues",
        created_at: "2019-10-15T01:01:13.675Z",
        updated_at: "2019-10-15T01:01:13.675Z"
      };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockFolder)
        });
      });
    });

    it("should make a fetch call", () => {
      deleteFolder();

      expect(window.fetch).toHaveBeenCalled();
    });

    it("should return an id of the deleted folder", async () => {
      const result = await deleteFolder(mockFolder.id);

      expect(mockFolder).toEqual(result);
    });

    it("should return error if status is not ok", async () => {
      window.fetch = jest.fn().mockImplementationOnce(() => {
        return Promise.resolve({
          ok: false
        });
      });
      await expect(deleteFolder()).rejects.toEqual(
        Error(Error("Cannot delete folder!"))
      );
    });

    it("should return an error when the promise rejects, ex. the server is down (SAD)", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("fetch error message"));
      });

      expect(deleteFolder()).rejects.toEqual(
        Error(Error("fetch error message"))
      );
    });
  });

  describe("DELETE palettes", () => {
    let mockPalette;

    beforeEach(() => {
      mockPalette = {
        id: 130,
        color1: "#b0fbfc",
        color2: "#e2c47c",
        color3: "#44ea91",
        color4: "#5145d8",
        color5: "#c3ed89",
        name: "3",
        folder_id: 85,
        created_at: "2019-10-15T01:02:08.382Z",
        updated_at: "2019-10-15T01:02:08.382Z"
      };

      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPalette)
        });
      });
    });

    it("should make a fetch call", () => {
      deletePalette();

      expect(window.fetch).toHaveBeenCalled();
    });

    it("should return an id of the deleted folder", async () => {
      const result = await deleteFolder(mockPalette.id);
      expect(mockPalette).toEqual(result);
    });

    it("should return error if status is not ok", async () => {
      window.fetch = jest.fn().mockImplementationOnce(() => {
        return Promise.resolve({
          ok: false
        });
      });
      await expect(deletePalette()).rejects.toEqual(
        Error(Error("Cannot delete palette!"))
      );
    });

    it("should return an error when the promise rejects, ex. the server is down (SAD)", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("fetch error message"));
      });

      expect(deletePalette()).rejects.toEqual(
        Error(Error("fetch error message"))
      );
    });
  });

  describe("POST folders", () => {
    let postedFolder = {
      id: 87,
      name: "Money Greens",
      created_at: "2019-10-15T01:01:50.370Z",
      updated_at: "2019-10-15T01:01:50.370Z"
    };

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(postedFolder)
        });
      });
    });

    it("should call fetch", () => {
      postFolder();

      expect(window.fetch).toHaveBeenCalled();
    });

    it("should post a palette (HAPPY)", async () => {
      const result = await postFolder();

      expect(result).toEqual(postedFolder);
    });

    it("should return an error when the promise rejects (SAD)", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      await expect(postFolder()).rejects.toEqual(
        Error(Error("There was an error posting this folder!"))
      );
    });

    it("should return an error when the promise rejects, ex. the server is down (SAD)", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("fetch error message"));
      });
      expect(postFolder()).rejects.toEqual(Error(Error("fetch error message")));
    });
  });

  describe("POST palettes", () => {
    let postedPalette = {
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

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(postedPalette)
        });
      });
    });

    it("should call fetch", () => {
      postPalette();

      expect(window.fetch).toHaveBeenCalled();
    });

    it("should post a palette (HAPPY)", async () => {
      const result = await postPalette();

      expect(result).toEqual(postedPalette);
    });

    it("should return an error when the promise rejects (SAD)", async () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false
        });
      });
      await expect(postPalette()).rejects.toEqual(
        Error(Error("There was an error posting this palette!"))
      );
    });

    it("should return an error when the promise rejects, ex. the server is down (SAD)", () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error("fetch error message"));
      });
      expect(postPalette()).rejects.toEqual(
        Error(Error("fetch error message"))
      );
    });
  });
});
