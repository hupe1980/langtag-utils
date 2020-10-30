import { lookup } from '../lookup';

describe('lookup', () => {
  it('should return en when no parameter is passed', () => {
    const detected = lookup();
    expect(detected).toBe('en');
  });

  it('should return default when tags are null', () => {
    const detected = lookup(undefined, ['de', 'en'], 'default');
    expect(detected).toEqual('default');
  });

  it('should return default when ranges are null', () => {
    const detected = lookup(['de'], undefined, 'default');
    expect(detected).toEqual('default');
  });

  it('should accept strings and arrays', () => {
    expect(lookup(['de'], ['de'], 'default')).toEqual(
      lookup('de', 'de', 'default'),
    );
  });

  it('should ignore wildcards [*] in ranges', () => {
    const detected = lookup(['de'], ['en', '*', 'de'], 'default');
    expect(detected).toEqual('de');
  });

  it('should use lookup fallback pattern test#1', () => {
    const detected = lookup(
      ['en', 'zh', 'de'],
      ['zh-Hant-CN-x-private1-private2'],
      'default',
    );
    expect(detected).toEqual('zh');
  });

  it('should use lookup fallback pattern test#2', () => {
    const detected = lookup(['de', 'en'], ['de-DE', 'de-AT'], 'default');
    expect(detected).toEqual('de');
  });

  it('should use lookup fallback pattern test#3', () => {
    const detected = lookup(['de', 'gb'], ['en-US', 'fr-CH'], 'default');
    expect(detected).toEqual('default');
  });
});
