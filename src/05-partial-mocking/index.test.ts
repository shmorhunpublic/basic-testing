// Assuming the file path is correct, adjust as necessary for your project structure
import * as module from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Spy on console.log to verify it's not called
    const consoleSpy = jest.spyOn(console, 'log');

    // Call the mocked functions
    module.mockOne();
    module.mockTwo();
    module.mockThree();

    // Verify console.log was not called
    expect(consoleSpy).not.toHaveBeenCalled();

    // Clean up
    consoleSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    // Spy on console.log to verify it is called
    const consoleSpy = jest.spyOn(console, 'log');

    // Call the unmocked function
    module.unmockedFunction();

    // Verify console.log was called with the expected message
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');

    // Clean up
    consoleSpy.mockRestore();
  });
});
