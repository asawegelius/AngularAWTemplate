/**
 * Represents a collection of query string parameters.
 * Provides methods for pushing new parameters or replacing the values of existing parameters.
 */
export class QueryStringParameters {
    private paramsAndValues: string[];
  
    /**
     * Initializes a new instance of the QueryStringParameters class.
     */
    constructor() {
      this.paramsAndValues = [];
    }
  
    /**
     * Adds a new parameter with the given key and value, or replaces the value of the existing key if it already exists.
     * @param key - The key of the parameter to add or replace.
     * @param value - The value of the parameter to add or replace.
     */
    public pushOrReplace(key: string, value: Object): void {
      value = encodeURIComponent(value.toString());
  
      // Check if key already exists
      const existingIndex = this.paramsAndValues.findIndex((param) => param.startsWith(`${key}=`));
  
      if (existingIndex >= 0) {
        // Replace the value of the existing parameter
        this.paramsAndValues[existingIndex] = [key, value].join('=');
      } else {
        // Add a new parameter
        this.paramsAndValues.push([key, value].join('='));
      }
    }
  
    /**
     * Returns the query string representation of the parameters in this QueryStringParameters instance.
     * @returns The query string representation of the parameters.
     */
    public toString = (): string => this.paramsAndValues.join('&');
  }
  