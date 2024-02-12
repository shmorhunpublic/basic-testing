import { doStuffByTimeout, doStuffByInterval } from './index';

describe('doStuffByTimeout', () => {
  // Use fake timers for all tests in this describe block
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('callback is called after specified timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    // At this point, the callback should not have been called
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now, the callback should have been called
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  // Use fake timers for all tests in this describe block
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('callback is called multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    // Fast-forward time by 3000ms
    jest.advanceTimersByTime(3000);

    // Expect the callback to have been called three times
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
