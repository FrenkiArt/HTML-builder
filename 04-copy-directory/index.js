const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'files');
const newFolderName = 'files-copy';
const pathToNewFolder = path.join(__dirname, newFolderName);

removeFolder();

function removeFolder() {
  fs.rm(pathToNewFolder, { recursive: true, force: true }, (err) => {
    if (err) throw err;

    createFolder();
  });
}

function createFolder() {
  fs.mkdir(pathToNewFolder, { recursive: true }, (err) => {
    if (err) throw err;

    copyFiles();
  });
}

function copyFiles() {
  fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (file.isFile()) {
          const src = path.join(pathToFolder, file.name);
          const dest = path.join(pathToNewFolder, file.name);
          fs.copyFile(src, dest, (err) => {
            if (err) throw err;
          });
        }
      });
    }
  });
}
