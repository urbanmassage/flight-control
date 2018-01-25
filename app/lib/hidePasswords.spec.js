'use strict';

const { expect } = require('chai');

const hidePasswords = require('./hidePasswords');

describe('lib/hidePasswords', () => {
  it('should replace every string under given paths with ***', () => {
    // given
    const obj = {
      a: {
        b: {
          c: {
            d: {
              e: 'password',
            },
          },
        },
      },
      b: {
        d: {
          e: '123',
        },
      },
      c: 'password',
    };
    const paths = [['a', 'b', 'c', 'd', 'e'], ['b', 'd', 'e', 'f'], ['c']];

    // when
    hidePasswords(obj, paths);

    // then
    expect(obj).to.deep.equal({
      a: {
        b: {
          c: {
            d: {
              e: '***',
            },
          },
        },
      },
      b: {
        d: {
          e: '123',
        },
      },
      c: '***',
    });
  });

  it('should not break when given object is not an object', () => {
    hidePasswords(null, ['a']);
    hidePasswords([], ['a']);
    hidePasswords('a', ['a']);
  });
});
