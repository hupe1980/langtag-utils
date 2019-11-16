export type LegacyNavigator = Navigator & {
  browserLanguage?: string;
  userLanguage?: string;
};

export function navigatorLanguages(): string[] {
  if (typeof navigator === undefined) return [];

  let detected: string[] = [];

  if (navigator.languages) {
    detected = [...navigator.languages];
  }

  if (navigator.language) {
    detected.push(navigator.language);
  }

  const legacyNavigator = navigator as LegacyNavigator;

  if (legacyNavigator.browserLanguage) {
    detected.push(legacyNavigator.browserLanguage);
  }

  if (legacyNavigator.userLanguage) {
    detected.push(legacyNavigator.userLanguage);
  }

  return detected;
}
