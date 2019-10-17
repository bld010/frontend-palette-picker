export const getFolders = async () => {
  const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/folders/";
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error("There was an error retrieving your folders!");
  } else {
    let data = await res.json();
    return data;
  }
};

export const getPalettes = async () => {
  const url = process.env.REACT_APP_BACKEND_URL + "/api/v1/palettes/";
  let res = await fetch(url);
  if (!res.ok) {
    throw new Error("There was an error retrieving your palettes!");
  } else {
    let data = await res.json();
    return data;
  }
};

export const deleteFolder = async id => {
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/${id}`;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("Cannot delete folder!");
    }
    const deletedFolder = await res.json();
    return deletedFolder;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePalette = async id => {
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes/${id}`;
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("Cannot delete palette!");
    }
    const deletedPalette = await res.json();
    return deletedPalette;
  } catch (error) {
    throw new Error(error);
  }
};

export const postFolder = async folderName => {
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/`;
  const body = {
    name: folderName
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("There was an error posting this folder!");
    }
    const newFolder = await res.json();
    return newFolder;
  } catch (error) {
    throw new Error(error);
  }
};

export const postPalette = async (
  colorOne,
  colorTwo,
  colorThree,
  colorFour,
  colorFive,
  folderId,
  paletteName
) => {
  const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes/`;
  const body = {
    color1: colorOne,
    color2: colorTwo,
    color3: colorThree,
    color4: colorFour,
    color5: colorFive,
    folder_id: folderId,
    name: paletteName
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("There was an error posting this palette!");
    }
    const newPalette = await res.json();
    return newPalette;
  } catch (error) {
    throw new Error(error);
  }
};

// export const patchFolder = async (folderName, id) => {
//   const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/${id}`;
//   const body = {
//     name: folderName
//   };
//   const options = {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body)
//   };

//   try {
//     const res = await fetch(url, options);
//     if (!res.ok) {
//       const error = await res.json();
//       throw new Error(error);
//     }
//     const patchedFolder = await res.json();
//     return patchedFolder;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export const patchPalette = async (
//   colorOne,
//   colorTwo,
//   colorThree,
//   colorFour,
//   colorFive,
//   folderId,
//   paletteName,
//   id
// ) => {
//   const url = process.env.REACT_APP_BACKEND_URL + `/api/v1/palettes/${id}`;
//   const body = {
//     color1: colorOne,
//     color2: colorTwo,
//     color3: colorThree,
//     color4: colorFour,
//     color5: colorFive,
//     folder_id: folderId,
//     name: paletteName
//   };
//   const options = {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body)
//   };

//   try {
//     const res = await fetch(url, options);
//     if (!res.ok) {
//       const error = await res.json();
//       throw new Error(error);
//     }
//     const patchedPalette = await res.json();
//     return patchedPalette;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
