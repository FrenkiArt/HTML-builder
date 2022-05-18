const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathToFile, 'utf8');

readableStream.on('data', function (chunk) {
  console.log(chunk);
});
