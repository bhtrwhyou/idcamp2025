import { test } from 'node:test';
import assert from 'node:assert';
import sum from './index.js';

// Test: dua angka positif
test('Menjumlahkan dua angka positif', () => {
  assert.strictEqual(sum(2, 3), 5);
});

// Test: salah satu argumen bukan number
test('Mengembalikan 0 jika salah satu argumen bukan number', () => {
  assert.strictEqual(sum('2', 3), 0);
  assert.strictEqual(sum(2, '3'), 0);
  assert.strictEqual(sum('a', 'b'), 0);
});

// Test: kedua angka negatif
test('Mengembalikan 0 jika kedua angka negatif', () => {
  assert.strictEqual(sum(-2, -3), 0);
});

// Test: salah satu angka negatif
test('Mengembalikan 0 jika salah satu angka negatif', () => {
  assert.strictEqual(sum(-2, 3), 0);
  assert.strictEqual(sum(5, -1), 0);
});

// Test: angka nol
test('Menjumlahkan angka dengan nol', () => {
  assert.strictEqual(sum(0, 5), 5);
  assert.strictEqual(sum(5, 0), 5);
});

// Test: kedua angka nol
test('Menjumlahkan dua angka nol', () => {
  assert.strictEqual(sum(0, 0), 0);
});
