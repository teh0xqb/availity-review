import chai from 'chai';
import { lispChecker } from './';

const { expect } = chai;

describe('lispChecker', () => {
    it('given valid lisp with balanced parentheses, returns true', () => {

        const input = `
          (defn lazy-message-seq (list channel consumer)
            (lazy-seq
              (let (list message (delivery-from channel consumer))
                (cons message (lazy-message-seq channel consumer)))))`;

        const output = lispChecker(input);

        expect(output).to.be.ok;
    });

    it('given unclosed opening lisp parens, returns false', () => {
        const input = `(a (b (c (d)))`;
        const output = lispChecker(input);

        expect(output).to.be.not.ok;
    });

    it('given more closing parentheses at the start, returns false', () => {
        const input = `))()`;
        const output = lispChecker(input);

        expect(output).to.be.not.ok;
    });

    it('given more closing parentheses at the start, returns false', () => {
        const input = `a`;
        const output = lispChecker(input);

        expect(output).to.be.not.ok;
    });

    it('never closes', () => {
        const input = `(a`;
        const output = lispChecker(input);

        expect(output).to.be.not.ok;
    });

    it('extra closing', () => {
        const input = `(a))`;
        const output = lispChecker(input);

        expect(output).to.be.not.ok;
    });
});
