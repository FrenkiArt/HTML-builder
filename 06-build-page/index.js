const fs = require('fs');
const path = require('path');
const pathToSrcCss = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist');
const bundleCssName = 'style.css';
const destCssFile = path.join(pathToDist, bundleCssName);

fs.rm(pathToDist, { recursive: true, force: true }, (err) => {
  if (err) throw err;

  createFolder();
});

function readAndWriteStyles() {
  fs.readdir(pathToSrcCss, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (path.extname(file.name) === '.css' && file.isFile()) {
          fs.readFile(
            path.join(pathToSrcCss, file.name),
            'utf8',
            (err, data) => {
              if (err) {
                console.error(err);
                return;
              }

              fs.appendFile(destCssFile, data, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          );
        }
      });
    }
  });
}

function createFolder() {
  fs.mkdir(pathToDist, { recursive: true }, (err) => {
    if (err) throw err;

    readAndWriteStyles();
    copyFiles();
  });
}

function copyFiles() {
  fs.readdir(
    path.join(__dirname, 'assets'),
    { withFileTypes: true },
    (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          if (file.isFile()) {
            const src = path.join(path.join(__dirname, 'assets'), file.name);
            const dest = path.join(path.join(pathToDist, 'assets'), file.name);
            fs.copyFile(src, dest, (err) => {
              if (err) throw err;
            });
          } else {
            const src = path.join(path.join(__dirname, 'assets'), file.name);
            const dest = path.join(path.join(pathToDist, 'assets'), file.name);
            fs.copyFile(src, dest, (err) => {
              if (err) throw err;
            });
          }
        });
      }
    }
  );
}
