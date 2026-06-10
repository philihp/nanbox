const buffer = new ArrayBuffer(4)
const floatView = new Float32Array(buffer)
const intView = new Int32Array(buffer)

const QUIET_NAN_MASK = 0x7fc00000
const PAYLOAD_MASK = 0x3fffff

export const fromNaN = (input: number): number => {
  floatView[0] = input
  return intView[0] & PAYLOAD_MASK
}

export const toNaN = (input: number): number => {
  intView[0] = input | QUIET_NAN_MASK
  return floatView[0]
}

const nanbox = (input: number): number => (Number.isNaN(input) ? fromNaN(input) : toNaN(input))

export default nanbox
