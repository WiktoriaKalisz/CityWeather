import { iconInfoMap } from '@/lib/utils/icons';

describe('iconInfoMap', () => {
  it('should have at least 18 weather icon mappings', () => {
  expect(Object.keys(iconInfoMap).length).toBeGreaterThanOrEqual(18);
});

  it('should map day clear weather correctly', () => {
    const clearDay = iconInfoMap['01d'];
    expect(clearDay).toBeDefined();
    expect(clearDay.icon).toBe('/icons/clear-day.png');
    expect(clearDay.bg).toBe('bg-gradient-to-b from-sky-300 to-orange-300');
  });

  it('should map night clear weather correctly', () => {
  const clearNight = iconInfoMap['01n'];
  const clearDay = iconInfoMap['01d'];

  expect(clearNight).toBeDefined();
  expect(clearNight.bg).toContain('bg-gradient-to-b');
  expect(clearNight.bg).not.toBe(clearDay.bg);
});


  it('should have both icon and bg properties for all mappings', () => {
    Object.entries(iconInfoMap).forEach(([code, info]) => {
      expect(info).toHaveProperty('icon');
      expect(info).toHaveProperty('bg');
      expect(typeof info.icon).toBe('string');
      expect(typeof info.bg).toBe('string');
      expect(info.icon).toMatch(/^\/icons\//);
      expect(info.bg).toContain('bg-gradient-to-b');
    });
  });

  it('should handle rain weather codes', () => {
    const rainDay = iconInfoMap['10d'];
    const rainNight = iconInfoMap['10n'];
    expect(rainDay).toBeDefined();
    expect(rainNight).toBeDefined();
  });

  it('should handle thunderstorm weather codes', () => {
    const thunderDay = iconInfoMap['11d'];
    const thunderNight = iconInfoMap['11n'];
    expect(thunderDay.icon).toMatch(/thunderstorm/);
    expect(thunderNight.icon).toMatch(/thunderstorm/);
  });

  it('should handle snow weather codes', () => {
    const snowDay = iconInfoMap['13d'];
    const snowNight = iconInfoMap['13n'];
    expect(snowDay.icon).toMatch(/snow/);
    expect(snowNight.icon).toMatch(/snow/);
  });

  it('should have different backgrounds for day and night variants', () => {
    Object.keys(iconInfoMap).forEach((code) => {
      if (code.endsWith('d')) {
        const dayCode = code;
        const nightCode = code.replace('d', 'n');
        if (iconInfoMap[nightCode]) {
          // skip mist (50d/50n) which intentionally has the same background
          if (dayCode !== '50d') {
            expect(iconInfoMap[dayCode].bg).not.toBe(iconInfoMap[nightCode].bg);
          }
        }
      }
    });
  });
});
