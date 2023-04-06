import { QueryStringParameters } from "./query-string-parameters";
/**
 * A utility class for building URLs with query string parameters for HTTP requests.
 * The toString method is used to return the built URL as a string. It first checks if a query string is present by calling the toString method of the queryString object. 
 * If a query string is present, it concatenates the URL and query string with a question mark. Otherwise, it simply returns the URL.
 * Overall, this class provides a simple way to construct URL strings with query string parameters for HTTP requests in a clean and organized manner.
 */
export class UrlBuilder {
    /**
    * The URL string built by the UrlBuilder.
    */
    public url: string;
    /**
     * The query string parameters object used by the UrlBuilder.
     */
    public queryString: QueryStringParameters;

    /**
    * Creates a new instance of UrlBuilder.
    * @param baseUrl The base URL string used to build the URL.
    * @param resource The resource string used to build the URL.
    * @param queryString An optional QueryStringParameters object containing query string parameters.
    */
    constructor(
        private baseUrl: string,
        private resource: string,
        queryString?: QueryStringParameters
    ) {
        this.url = [this.baseUrl, this.resource].join('/');
        this.queryString = queryString || new QueryStringParameters();
    }

    /**
    * Returns the URL string built by the UrlBuilder, including any query string parameters.
    * @returns The URL string built by the UrlBuilder.
    */
    public toString(): string {
        const qs: string = this.queryString ? this.queryString.toString() : '';
        return qs ? `${this.url}?${qs}` : this.url;
    }
}
