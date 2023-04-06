import { UrlBuilder } from './url-builder';
import { QueryStringParameters } from './query-string-parameters';

describe('UrlBuilder', () => {
    let urlBuilder: UrlBuilder;
    let baseUrl: string;
    let action: string;
    let queryString: QueryStringParameters;

    beforeEach(() => {
        baseUrl = 'http://example.com';
        action = 'test';
        queryString = new QueryStringParameters();
        queryString.pushOrReplace('param1','value1');
        queryString.pushOrReplace('param2','value2');
        urlBuilder = new UrlBuilder(baseUrl, action, queryString);
    });

    it('should build a URL with a query string', () => {
        const expectedUrl = `${baseUrl}/${action}?param1=value1&param2=value2`;
        expect(urlBuilder.toString()).toEqual(expectedUrl);
    });

    it('should build a URL without a query string', () => {
        const urlBuilderWithoutQuery = new UrlBuilder(baseUrl, action);
        const expectedUrl = `${baseUrl}/${action}`;
        expect(urlBuilderWithoutQuery.toString()).toEqual(expectedUrl);
    });

    it('should update the query string', () => {
        const expectedUrl = `${baseUrl}/${action}?param1=newValue&param2=value2`;
        urlBuilder.queryString.pushOrReplace('param1', 'newValue');
        expect(urlBuilder.toString()).toEqual(expectedUrl);
    });
});
