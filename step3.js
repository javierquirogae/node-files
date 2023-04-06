const fs = require('fs');
const axios = require('axios');

// arg is the first command line argument
const arg = process.argv[2];
// outputArg is the second command line argument
const outputArg = process.argv[3];
// inputArg is the third command line argument
const inputArg = process.argv[4];

// output is a function that either console.logs or writes to a file
let output = console.log;

// if --out is passed, set output to write to a file
if (arg === "--out") {
  output = function (data) {
    fs.writeFile(outputArg, data, (err) => {
      if (err) {
        console.error(`Couldn't write ${outputArg}:\n  ${err}`);
        return;
      }
      console.log(`Successfully wrote to ${outputArg}`);
    });
  };
// if --out is not passed, set output to console.log
} else {
  inputArg = arg;
}

// if the input argument starts with http, use webCat
if (inputArg.startsWith('http')) {
  webCat(inputArg, (err, data) => {
    if (err) {
      console.error(`Error fetching ${inputArg}:\n  ${err}`);
      return;
    }
    output(data);
  });
// otherwise, use cat
} else {
  cat(inputArg, (err, data) => {
    if (err) {
      console.error(`Error reading ${inputArg}:\n  ${err}`);
      return;
    }
    output(data);
  });
}

// cat webCat are now asynchronous functions that take a callback
function cat(path, cb) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, data);
    });
  }
 
// webCat is now an asynchronous function that takes a callback
function webCat(url, cb) {
    axios.get(url)
      .then(response => cb(null, response.data))
      .catch(error => cb(error));
  }
  
