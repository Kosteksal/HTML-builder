const path = require ('path');
const fs = require('fs');
const { stdout } = require('process');

fs.writeFile(path.join(__dirname, 'project-dist/bundle.css'), '', err => {
  if(err) throw err;
});

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes : true}, (err, files) => {
  if(err) throw err;
  files.forEach(file => {
    if(path.extname(file.name) == '.css') {
      fs.readFile(path.join(path.join(__dirname, 'styles'), file.name), (err, data) => {
        if(err) {
          throw err;
        } else {
          fs.appendFile(path.join(__dirname, 'project-dist/bundle.css'),  data, err => {
            if(err) throw err;
          });
        }
      });
    }
  });
});
stdout.write('CSS ready!');
