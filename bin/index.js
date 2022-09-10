#!/usr/bin/env node
'use strict';

const fs = require('fs');
const readline = require('readline');

const yargs = require('yargs');

const options = yargs
  .usage('Usage: -f <file_path>')
  .options('f', {
    alias: 'file',
    describe: 'give file',
    type: 'string',
    demandOption: true,
  })
  .options('c', {
    alias: 'col',
    describe: 'Enter coloumn number to read from CSV file',
    type: 'number',
    demandOption: true,
  })
  .options('s', {
    alias: 'regexsplit',
    describe:
      'Enter Regex with enclose with single quate to split csv col llke "","" => \'"",""\' or default spliter will be comma',
    type: 'string',
    demandOption: false,
  }).argv;

const file = options.f;
const coloumn = options.c;
const regex = options.s;

const rl = readline.createInterface({
  input: fs.createReadStream(file),
  output: process.stdout,
  terminal: false,
});

rl.on('line', function (line) {
  const strArray = line.split(regex);
  if (strArray.length > coloumn) {
    process.stdout.write(`${strArray[coloumn]}\n`);
  } else {
    console.error('Error: Regex split string ArrayIndexOfOutOfBound Exception');
  }
});
// ======================== Read file from string using command with linux command with pipe

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

// if(!rl.input._readableState.needReadable){
//   rl.on('line', (line) => {
//     if ("exp" in options) {
//       let inputText = `${line.trim()}`;
//       options.exp.forEach(element => {
//         let regexText = `${element.trim().replace("^'", '').replace("'$",'')}`;
//         let regexStr =  new RegExp(regexText, 'g');
//         inputText = inputText.replace(regexStr, '').replace(/(?:\r\n|\r|\n)/g,'')
//         let regexSlaceStr =  new RegExp('(^{)(\\\\)+(")(.*)(}$)');
//         while (true) {
//           if (regexSlaceStr.test(inputText)){
//             inputText = '"' + inputText + '"';
//             inputText = JSON.parse(inputText)
//           } else{
//             break;
//           }
//         }
//       });
//       //process.stdout.write(`${inputText.trim()}`)
//       console.log(`${inputText.trim()}`)
//     } else {
//       process.stdout.write(`${line.trim()}`)
//     }
//   }).on('close', () => {
//     process.exit(0);
//   });
// } else {
//   rl.close()
//   process.exit(0);
// }

// ============================[Read file using argumens]=======================
// const readFile = require('fs').readFile;
// const yargs = require("yargs");

// const options = yargs
//   .usage("Usage: -f <file_path>")
//   .options("f", { alias: "file", describe: "give file", type: "string", demandOption: true })
//  .argv;

// const file = options.f;

// readFile(file, (err, dataBuffer) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(dataBuffer.toString());
//     }
//   });

// --------------------------------------

// process.stdin.setEncoding('utf8');

// process.stdin.on('readable', function() {
//   var chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write('data: ' + chunk);
//   }
// });

// process.stdin.on('end', function() {
//   process.stdout.write('end');
// });

// ------------------
// var readline = require('readline');
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false
// });

// rl.on('line', function(line){
//     console.log(line);
// })
// --------------
//process.stdin.resume();
//process.stdin.setEncoding('utf8');
//process.stdin.on('data', function(data) {
//  process.stdout.write(data);
//});
