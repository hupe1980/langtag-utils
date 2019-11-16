import { navigatorLanguages } from '../navigator-languages';

const mockNavigator = (obj: {
        languages?: string[];
        language?: string;
        browserLanguage?: string;
        userLanguage?: string;
      }): void => {
        for (const [key, value] of Object.entries(obj)) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            Object.defineProperty(navigator, key, {
              value,
              configurable: true
            });
          }
        }
      };

describe('navigatorLanguages', () => {
  beforeEach(() => {
    mockNavigator({
      languages: undefined,
      language: undefined,
      browserLanguage: undefined,
      userLanguage: undefined
    });
  });

  it('should return an empty array when language is undefined.', () => {
    expect(navigatorLanguages()).toEqual([]);
  });

  it('should return all navigator.language values', () => {
    mockNavigator({
      languages: ['de-DE', 'de', 'en']
    });
    expect(navigatorLanguages()).toEqual(['de-DE', 'de', 'en']);
  });

  it('should return navigator.language as array', () => {
    mockNavigator({
      language: 'de-DE'
    });
    expect(navigatorLanguages()).toEqual(['de-DE']);
  });

  it('should return navigator.browserLanguage as array', () => {
    mockNavigator({
      browserLanguage: 'de-DE'
    });
    expect(navigatorLanguages()).toEqual(['de-DE']);
  });

  it('should return navigator.userLanguage as array', () => {
    mockNavigator({
      userLanguage: 'de-DE'
    });
    expect(navigatorLanguages()).toEqual(['de-DE']);
  });

  it('should return all navigator language concatenated as array', () => {
    mockNavigator({
      languages: ['de-DE', 'de', 'en'],
      language: 'en',
      browserLanguage: 'fr',
      userLanguage: 'de'
    });
    expect(navigatorLanguages()).toEqual([
      'de-DE',
      'de',
      'en',
      'en',
      'fr',
      'de'
    ]);
  });
});
