import chai from 'chai';
import { lispChecker } from './';

const { expect } = chai;

describe('lispChecker', () => {
    it('given a valid lisp parens pairs, returns true', () => {

        const input = `
          (defn lazy-message-seq (list channel consumer)
            (lazy-seq
              (let (list message (delivery-from channel consumer))
                (cons message (lazy-message-seq channel consumer)))))`;

        const output = lispChecker(input);

        expect(output).to.be.ok;
    });

    it('given unbalanced lisp parens, returns false', () => {
        const input = `(a (b (c (d)))`;
        const output = lispChecker(input);

        expect(output).to.be.not.ok;
    });
});
