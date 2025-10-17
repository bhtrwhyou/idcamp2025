import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './index.js';

test('fungsi sum menambahkan dua angka dengan benar', () => {
  const result = sum(10, 15);
  assert.strictEqual(result, 25);
});

test('fungsi sum bekerja untuk angka negatif', () => {
  const result = sum(-5, 7);
  assert.strictEqual(result, 2);
});

test('fungsi sum bekerja untuk nol', () => {
  const result = sum(0, 9);
  assert.strictEqual(result, 9);
});
