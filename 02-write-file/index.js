const fs = require('fs');
const path = require('path');
const process = require('process');

const greetingMessage = 'Please, input your text...\n';
const farewellMessage = 'Goodbye, I will miss you.\n';
const fileName = 'text.txt';
const pathToFile = path.join(__dirname, fileName);

makeMessage(greetingMessage);

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

makeMessage(farewellMessage);

function makeMessage(text) {
  process.stdout.write(text);
}
