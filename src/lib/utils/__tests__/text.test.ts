import { removePolishChars } from '@/lib/utils/text';

describe('removePolishChars', () => {
  it('should remove Polish diacritical marks (lowercase)', () => {
    expect(removePolishChars('ą')).toBe('a');
    expect(removePolishChars('ć')).toBe('c');
    expect(removePolishChars('ę')).toBe('e');
    expect(removePolishChars('ł')).toBe('l');
    expect(removePolishChars('ń')).toBe('n');
    expect(removePolishChars('ó')).toBe('o');
    expect(removePolishChars('ś')).toBe('s');
    expect(removePolishChars('ź')).toBe('z');
    expect(removePolishChars('ż')).toBe('z');
  });

  it('should remove Polish diacritical marks (uppercase)', () => {
    expect(removePolishChars('Ą')).toBe('A');
    expect(removePolishChars('Ć')).toBe('C');
    expect(removePolishChars('Ę')).toBe('E');
    expect(removePolishChars('Ł')).toBe('L');
    expect(removePolishChars('Ń')).toBe('N');
    expect(removePolishChars('Ó')).toBe('O');
    expect(removePolishChars('Ś')).toBe('S');
    expect(removePolishChars('Ź')).toBe('Z');
    expect(removePolishChars('Ż')).toBe('Z');
  });

  it('should preserve regular ASCII characters', () => {
    expect(removePolishChars('abc')).toBe('abc');
    expect(removePolishChars('ABC')).toBe('ABC');
    expect(removePolishChars('123')).toBe('123');
  });

  it('should handle mixed text with Polish and ASCII characters', () => {
    expect(removePolishChars('Kraków')).toBe('Krakow');
    expect(removePolishChars('Łódź')).toBe('Lodz');
    expect(removePolishChars('Gdańsk')).toBe('Gdansk');
    expect(removePolishChars('Ćma #Łódź!')).toBe('Cma #Lodz!');
    expect(removePolishChars('Łódź 2026, Kraków!')).toBe('Lodz 2026, Krakow!');
  });

  it('should handle empty strings', () => {
    expect(removePolishChars('')).toBe('');
  });

  it('should handle strings with spaces and special characters', () => {
    expect(removePolishChars('Warszawa - Polska')).toBe('Warszawa - Polska');
  });

  it('should handle null or undefined gracefully', () => {
    expect(removePolishChars(null as any)).toBe(null);
    expect(removePolishChars(undefined as any)).toBe(undefined);
  });
});
