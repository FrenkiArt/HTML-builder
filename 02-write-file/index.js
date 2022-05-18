const fs = require('fs');
const path = require('path');
const process = require('process');

const greetingMessage = '\nPlease, input your text...\n';
const farewellMessage = '\nGoodbye, I will miss you.\n';
const fileName = 'text.txt';
const pathToFile = path.join(__dirname, fileName);

makeMessage(greetingMessage);

listenInput();

function makeMessage(text) {
  process.stdout.write(text);
}

function listenInput() {
  process.stdin.on('data', function (data) {
    if (data.toString().trim() === 'exit') {
      process.exit();
    }

    const cleanData = data.toString().trim() + '\n';

    fs.appendFile(pathToFile, cleanData, function (error) {
      if (error) throw error;
    });

    process.on('beforeExit', (code) => {
      console.log('Process beforeExit event with code: ', code);
    });

    process.on('exit', (code) => {
      // console.log('Process exit event with code: ', code);
      makeMessage(farewellMessage);
    });
  });
}
