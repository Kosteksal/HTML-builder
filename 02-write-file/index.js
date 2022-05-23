const path = require('path');
const fs = require('fs');
const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const { stdout, stdin, exit } = require('process');

stdout.write('Your text:');
stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    stdout.write('Goodbye');
    exit();
  }
  writeStream.write(data);
});
process.on('SIGINT', () => {
  stdout.write('Goodbye');
  exit();
});
