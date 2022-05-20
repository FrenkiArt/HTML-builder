const fs = require('fs');
const path = require('path');
const pathToSrcCss = path.join(__dirname, 'styles');
const pathToDistCss = path.join(__dirname, 'project-dist');
const bundleName = 'bundle.css';
const destCssFile = path.join(pathToDistCss, bundleName);
const stylesArr = [];

fs.rm(destCssFile, { recursive: true, force: true }, (err) => {
  if (err) throw err;

  readAndWrite();
});

function readAndWrite() {
  fs.readdir(pathToSrcCss, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        if (path.extname(file.name) === '.css' && file.isFile()) {
          /*  const readableStream = fs.createReadStream(
          path.join(pathToSrcCss, file.name),
          'utf8'
        );

        readableStream.on('data', function (chunk) {
          stylesArr.push(chunk);
        }); */

          fs.readFile(
            path.join(pathToSrcCss, file.name),
            'utf8',
            (err, data) => {
              if (err) {
                console.error(err);
                return;
              }

              stylesArr.push(data);

              // Так и не понял как дождаться конца
              // асинхронного кода в данном случае,
              // заполняющего массив,
              // поэтому сделал через appendFile.
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

/* let file = fs.createWriteStream(destCssFile);

file.on('error', function (err) {
  console.log(err);
});

stylesArr.forEach((item) => {
  file.write(`${item}\n`);
  file.write('111');
}); */

//file.end();
