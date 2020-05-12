export const fromNaN = (input) => {
  const ab = new ArrayBuffer(4)
  const fb = new Float32Array(ab)
  const ib = new Int32Array(ab)
  fb[0] = input
  return ib[0] & 0x3fffff
}

export const toNaN = (input) => {
  const ab = new ArrayBuffer(4)
  const fb = new Float32Array(ab)
  const ib = new Int32Array(ab)
  ib[0] = input | 0x7fc00000
  return fb[0]
}

export default (input) => {
  if (Number.isNaN(input)) {
    return fromNaN(input)
  }
  return toNaN(input)
}
