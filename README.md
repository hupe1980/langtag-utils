# langtag-utils
[![Build Status](https://github.com/hupe1980/langtag-utils/workflows/Build/badge.svg)](https://github.com/hupe1980/langtag-utils/workflows/Build/badge.svg)

> A collection of useful utilities for [bcp47](https://tools.ietf.org/html/bcp47) and [rfc4647](https://tools.ietf.org/html/rfc4647#section-3.4)

### `lookup(tags, ranges, defaultValue = 'en')`

Find the most appropriate language tag that matches a language priority list.

### `navigatorLanguages()`

Retrieves the language information saved in window.navigator backwards compatible.

### `parse(tag)`

Parses the language tag and returns an object with all available information.

## Installation

```bash
npm install --save langtag-utils
```

## How to use

```js
import { lookup, navigatorLanguages, parse } from 'langtag-utils';

const whiteList = ['de', 'en'];
const fallbackLng = 'de';
const detectedLng = lookup(whiteList, navigatorLanguages(), fallbackLng);

...

console.log(parse('en-Latn-GB-boont-r-extended-sequence-x-private'));
/*
{
  langtag: {
    language: {
      language: 'en',
      extlang: [],
    },
    script: 'Latn',
    region: 'GB',
    variant: ['boont'],
    extension: [
      {
        singleton: 'r',
        extension: ['extended', 'sequence'],
      },
    ],
    privateuse: ['private'],
  },
  privateuse: [],
  grandfathered: {
    irregular: null,
    regular: null,
  }
}
*/

...

```

## License

[MIT](LICENSE)
