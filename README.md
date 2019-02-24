# langtag-utils

[![Build Status](https://travis-ci.org/hupe1980/langtag-utils.svg?branch=master)](https://travis-ci.org/hupe1980/langtag-utils)

> A collection of useful utilities for [bcp47](https://tools.ietf.org/html/bcp47) and [rfc4647](https://tools.ietf.org/html/rfc4647#section-3.4)

### `lookup(tags, ranges, defaultValue)`

Find the most appropriate language tag that matches a language priority list.

### `navigatorLanguages()`

Retrieves the language information saved in window.navigator backwards compatible.

### `parse(tag)`

Parses the language tag and returns an object with all available information.

## Installation

```sh
yarn add @wapps/langtag-utils
# npm install --save @wapps/langtag-utils
```

## Usage

```js
import { lookup, navigatorLanguages, parse } from '@wapps/langtag-utils';

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
