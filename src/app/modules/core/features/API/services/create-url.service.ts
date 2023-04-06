import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UrlBuilder } from '../utils/url-builder';
import { QueryStringParameters } from '../utils/query-string-parameters';

/**
 * A service for creating URLs to API endpoints using the base URL specified in `environment`, 
 * the endpoint name, and any additional parameters.
 */
@Injectable({
  providedIn: 'root'
})
export class CreateUrlService {

  constructor() { }

  /**
   * Creates a URL to an API endpoint with no parameters.
   * 
   * @param {string} endpoint - The endpoint part of the URL.
   * @param {boolean} isMockAPI - If true, uses the mock base URL. False is default.
   * 
   * @returns {string} The URL to the API endpoint.
   */
  public createUrl(endpoint: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? environment.mockApiUrl : environment.apiUrl,
      endpoint
    );
    return urlBuilder.toString();
  }

  /**
   * Creates a URL to an API endpoint with query parameters.
   * 
   * @param {string} endpoint - The endpoint part of the URL.
   * @param {(queryStringParameters: QueryStringParameters) => void} queryStringHandler - A callback function that modifies 
   * the `QueryStringParameters` object before it is added to the URL.
   * @param {boolean} isMockAPI - If true, uses the mock base URL. False is default.
   * 
   * @returns {string} The URL to the API endpoint.
   */
  public createUrlWithQueryParameters(
    endpoint: string, 
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void, 
    isMockAPI: boolean = false
  ): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? environment.mockApiUrl : environment.apiUrl,
      endpoint
    );

    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }

    return urlBuilder.toString();
  }

  /**
   * Creates a URL to an API endpoint with path parameters.
   * 
   * @param {string} endpoint - The endpoint part of the URL.
   * @param {any[]} pathVariables - An array with the path variables.
   * @param {boolean} isMockAPI - If true, uses the mock base URL. False is default.
   * 
   * @returns {string} The URL to the API endpoint.
   */
  public createUrlWithPathVariables(
    endpoint: string, 
    pathVariables: any[] = [], 
    isMockAPI: boolean = false
  ): string {
    let encodedPathVariablesUrl: string = '';

    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }

    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? environment.mockApiUrl : environment.apiUrl,
      `${endpoint}${encodedPathVariablesUrl}`
    );

    return urlBuilder.toString();
  }
}
