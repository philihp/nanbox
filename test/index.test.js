import test from 'ava'
import nanbox, { fromNaN, toNaN } from '../src'

const input = '酷'.codePointAt(0)

const ab = new ArrayBuffer(4)
const fb = new Float32Array(ab)
const ib = new Int32Array(ab)

test('sanity test', (t) => {
  t.is(true, true)
})

test('inserts a value into a NaN', (t) => {
  const f = toNaN(input)
  t.is(Number.isNaN(f), true)
  ib[0] = 0
  t.is(fb[0], 0)
  fb[0] = f
  t.is(fb[0], NaN)
  t.is(ib[0] & 0x3fffff, input)
})

test('extracts a value from a NaN', (t) => {
  ib[0] = input | 0x7fc00000
  const f = fb[0]
  t.is(Number.isNaN(f), true)
  const output = fromNaN(f)
  t.is(output, input)
})

test('inserts and then extracts a value', (t) => {
  const packet = toNaN(input)
  const output = fromNaN(packet)
  t.is(input, output)
})

test('detects which direction', (t) => {
  const packet = nanbox(input)
  t.is(Number.isNaN(packet), true)
  const output = nanbox(packet)
  t.is(output, input)
})

test('encodes a string', (t) => {
  const str = '我的氣墊船裝滿了鰻魚'
  const arr = str.split('').map((c) => toNaN(c.codePointAt(0)))
  const out = String.fromCodePoint(...arr.map((n) => fromNaN(n)))
  t.is(str, out)
})
