function navigatorLanguages(options = {}) {
  if (typeof navigator === undefined) return null;

  let detected = [];

  if (navigator.languages) {
    detected = [...navigator.languages];
  }

  if (navigator.language) {
    detected.push(navigator.language);
  }

  if (navigator.browserLanguage) {
    detected.push(navigator.browserLanguage);
  }

  if (navigator.userLanguage) {
    detected.push(navigator.userLanguage);
  }

  return detected.length > 0 ? detected : null;
}

export default navigatorLanguages;
