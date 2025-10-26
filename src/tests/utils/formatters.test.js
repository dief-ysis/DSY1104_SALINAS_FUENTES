import { formatearPrecio, campoVacio } from '../../utils/formatters';

describe('formatearPrecio', () => {
  describe('formato básico', () => {
    it('formatea precios en moneda CLP con símbolo', () => {
      expect(formatearPrecio(1000)).toBe('$1.000');
      expect(formatearPrecio(1500.50)).toBe('$1.501');
      expect(formatearPrecio(0)).toBe('$0');
      expect(formatearPrecio(1000000)).toBe('$1.000.000');
    });

    it('maneja valores negativos correctamente', () => {
      expect(formatearPrecio(-1000)).toBe('-$1.000');
      expect(formatearPrecio(-1500.50)).toBe('-$1.500'); // Math.round redondea hacia el par más cercano
      expect(formatearPrecio(-1500.6)).toBe('-$1.501'); // Redondea hacia arriba en valor absoluto
    });

    it('formatea precios sin símbolo de moneda cuando conSimbolo es false', () => {
      expect(formatearPrecio(1000, false)).toBe('1.000');
      expect(formatearPrecio(1500.50, false)).toBe('1.501');
      expect(formatearPrecio(-1000, false)).toBe('-1.000');
    });

    it('redondea decimales al entero más cercano', () => {
      expect(formatearPrecio(1000.4)).toBe('$1.000');
      expect(formatearPrecio(1000.5)).toBe('$1.001');
      expect(formatearPrecio(1000.6)).toBe('$1.001');
    });
  });

  describe('manejo de errores', () => {
    it('lanza error para valores nulos o indefinidos', () => {
      expect(() => formatearPrecio(null)).toThrow();
      expect(() => formatearPrecio(undefined)).toThrow();
    });

    it('lanza error para objetos y arrays', () => {
      expect(() => formatearPrecio({})).toThrow();
      expect(() => formatearPrecio([])).toThrow();
    });

    it('lanza error para NaN', () => {
      expect(() => formatearPrecio(NaN)).toThrow();
    });
  });

  describe('casos límite', () => {
    it('maneja números muy grandes correctamente', () => {
      expect(formatearPrecio(1000000000)).toBe('$1.000.000.000');
    });

    it('maneja números muy pequeños correctamente', () => {
      expect(formatearPrecio(0.1)).toBe('$0');
      expect(formatearPrecio(0.9)).toBe('$1');
    });
  });
});

describe('campoVacio', () => {
  describe('valores vacíos', () => {
    it('retorna true para strings vacíos', () => {
      expect(campoVacio('')).toBe(true);
      expect(campoVacio('   ')).toBe(true);
      expect(campoVacio('\n')).toBe(true);
      expect(campoVacio('\t')).toBe(true);
    });

    it('retorna true para valores nulos o indefinidos', () => {
      expect(campoVacio(null)).toBe(true);
      expect(campoVacio(undefined)).toBe(true);
    });
  });

  describe('valores no vacíos', () => {
    it('retorna false para strings con contenido', () => {
      expect(campoVacio('text')).toBe(false);
      expect(campoVacio('  text  ')).toBe(false);
      expect(campoVacio('0')).toBe(false);
      expect(campoVacio(' . ')).toBe(false);
    });

    it('maneja tipos de datos no string correctamente', () => {
      expect(campoVacio(0)).toBe(false);
      expect(campoVacio(1)).toBe(false);
      expect(campoVacio(true)).toBe(false);
      expect(campoVacio(false)).toBe(false);
      // Arrays y objetos vacíos se consideran vacíos
      expect(campoVacio([])).toBe(true);
      expect(campoVacio({})).toBe(true);
      // Arrays y objetos con contenido se consideran no vacíos
      expect(campoVacio([1])).toBe(false);
      expect(campoVacio({ a: 1 })).toBe(false);
    });
  });

  describe('casos especiales', () => {
    it('maneja caracteres especiales correctamente', () => {
      expect(campoVacio('🌟')).toBe(false);
      expect(campoVacio('ñ')).toBe(false);
      expect(campoVacio('á')).toBe(false);
    });
  });
});