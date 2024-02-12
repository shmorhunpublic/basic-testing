import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

// jest.mock('axios', () => ({
//   create: jest.fn(() => {
//     return {
//       get: jest.fn().mockResolvedValue({ data: 'mock data' }),
//     };
//   }),
// }));

jest.mock('axios');

// Define a mocked axios instance with a mocked 'get' method

const mockedAxios = axios.create as jest.MockedFunction<typeof axios.create>;
mockedAxios.mockReturnValue({
  get: jest.fn().mockResolvedValue({ data: 'mock data' }),
} as unknown as AxiosInstance);

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const testPath = '/posts/1';
    const testData = { id: 1, title: 'Test Post' };

    // Use type assertion for the mocked get method
    (axios.create().get as jest.Mock).mockResolvedValueOnce({ data: testData });

    await throttledGetDataFromApi(testPath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const testPath = '/posts/2';
    const testData = { id: 2, title: 'Another Test Post' };

    (axios.create().get as jest.Mock).mockResolvedValueOnce({ data: testData });

    await throttledGetDataFromApi(testPath);
  });

  test('should return response data', async () => {
    const testPath = '/posts/3';
    const testData = { id: 3, title: 'Yet Another Test Post' };

    (axios.create().get as jest.Mock).mockResolvedValueOnce({ data: testData });

    const data = await throttledGetDataFromApi(testPath);
    expect(data).toEqual(testData);
  });
});
