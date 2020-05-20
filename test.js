import chai from 'chai';
import { lispChecker } from './';

const { expect } = chai;

/**
 * Assumption: there is no reader ' quote;
 *   that is, the list fn is needed in order to create a list of atoms.
 * fn = function
 **/

const goodSimple = `
(= 4 (+ 2 2))
`;

// (eq nil (list))
// (list)

const goodSampleInput = `
(defn lazy-message-seq (list channel consumer)
  (lazy-seq
   (let (list message (delivery-from channel consumer))
     (cons message (lazy-message-seq channel consumer)))))
`;

const weirdGoodInput = `
(1 () (2 . 3) (4))
`;

// first token must be a fn
const badInput = `
(((((())))))
`;

const looksWeirdButGood = `
(list (list (list (list 0))))
`;

const badInput2 = `
(a (b (c (d)))
`;

const trickyGood = `
(1 2 (3 4 ("hello (world" a)))
`;

const trickyStringBad = `
(1 2 (3 4 ("hello (world" a))))
`;

describe('lispChecker', () => {
    it('true if valid', () => {
        const input = '(((())))';
        const output = lispChecker(input);

        expect(output).to.be.ok;
    });

    // it('false if invalid', () => {
    //     const input = '(((()))';
    //     const output = lispChecker(input);

    //     expect(output).to.be.not.ok;
    // });
});
