const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        console.error(`Error reading ${path} :\n ${err}`);
        process.exit(1);
      }
      console.log(data);
    });
  }

function webCat(url) {
  axios.get(url)
    .then(response => console.log(response.data))
    .catch(error => console.error(`Error fetching ${url}:\n  ${error}`));
}

const arg = process.argv[2];

if (arg.startsWith('http')) {
  webCat(arg);
} else {
  cat(arg);
}