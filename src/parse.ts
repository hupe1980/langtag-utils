/*
  @see https://tools.ietf.org/html/bcp47
  Language tags are used to help identify languages, whether spoken,
  written, signed, or otherwise signaled, for the purpose of
  communication.  This includes constructed and artificial languages
  but excludes languages not intended primarily for human
  communication, such as programming languages.
*/
const re = /^(?:(en-GB-oed|i-ami|i-bnn|i-default|i-enochian|i-hak|i-klingon|i-lux|i-mingo|i-navajo|i-pwn|i-tao|i-tay|i-tsu|sgn-BE-FR|sgn-BE-NL|sgn-CH-DE)|(art-lojban|cel-gaulish|no-bok|no-nyn|zh-guoyu|zh-hakka|zh-min|zh-min-nan|zh-xiang))$|^((?:[a-z]{2,3}(?:(?:-[a-z]{3}){1,3})?)|[a-z]{4}|[a-z]{5,8})(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[\da-z]{5,8}|\d[\da-z]{3}))*)?((?:-[\da-wy-z](?:-[\da-z]{2,8})+)*)?(-x(?:-[\da-z]{1,8})+)?$|^(x(?:-[\da-z]{1,8})+)$/i;

function shift(array: string[]): string | null {
  return array.shift() || null;
}

export interface Langtag {
  langtag: {
    language: {
      language?: string | null;
      extlang: string[];
    };
    script: string | null;
    region: string | null;
    variant: string[];
    extension: {
      singleton: string;
      extension: string[];
    }[];
    privateuse: string[];
  };
  privateuse: string[];
  grandfathered: {
    irregular?: string | null;
    regular?: string | null;
  };
}

export function parse(tag?: string): Langtag | null {
  if (!tag) return null;

  const result = re.exec(tag);

  if (!result) return null;

  // langtag language
  const langArray = result[3] ? result[3].split('-') : [];
  const language = {
    language: langArray.length > 0 ? shift(langArray) : null,
    extlang: langArray,
  };

  // langtag extension
  const extension = [];
  if (result[7]) {
    const tags = result[7].slice(1).split('-');

    let singleton = '';
    let ext: string[] = [];

    tags.forEach(tag => {
      if (tag.length === 1) {
        if (singleton) {
          extension.push({
            singleton,
            extension: ext,
          });
          singleton = tag;
          ext = [];
        } else {
          singleton = tag;
        }
      } else {
        ext.push(tag);
      }
    });

    extension.push({
      singleton,
      extension: ext,
    });
  }

  return {
    //tag: result[0],
    langtag: {
      language,
      script: result[4] || null,
      region: result[5] || null,
      variant: result[6] ? result[6].slice(1).split('-') : [],
      extension,
      privateuse: result[8] ? result[8].slice(3).split('-') : [],
    },
    privateuse: result[9] ? result[9].slice(2).split('-') : [],
    grandfathered: {
      irregular: result[1] || null,
      regular: result[2] || null,
    },
  };
}
