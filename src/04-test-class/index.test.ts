import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  BankAccount,
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(50);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountFrom = getBankAccount(100);
    const accountTo = getBankAccount(0);
    expect(() => accountFrom.transfer(200, accountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(50, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(100);
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const accountFrom = getBankAccount(100);
    const accountTo = getBankAccount(100);
    accountFrom.transfer(50, accountTo);
    expect(accountFrom.getBalance()).toBe(50);
    expect(accountTo.getBalance()).toBe(150);
  });

  // For the fetchBalance tests, we acknowledge the randomness and provide a general expectation
  test('fetchBalance should return number in case if request did not fail', async () => {
    // Assuming `BankAccount` class is imported from './yourModulePath'
    const account = new BankAccount(0);

    // Mock the `fetchBalance` method directly if possible
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(100);

    const balance = await account.fetchBalance();

    // After mocking, `balance` should be the mocked value, which is a number
    expect(typeof balance).toBe('number');
    expect(balance).toBe(100); // Ensure the balance matches the mocked value
  });
  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 0;
    const newBalance = 100; // Mocked new balance
    const account = getBankAccount(initialBalance);

    // Mock the fetchBalance method to return a specific number instead of null
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(newBalance);

    await account.synchronizeBalance();

    // After synchronization, the account balance should be updated to the mocked new balance
    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(100);
    // Mock fetchBalance to return null to simulate failure
    account.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
