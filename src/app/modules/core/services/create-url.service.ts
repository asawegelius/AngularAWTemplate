import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QueryStringParameters } from '../utils/query-string-parameters';
import { UrlBuilder } from '../utils/url-builder';
/**
 * Creates URLs to API endpoints using the base URL you find here {@link environments}, the endpoint you find here {@link Endpoints}
 * and possible parameters
 */
@Injectable({
  providedIn: 'root'
})
export class CreateUrlService {

  constructor() { }

  /**
   * Creates the URL to an API endpoint with no parameters. 
   * @param endpoint The endpoint part of the URL.
   * @param isMockAPI If true, uses the mock base URL. False is default.
   * @returns The URL to the API endpoint.
   */
  public createUrl(endpoint: string, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? environment.mockApiUrl : environment.apiUrl,
      endpoint
    );
    return urlBuilder.toString();
  }

  /**
   * Creates the url to an API endpoint with query parameters.
   * @param endpoint The endpoint part of the URL.
   * @param isMockAPI If true, uses the mock base URL. False is default.
   * @param queryStringHandler 
   * @returns The URL to the API endpoint.
   */
  public createUrlWithQueryParameters(endpoint: string, queryStringHandler?: (queryStringParameters: QueryStringParameters) => void, isMockAPI: boolean = false): string {
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? environment.mockApiUrl : environment.apiUrl,
      endpoint);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  /**
   * Creates the url to an API endpoint with path parameters
   * @param endpoint  The endpoint part of the URL.
   * @param isMockAPI If true, uses the mock base URL. False is default.
   * @param pathVariables An array with the path variables
   * @returns The URL to the API endpoint.
   */
  public createUrlWithPathVariables(endpoint: string, pathVariables: any[] = [], isMockAPI: boolean = false): string {
    let encodedPathVariablesUrl: string = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable.toString())}`;
      }
    }
    const urlBuilder: UrlBuilder = new UrlBuilder(
      isMockAPI ? environment.mockApiUrl : environment.apiUrl,
      `${endpoint}${encodedPathVariablesUrl}`);
    return urlBuilder.toString();
  }
}
