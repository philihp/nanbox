import assert from 'node:assert'
import { test } from 'node:test'
import nanbox, { fromNaN, toNaN } from '../index.js'

const input = '酷'.codePointAt(0)

const ab = new ArrayBuffer(4)
const fb = new Float32Array(ab)
const ib = new Int32Array(ab)

test('sanity test', () => {
  assert.equal(true, true)
})

test('inserts a value into a NaN', () => {
  const f = toNaN(input)
  assert.strictEqual(Number.isNaN(f), true)
  ib[0] = 0
  assert.strictEqual(fb[0], 0)
  fb[0] = f
  assert.strictEqual(fb[0], Number.NaN)
  const output = ib[0] & 0x3fffff
  assert.strictEqual(output, input)
})

test('extracts a value from a NaN', () => {
  ib[0] = input | 0x7fc00000
  const f = fb[0]
  assert.strictEqual(Number.isNaN(f), true)
  const output = fromNaN(f)
  assert.strictEqual(output, input)
})

test('inserts and then extracts a value', () => {
  const packet = toNaN(input)
  const output = fromNaN(packet)
  assert.strictEqual(input, output)
})

test('detects which direction', () => {
  const packet = nanbox(input)
  assert.strictEqual(Number.isNaN(packet), true)
  const output = nanbox(packet)
  assert.strictEqual(output, input)
})

test('encodes a string', () => {
  const passphrase = '我的氣墊船裝滿了鰻魚'
  const transport = passphrase
    .split('')
    .map((c) => c.codePointAt(0))
    .map(nanbox)
  const out = String.fromCodePoint(...transport.map(nanbox))
  assert.strictEqual(passphrase, out)
})
