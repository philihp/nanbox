import assert from 'node:assert/strict'
import { test } from 'node:test'
import nanbox, { fromNaN, toNaN } from '../index.ts'

const input = '酷'.codePointAt(0)!

test('toNaN produces a NaN', () => {
  assert.equal(Number.isNaN(toNaN(input)), true)
})

test('fromNaN recovers a payload encoded into a quiet NaN', () => {
  const buffer = new ArrayBuffer(4)
  const floatView = new Float32Array(buffer)
  const intView = new Int32Array(buffer)
  intView[0] = input | 0x7fc00000
  const output = fromNaN(floatView[0])
  assert.equal(output, input)
})

test('toNaN and fromNaN round-trip', () => {
  assert.equal(fromNaN(toNaN(input)), input)
})

test('default export auto-detects direction', () => {
  const packet = nanbox(input)
  assert.equal(Number.isNaN(packet), true)
  assert.equal(nanbox(packet), input)
})

test('encodes and decodes a string', () => {
  const passphrase = '我的氣墊船裝滿了鰻魚'
  const transport = [...passphrase].map((c) => nanbox(c.codePointAt(0)!))
  const out = String.fromCodePoint(...transport.map(nanbox))
  assert.equal(out, passphrase)
})
