const { extractInteger, extractDecimal } = require('./formatNumber');

describe('formatNumber', () => {
  it('should return a correct integer number', () => {
    expect(extractInteger(123456)).toBe(123456);
    expect(extractInteger(123456.55)).toBe(123456);
    expect(extractInteger(0.55)).toBe(0);
    expect(extractInteger('1.55')).toBe(0);
    expect(extractInteger(null)).toBe(0);
    expect(extractInteger(undefined)).toBe(0);
  });

  it('should return a correct decimal number', () => {
    expect(extractDecimal(123456)).toBe(0);
    expect(extractDecimal(123456.55)).toBe(55);
    expect(extractDecimal(0.55)).toBe(55);
    expect(extractDecimal('1.55')).toBe(0);
    expect(extractDecimal(null)).toBe(0);
    expect(extractDecimal(undefined)).toBe(0);
  });
});
