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

function check(tag: string, range: string): boolean {
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

  return check(tag, range);
}

function matcher(tags: string[], range: string): string | undefined {
  return tags.find(tag => check(tag.toLowerCase(), range.toLowerCase()));
}

export function lookup(
  tags?: string | string[],
  ranges?: string | string[],
  defaultValue = 'en'
): string {
  if (!tags || !ranges) return defaultValue;

  tags = Array.isArray(tags) ? tags : [tags];
  ranges = Array.isArray(ranges) ? ranges : [ranges];

  for (let i = 0; i < ranges.length; i++) {
    // If the language range "*" is followed by other
    // language ranges, it is skipped.
    if (ranges[i] === '*') continue;

    const match = matcher(tags, ranges[i]);

    if (match) return match;
  }
  // If no language tag matches the
  // request, the "default" value is returned.
  return defaultValue;
}
