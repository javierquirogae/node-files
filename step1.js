const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });
}

const path = process.argv[2];
cat(path);
