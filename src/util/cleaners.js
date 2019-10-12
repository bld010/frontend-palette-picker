export const cleanPalettes = rawPalettes => {
  return rawPalettes.map(palette => {
    let {
      name,
      colors,
      id,
      folder_id,
      color1,
      color2,
      color3,
      color4,
      color5
    } = palette;

    let cleanedPalette = {
      name,
      id,
      folder_id,
      colors: [color1, color2, color3, color4, color5]
    };

    return cleanedPalette;
  });
};

export const cleanFolders = rawFolders => {
  return rawFolders.map(folder => {
    let { id, name } = folder;
    let cleanedFolder = { id, name, palettes: [] };
    return cleanedFolder;
  });
};

export const cleanData = (folders, palettes) => {
  return folders.map(folder => {
    palettes.forEach(palette => {
      if (palette.folder_id === folder.id) {
        folder.palettes.push(palette);
      }
    });
    return folder;
  });
};
