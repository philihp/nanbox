import nanbox, { fromNaN, toNaN } from '..'

const input = '酷'.codePointAt(0)

const ab = new ArrayBuffer(4)
const fb = new Float32Array(ab)
const ib = new Int32Array(ab)

describe('index', () => {
  it('sanity test', () => {
    expect.assertions(1)
    expect(true).toBe(true)
  })

  it('inserts a value into a NaN', () => {
    expect.assertions(4)
    const f = toNaN(input)
    expect(Number.isNaN(f)).toBe(true)
    ib[0] = 0
    expect(fb[0]).toBe(0)
    fb[0] = f
    expect(fb[0]).toBe(Number.NaN)
    const output = ib[0] & 0x3fffff
    expect(output).toBe(input)
  })

  it('extracts a value from a NaN', () => {
    expect.assertions(2)
    ib[0] = input | 0x7fc00000
    const f = fb[0]
    expect(Number.isNaN(f)).toBe(true)
    const output = fromNaN(f)
    expect(output).toBe(input)
  })

  it('inserts and then extracts a value', () => {
    expect.assertions(1)
    const packet = toNaN(input)
    const output = fromNaN(packet)
    expect(input).toBe(output)
  })

  it('detects which direction', () => {
    expect.assertions(2)
    const packet = nanbox(input)
    expect(Number.isNaN(packet)).toBe(true)
    const output = nanbox(packet)
    expect(output).toBe(input)
  })

  it('encodes a string', () => {
    expect.assertions(1)
    const passphrase = '我的氣墊船裝滿了鰻魚'
    const transport = passphrase
      .split('')
      .map((c) => c.codePointAt(0))
      .map(nanbox)
    const out = String.fromCodePoint(...transport.map(nanbox))
    expect(passphrase).toBe(out)
  })
})
