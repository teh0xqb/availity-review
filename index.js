

// Q: Coding exercise: You are tasked to write a checker that validates the parentheses of a LISP code.  Write a program (in Java or JavaScript) which takes in a string as an input and returns true if all the parentheses in the string are properly closed and nested.

/**
 * Prints state of stack as it changes; presumably on test runner output.
 * Sample Usage: `const stack = debug([]);` (wrap while creating the stack.)
 **/
function debug(dataStructure) {
    return new Proxy(dataStructure, {
        set: function(target, property, value, receiver) {
            console.log(receiver);

            target[property] = value;
            return true;
        }
    });
}

/**
 * Assumptions:
 * - Very simple LISP.
 * - Valid open | close tokens = ( | )
 * abbrev. fn = function
 *
 * - an empty list is ()
 *   - eg. a list with only one empty list: (())
 *
 * There is no reader ' macro, and per requirements we don't check for difference between atom and fns.
 * To simplify this exercise, no strings allowed
 * (not part of requirement; would have to ignore parentheses within strings).
 *
 * All valid:
 * (list 5)
 * (apply + (list 4 5))
 * (list + nil 4 5 (list))
 * (4 5 + 0 (2))
 *
 **/

/**
* Given a string, scans content and checkes whether parentheses are balanced, ala LISP.
**/
export function lispChecker(str) {

    const stack = [];

    const iterator = str[Symbol.iterator]();
    let char = iterator.next();

    while (!char.done) {
        const { value } = char;

        if (value === '(') {
            stack.push(value);
        }
        if (value === ')') {
            stack.pop();
        }
        char = iterator.next();
    }

    // Stack should be empty for balanced s-expressions
    return !stack.length;
}
