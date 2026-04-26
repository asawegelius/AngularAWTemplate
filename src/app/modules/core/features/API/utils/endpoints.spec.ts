import { API_ENDPOINTS } from './endpoints';

describe('API_ENDPOINTS', () => {
  it('should expose the sample records endpoint', () => {
    expect(API_ENDPOINTS.sampleRecords).toBe('sample-records');
  });
});
