import { describe, it, expect } from 'vitest';
import { formatearPrecio, campoVacio } from '../../utils/formatters';

describe('formatearPrecio', () => {
  it('formats price in CLP currency', () => {
    expect(formatearPrecio(1000)).toBe('$1.000');
    expect(formatearPrecio(1500.50)).toBe('$1.501');
    expect(formatearPrecio(0)).toBe('$0');
  });

  it('handles negative values', () => {
    expect(formatearPrecio(-1000)).toBe('-$1.000');
  });
});

describe('campoVacio', () => {
  it('returns true for empty values', () => {
    expect(campoVacio('')).toBe(true);
    expect(campoVacio('   ')).toBe(true);
    expect(campoVacio(null)).toBe(true);
    expect(campoVacio(undefined)).toBe(true);
  });

  it('returns false for non-empty values', () => {
    expect(campoVacio('test')).toBe(false);
    expect(campoVacio('  test  ')).toBe(false);
    expect(campoVacio('0')).toBe(false);
  });
});