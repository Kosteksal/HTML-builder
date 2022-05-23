const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

async function copier() {

  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if(err) throw err;
  });

  fs.mkdir(path.join(__dirname, 'project-dist/assets'), { recursive: true }, err => {
    if(err) throw err;
  });
  
  fs.readdir(path.join(__dirname, 'assets'), {withFileTypes : true}, (err, files) => {
    if(err) throw err;
    files.forEach(file => {
      if (file.isDirectory() ) {
        fs.mkdir(path.join(__dirname, `project-dist/assets/${file.name}`), { recursive: true }, err => {
          if(err) throw err;
        });
        fs.readdir(path.join(__dirname, `assets/${file.name}`), {withFileTypes : true}, (err, files) => {
          if(err) throw err;
          files.forEach(filen => {
            fs.copyFile(path.join(__dirname, `assets/${file.name}/${filen.name}`), path.join(__dirname, `project-dist/assets/${file.name}/${filen.name}`), err => {
              if(err) throw err;});
          });   
        });
      }
    });   
  });
  stdout.write('Assets copied!' + '\n');
}    
  
copier();


fs.writeFile(path.join(__dirname, 'project-dist/style.css'), '', err => {
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
          fs.appendFile(path.join(__dirname, 'project-dist/style.css'),  data, err => {
            if(err) throw err;
          });
        }
      });
    }
  });
  stdout.write('CSS merged!' + '\n');
});



function HTMLbuilder() {
  fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist/index.html'), function (error) {
    if (error) throw error;
    fs.readFile(path.join(__dirname, 'project-dist/index.html'), 'utf8', function(error, data) {
      if(error) throw error;
      fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true}, function (error, files) {
        if (error) throw error;
        files.forEach(function(file) {
          fs.readFile(`${path.join(__dirname, 'components')}/${file.name}`, 'utf8', function(error, dataFile) {
            if(error) throw error;
            let tagName = `{{${file.name.split('.')[0]}}}`;
            data = data.replace(tagName, dataFile);
            fs.writeFile(path.join(__dirname, 'project-dist/index.html'), data, function (error) {
              if(error)
                console.log(error);});
          });
        }); 
      });
    });
  });
  stdout.write('HTML builded!!!' + '\n');
}

HTMLbuilder();
