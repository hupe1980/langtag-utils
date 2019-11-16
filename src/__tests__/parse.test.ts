import { parse, Langtag } from '../parse';

const initialTag = {
  langtag: {
    language: {
      language: null,
      extlang: []
    },
    script: null,
    region: null,
    variant: [],
    extension: [],
    privateuse: []
  },
  privateuse: [],
  grandfathered: {
    irregular: null,
    regular: null
  }
};

const clone = (value: Langtag): Langtag => JSON.parse(JSON.stringify(value));

describe('parse', () => {
  let expected: Langtag | null = null;

  it('should return null when the tag is null', () => {
    expect(parse('?')).toBe(null);
  });

  it('should return null when the tag does not match the regular expression', () => {
    expect(parse()).toBe(null);
  });

  describe('subtag language', () => {
    beforeEach(() => {
      expected = clone(initialTag);
    });

    it('should parse the language (2*3ALPHA) -> 2', () => {
      const tag = parse('ab');
      if (expected) {
        expected.langtag.language.language = 'ab';
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the language (2*3ALPHA) -> 3', () => {
      const tag = parse('abc');
      if (expected) {
        expected.langtag.language.language = 'abc';
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the language (4ALPHA)', () => {
      const tag = parse('abcd');
      if (expected) {
        expected.langtag.language.language = 'abcd';
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the language (5*8ALPHA) -> 5', () => {
      const tag = parse('abcde');
      if (expected) {
        expected.langtag.language.language = 'abcde';
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the language (5*8ALPHA) -> 6', () => {
      const tag = parse('abcdef');
      if (expected) {
        expected.langtag.language.language = 'abcdef';
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the language (5*8ALPHA) -> 7', () => {
      const tag = parse('abcdefg');
      if (expected) {
        expected.langtag.language.language = 'abcdefg';
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the language (5*8ALPHA) -> 8', () => {
      const tag = parse('abcdefgh');
      if (expected) {
        expected.langtag.language.language = 'abcdefgh';
      }
      expect(tag).toEqual(expected);
    });
  });

  describe('subtag extlang', () => {
    beforeEach(() => {
      expected = clone(initialTag);
      expected.langtag.language.language = 'ab';
    });

    it('should parse the extlang (3ALPHA*2"-" 3ALPHA) -> 1', () => {
      const tag = parse('ab-aaa');
      if (expected) {
        expected.langtag.language.extlang = ['aaa'];
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the extlang (3ALPHA*2"-" 3ALPHA) -> 2', () => {
      const tag = parse('ab-aaa-bbb');
      if (expected) {
        expected.langtag.language.extlang = ['aaa', 'bbb'];
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the extlang (3ALPHA*2"-" 3ALPHA) -> 3', () => {
      const tag = parse('ab-aaa-bbb-ccc');
      if (expected) {
        expected.langtag.language.extlang = ['aaa', 'bbb', 'ccc'];
      }
      expect(tag).toEqual(expected);
    });
  });

  describe('subtag script', () => {
    beforeEach(() => {
      expected = clone(initialTag);
      expected.langtag.language.language = 'ab';
    });

    it('should parse the script (4ALPHA)', () => {
      const tag = parse('ab-aaaa');
      if (expected) {
        expected.langtag.script = 'aaaa';
      }
      expect(tag).toEqual(expected);
    });
  });

  describe('subtag region', () => {
    beforeEach(() => {
      expected = clone(initialTag);
      expected.langtag.language.language = 'ab';
    });

    it('should parse the region (2ALPHA)', () => {
      const tag = parse('ab-cd');
      if (expected) {
        expected.langtag.region = 'cd';
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the region (3DIGIT)', () => {
      const tag = parse('ab-123');
      if (expected) {
        expected.langtag.region = '123';
      }
      expect(tag).toEqual(expected);
    });
  });

  describe('variant', () => {
    beforeEach(() => {
      expected = clone(initialTag);
      expected.langtag.language.language = 'ab';
    });

    it('should parse the variant (5*8alphanum) --> 1 x 5', () => {
      const tag = parse('ab-abcd1');
      if (expected) {
        expected.langtag.variant = ['abcd1'];
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the variant (5*8alphanum) --> 1 x 8', () => {
      const tag = parse('ab-abcd1cd2');
      if (expected) {
        expected.langtag.variant = ['abcd1cd2'];
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the variant (DIGIT 3alphanum) --> 1', () => {
      const tag = parse('ab-1aaa');
      if (expected) {
        expected.langtag.variant = ['1aaa'];
      }
      expect(tag).toEqual(expected);
    });
  });

  describe('subtag extension', function() {
    beforeEach(() => {
      expected = clone(initialTag);
    });

    it('should parse the extension --> 1 x 2', () => {
      const tag = parse('ab-0-a1');
      if (expected) {
        expected.langtag.language.language = 'ab';
        expected.langtag.extension = [
          {
            singleton: '0',
            extension: ['a1']
          }
        ];
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the extension --> 1 x 2 + 1 x 8', () => {
      const tag = parse('ab-0-a1-a-1234567a');
      if (expected) {
        expected.langtag.language.language = 'ab';
        expected.langtag.extension = [
          {
            singleton: '0',
            extension: ['a1']
          },
          {
            singleton: 'a',
            extension: ['1234567a']
          }
        ];
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the extension --> bcp47#section-2.2.6 example', () => {
      const tag = parse('en-Latn-GB-boont-r-extended-sequence-x-private');
      if (expected) {
        expected.langtag.language.language = 'en';
        expected.langtag.script = 'Latn';
        expected.langtag.region = 'GB';
        expected.langtag.variant = ['boont'];
        expected.langtag.extension = [
          {
            singleton: 'r',
            extension: ['extended', 'sequence']
          }
        ];
        expected.langtag.privateuse = ['private'];
      }
      expect(tag).toEqual(expected);
    });
  });

  describe('subtag privateuse', () => {
    beforeEach(() => {
      expected = clone(initialTag);
    });

    it('should parse the privateuse ("x" 1*("-" (1*8alphanum))) --> 1 x 1', () => {
      let tag = parse('x-1');
      if (expected) {
        expected.privateuse = ['1'];
      }
      expect(tag).toEqual(expected);

      tag = parse('x-a');
      if (expected) {
        expected.privateuse = ['a'];
      }
      expect(tag).toEqual(expected);
    });

    it('should parse the privateuse ("x" 1*("-" (1*8alphanum))) --> 8 x 8', () => {
      const tag = parse(
        'x-1234567a-1234567b-1234567c-1234567d-1234567e-1234567f-1234567g-1234567h'
      );
      if (expected) {
        expected.privateuse = [
          '1234567a',
          '1234567b',
          '1234567c',
          '1234567d',
          '1234567e',
          '1234567f',
          '1234567g',
          '1234567h'
        ];
      }
      expect(tag).toEqual(expected);
    });
  });

  describe('subtag grandfathered', () => {
    beforeEach(() => {
      expected = clone(initialTag);
    });

    it('should parse the irregular', () => {
      const tags = [
        'en-GB-oed',
        'i-ami',
        'i-bnn',
        'i-default',
        'i-enochian',
        'i-hak',
        'i-klingon',
        'i-lux',
        'i-mingo',
        'i-navajo',
        'i-pwn',
        'i-tao',
        'i-tay',
        'i-tsu',
        'sgn-BE-FR',
        'sgn-BE-NL',
        'sgn-CH-DE'
      ];
      tags.forEach(tag => {
        if (expected) {
          expected.grandfathered.irregular = tag;
        }
        expect(parse(tag)).toEqual(expected);
      });
    });

    it('should parse the regular', () => {
      const tags = [
        'art-lojban',
        'cel-gaulish',
        'no-bok',
        'no-nyn',
        'zh-guoyu',
        'zh-hakka',
        'zh-min',
        'zh-min-nan',
        'zh-xiang'
      ];
      tags.forEach(tag => {
        if (expected) {
          expected.grandfathered.regular = tag;
        }
        expect(parse(tag)).toEqual(expected);
      });
    });
  });
});
