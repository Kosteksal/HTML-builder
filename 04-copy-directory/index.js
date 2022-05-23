const fs = require('fs');
const path = require('path');
const {copyFile} = require('fs/promises');
const { stdout } = require('process');
const folder = path.join(__dirname, 'files');
const folderTo = path.join(__dirname, 'files-copy');

async function copier() {

  fs.mkdir(folderTo, { recursive: true }, err => {
    if(err) throw err;
  });

  await fs.readdir(folderTo, { withFileTypes: true }, (err, files) => {
    if (err)
      throw err;
    for(let file of files) {
      fs.unlink(path.join(folderTo, file.name), err => {
        if (err)
          throw err;
      });
    }
  });

  fs.readdir(folder, {withFileTypes : true}, (err, files) => {
    if(err) throw err;
    files.forEach(file => {
      copyFile(path.join(folder, file.name), path.join(folderTo, file.name));
    });   
  });
  stdout.write('Copied!');
}    

copier();