const Buffer = require('buffer/').Buffer
const Blob = require("cross-blob");

// let buf = new Buffer("43480000", "hex");
let buf = Buffer.from("7fc00000", "hex");

console.log(buf)

let number = buf.readFloatBE();
console.log(number); // 200

str = "你好!"
str.codePointAt(1)


// 7fc00000
// 01111111110000000000000000000000
// ffc00000
// 01111111110000000000000000000000

// 7fffffff
// 01111111111111111111111111111111
// 7fffffff
// 11111111111111111111111111111111

console.log('-------------')

let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
console.log(str)
console.log(str.length)
console.log(new Blob([str]).size)

const buffer = Buffer.alloc(4)

const fromNaN = input => {
  buffer.writeFloatBE(input)
  return buffer.readUIntBE(0, 4) & 0x3fffff
}

const toNaN = input => {
  buffer.writeUInt32BE(input.codePointAt(0) | 0x7fc00000, 0)
  return buffer.readFloatBE()
}
