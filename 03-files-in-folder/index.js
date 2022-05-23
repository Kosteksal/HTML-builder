const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true} , ( err, data) => {
  if (err) {
    return stdout.write(err);
  }
  data.forEach(file => {
    if (file.isFile() ) {  
      fs.stat( path.join(path.join(__dirname, 'secret-folder'), file.name) , (err, stats) => {
        if (err) {
          return stdout.write(err);
        }
        stdout.write( path.parse( file.name).name + ' - ' + path.extname( file.name).split('.').pop() + ' - ' +  stats.size + 'b' + '\n' );
      });
    }
  });
} );