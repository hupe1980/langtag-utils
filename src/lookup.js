/* @see https://tools.ietf.org/html/rfc4647#section-3.4
  Lookup is used to select the single language tag that best matches
  the language priority list for a given request.  When performing
  lookup, each language range in the language priority list is
  considered in turn, according to priority.  By contrast with
  filtering, each language range represents the most specific tag that
  is an acceptable match.  The first matching tag found, according to
  the user's priority, is considered the closest match and is the item
  returned.
*/

function lookup(tags, ranges, defaultValue = null) {
  if (!tags || !ranges) return defaultValue;

  tags = Array.isArray(tags) ? tags : [tags];
  ranges = Array.isArray(ranges) ? ranges : [ranges];

  for (let i = 0; i < ranges.length; i++) {
    // If the language range "*" is followed by other
    // language ranges, it is skipped.
    if (ranges[i] === '*') continue;
    const match = tags.find(tag =>
      check(tag.toLowerCase(), ranges[i].toLowerCase()),
    );
    if (match) return match;
  }
  // If no language tag matches the
  // request, the "default" value is returned.
  return defaultValue;
}

function check(tag, range) {
  while (true) {
    if (range === '*' || tag === range) {
      return true;
    }

    let pos = range.lastIndexOf('-');

    if (pos === -1) {
      return false;
    }

    if (pos > 3 && range.charAt(pos - 2) === '-') {
      pos -= 2;
    }

    range = range.substring(0, pos);
  }
}

export default lookup;
