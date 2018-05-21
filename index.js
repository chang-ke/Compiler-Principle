const fs = require('fs');
const ffi = require('ffi');
const Dll = ffi.Library('./dll/x64/Debug/CompilersPrinciplesDll.dll', {
  parse: ['string', ['string']]
});

let codeStr = fs.readFileSync('./main.cpp', 'utf-8').split('\r').join('');
let s = Dll.parse(codeStr);
//console.log(s);
let arr = JSON.parse(s);
arr.forEach((item, index) => {
    console.log(`${index}: `, item);
});