const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'secret-folder');

//console.log(path);

/* fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      console.log(file);
      console.log(path.extname(file));
      console.log(path.basename(file));
    });
  }
}); */

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        fs.stat(path.join(pathToFolder, file.name), (err, stats) => {
          if (err) {
            return console.log(err);
          }

          const cleanName = file.name.replace(path.extname(file.name), '');
          const cleanExt = path.extname(file.name).replace('.', '');
          const fileSize = (Number(stats.size) / 1024).toFixed(3) + 'kb';

          const result = makeFormatted(cleanName, cleanExt, fileSize);

          displayResult(result);
        });
      }
    });
  }
});

function makeFormatted(name, ext, size) {
  return name + '-' + ext + '-' + size;
}

function displayResult(result) {
  console.log(result);
}
