import { QueryStringParameters } from './query-string-parameters';

describe('QueryStringParameters', () => {
  let queryParams: QueryStringParameters;

  beforeEach(() => {
    queryParams = new QueryStringParameters();
  });

  it('should be created', () => {
    expect(queryParams).toBeTruthy();
  });

  describe('pushOrReplace', () => {
    it('should push a new parameter when key does not exist', () => {
      queryParams.pushOrReplace('key1', 'value1');
      expect(queryParams.toString()).toBe('key1=value1');
    });

    it('should replace the value of the existing parameter when key exists', () => {
      queryParams.pushOrReplace('key1', 'value1');
      queryParams.pushOrReplace('key1', 'value2');
      expect(queryParams.toString()).toBe('key1=value2');
    });

    it('should handle special characters properly', () => {
      queryParams.pushOrReplace('key1', 'value with spaces');
      queryParams.pushOrReplace('key2', 'value&with&special&characters');
      expect(queryParams.toString()).toBe('key1=value%20with%20spaces&key2=value%26with%26special%26characters');
    });
  });

  describe('toString', () => {
    it('should return an empty string when there are no parameters', () => {
      expect(queryParams.toString()).toBe('');
    });

    it('should return the parameters as a concatenated string', () => {
      queryParams.pushOrReplace('key1', 'value1');
      queryParams.pushOrReplace('key2', 'value2');
      expect(queryParams.toString()).toBe('key1=value1&key2=value2');
    });
  });
});
