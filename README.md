# Nan-box

IEEE 754 encodes 32-bit floating points with 1 bit for the sign, 8 bits for the exponent, and 23 bits for the number part (mantissa). For the specific case of NaN (e.g. the result of dividing 0 by 0, or the square root of a negative number), the spec encodes this as `11111111` in the exponent. The sign and the mantissa can be anything, and the spec suggests this can be used for "diagnostic information". One of these bits is used to indicate a quiet NaN (qNaN) which might be expected vs. a signaling NaN (sNaN) which could be reported with a halting exception.

23 bits isn't much space, but conveniently the max size of a Unicode codepoint is 0x10FFFF, making it a 22-bit charset. When you encode your strings in [UTF-32](https://en.wikipedia.org/wiki/UTF-32), you're only going to be using 22 of those bits, so masking the top portion with the NaN signature makes all of your characters NaNs.

## Installation

```bash
npm install --save nanbox
```

## Usage

Use the named function `toNaN` to wrap your clandestine characters in NaNs, and then `fromNaN` to take them back out.

```javascript
import nanbox, { fromNaN, toNaN } from 'nanbox'

const data = '酷'.codePointAt(0)
// => 0x9177
const boxed = toNaN(data)
// => NaN
const unboxed = fromNaN(boxed)
// => 0x9177
```

- Note: Usage does not entail useful.

## References

- https://twitter.com/im889/status/1256770029812514817
- https://anniecherkaev.com/the-secret-life-of-nan
- https://www.doc.ic.ac.uk/~eedwards/compsys/float/nan.html
- http://tom7.org/nand/
- https://stackoverflow.com/questions/27415935/does-unicode-have-a-defined-maximum-number-of-code-points
