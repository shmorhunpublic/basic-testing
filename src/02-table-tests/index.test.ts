import { simpleCalculator, Action } from './index';

const testCases = [
  {
    description: 'add two numbers',
    a: 5,
    b: 3,
    action: Action.Add,
    expected: 8,
  },
  {
    description: 'subtract two numbers',
    a: 5,
    b: 3,
    action: Action.Subtract,
    expected: 2,
  },
  {
    description: 'multiply two numbers',
    a: 5,
    b: 3,
    action: Action.Multiply,
    expected: 15,
  },
  {
    description: 'divide two numbers',
    a: 6,
    b: 3,
    action: Action.Divide,
    expected: 2,
  },
  {
    description: 'exponentiate two numbers',
    a: 2,
    b: 3,
    action: Action.Exponentiate,
    expected: 8,
  },
  {
    description: 'return null for invalid action',
    a: 2,
    b: 3,
    action: 'invalid',
    expected: null,
  },
  {
    description: 'return null for invalid arguments',
    a: '2',
    b: 3,
    action: Action.Add,
    expected: null,
  },
  {
    description: 'handle division by zero',
    a: 1,
    b: 0,
    action: Action.Divide,
    expected: Infinity,
  },
  {
    description: 'handle negative numbers in addition',
    a: -5,
    b: -3,
    action: Action.Add,
    expected: -8,
  },
  {
    description: 'handle zero as an exponent',
    a: 5,
    b: 0,
    action: Action.Exponentiate,
    expected: 1,
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$description', ({ a, b, action, expected }) => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
