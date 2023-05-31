
# AngularAWTemplate

AngularAWTemplate is an Angular application template that provides a starting point for building enterprise-level applications. It is designed to be scalable, maintainable, and flexible, with a focus on best practices and modular architecture.

# Table of Contents
- [AngularAWTemplate](#angularawtemplate)
- [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Technologies](#technologies)
  - [Testing](#testing)
  - [Deployment](#deployment)
  - [Core features](#core-features)
    - [QueryStringParameters](#querystringparameters)
      - [Example usage of QueryStringParameters](#example-usage-of-querystringparameters)
    - [UrlBuilder](#urlbuilder)
      - [Usage of UrlBuilder](#usage-of-urlbuilder)
    - [CreateUrlService](#createurlservice)
      - [Usage of CreateUrlService](#usage-of-createurlservice)
      - [Creating a URL to an API endpoint with no parameters](#creating-a-url-to-an-api-endpoint-with-no-parameters)
      - [Creating a URL to an API endpoint with query parameters](#creating-a-url-to-an-api-endpoint-with-query-parameters)
      - [Creating a URL to an API endpoint with path parameters](#creating-a-url-to-an-api-endpoint-with-path-parameters)
    - [Resource Service](#resource-service)
    - [Using CreateUrlService, and ResourceService to create your api services](#using-createurlservice-and-resourceservice-to-create-your-api-services)
      - [Example usage](#example-usage)
  - [License](#license)


## Installation
To install AngularAWTemplate, follow these steps:

1. Clone this repository to your local machine.
2. Run npm install to install dependencies.
3. Run ng serve to start the application.

## Usage
AngularAWTemplate provides a clean and organized codebase that you can use to build your own Angular applications. It includes a set of reusable components, services, and modules that can be easily customized to fit your needs.

To use AngularAWTemplate, you can start by exploring the codebase and making modifications to fit your specific requirements. You can also build your own components and services on top of the existing codebase, using the provided modules and libraries.

## Technologies
AngularAWTemplate is built with the following technologies:

- Angular
- RxJS
- NgRx
- Bootstrap
- Sass

## Testing
AngularAWTemplate includes a suite of unit tests that can be run with the following command:

- `npm run test` to run unit tests.

## Deployment
To deploy AngularAWTemplate to a production environment, follow these steps:

1. Build the application with ng build.
2. Copy the contents of the dist folder to your web server.
3. Configure your web server to serve the index.html file as the entry point.

## Core features

There are some core features in the core package.
### QueryStringParameters
The *QueryStringParameters* class is used to represent the query string parameters that can be sent in a HTTP GET request to the API endpoint. This class is used in API Services to build the URL for the HTTP request.

#### Example usage of QueryStringParameters
```typescript
import { QueryStringParameters } from './data-service';

    // Create a new instance of the QueryStringParameters class
    const params = new QueryStringParameters();

    // Set the properties of the QueryStringParameters instance
    queryParams.pushOrReplace('searchText', 'example');
    queryParams.pushOrReplace('pageNumber', 1);
    queryParams.pushOrReplace('pageSize', 10);

    // Use the QueryStringParameters instance to build the URL for the HTTP request
    const url = `${'https://example.com/api/search'}?${params.toString()}`;

```
In the example above, we create a new instance of the *QueryStringParameters* class, set its properties to define the search parameters we want to use, and then use it to build the URL for the HTTP request.

### UrlBuilder
The *UrlBuilder* class is a utility class that helps construct URLs for API requests by concatenating base URLs and query string parameters.

#### Usage of UrlBuilder
To use the *UrlBuilder* class, simply create a new instance with the base URL, resource string, and query string parameters and call the *toString()* method:

```typescript
import { UrlBuilder } from 'src/app/modules/core/features/API/classes/url-builder';

const baseUrl = 'https://example.com';
const queryParams = new QueryStringParameters();
queryParams.pushOrReplace('category', 'fiction');

const urlBuilder = new UrlBuilder(baseUrl, 'books', queryParams);
const url = urlBuilder.toString();
console.log(url); // Output: 'http://example.com/books?category=fiction'

```
### CreateUrlService
*CreateUrlService* is an Angular service that allows you to create URLs to API endpoints using the base URL specified in environment, the endpoint name, and any additional parameters. It uses *UrlBuilder* and *QueryStringParameters* to achieve that.

#### Usage of CreateUrlService
To use *CreateUrlService*, you need to import it into your component or service:
```typescript
import { CreateUrlService } from 'src/app/modules/core/features/API/services/create-url.service';

```
Then, you can inject *CreateUrlService* into your component or service's constructor:
```typescript
constructor(private createUrlService: CreateUrlService) { }
```
#### Creating a URL to an API endpoint with no parameters
To create a URL to an API endpoint with no parameters, call the *createUrl* method of *CreateUrlService* and pass the endpoint name as the first argument:
```typescript
const url = this.createUrlService.createUrl('my-endpoint');
```

By default, *createUrl* uses the API URL specified in environment. However, if you want to use the mock API URL specified in environment, you can pass true as the second argument:
```typescript
const url = this.createUrlService.createUrl('my-endpoint', true);
```
#### Creating a URL to an API endpoint with query parameters
To create a URL to an API endpoint with query parameters, call the *createUrlWithQueryParameters* method of *CreateUrlService* and pass the endpoint name as the first argument and a callback function that modifies the *QueryStringParameters* object as the second argument:
```typescript
const url = this.createUrlService.createUrlWithQueryParameters('my-endpoint', (queryStringParameters) => {
  queryStringParameters.pushOrReplace('filter', 'some-filter');
});
```
The callback function receives a *QueryStringParameters* object, which you can use to set query parameters. In the example above, we set the filter query parameter to 'some-filter'.

By default, *createUrlWithQueryParameters* uses the API URL specified in environment. However, if you want to use the mock API URL specified in environment, you can pass true as the third argument:
```typescript
const url = this.createUrlService.createUrlWithQueryParameters('my-endpoint', (queryStringParameters) => {
  queryStringParameters.set('filter', 'some-filter');
}, true);

```
#### Creating a URL to an API endpoint with path parameters
To create a URL to an API endpoint with path parameters, call the *createUrlWithPathVariables* method of *CreateUrlService* and pass the endpoint name as the first argument and an array of path variables as the second argument:
```typescript
const url = this.createUrlService.createUrlWithPathVariables('my-endpoint', [123, 'abc']);

```
The array of path variables is used to replace placeholders in the endpoint name. In the example above, we replace the first placeholder with 123 and the second placeholder with 'abc'.

By default, *createUrlWithPathVariables* uses the API URL specified in environment. However, if you want to use the mock API URL specified in environment, you can pass true as the third argument:
```typescript
const url = this.createUrlService.createUrlWithPathVariables('my-endpoint', [123, 'abc'], true);

```

### Resource Service
The *ResourceService* is a service that provides a generic way to interact with RESTful API endpoints. It uses the Angular HttpClient to make HTTP requests and handles errors automatically.

It has an abstract method *getResourceUrl()*. The API services that extends *ResourceService* overrides this method so it returns the URL to use.

### Using CreateUrlService, and ResourceService<T> to create your api services
To make it easier to call the API endpoints, you can use the *CreateUrlService*, and *ResourceService<T>* classes provided in this template. The *ResourceService<T>* is a reusable Angular service that provides generic CRUD (Create, Read, Update, Delete) operations for API resources. This service is designed to be extended by other services that provide specific functionality for a particular API resource.

To use the *ResourceService<T>*, you need to create a new service that extends it and implements the *getResourceUrl()* method. This method should return the base URL of the API resource that this service will be working with.

#### Example usage
In this example, we will create a service to retrieve a list of products from the API endpoint.

1. First, import the necessary classes and modules:
   ```typescript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { ResourceService } from 'src/app/modules/core/features/API/services/resource.service';
    import { CreateUrlService } from 'src/app/modules/core/features/API/services/create-url.service';
    import { Observable } from 'rxjs';
    import { Product } from './product';
   ```
2. Create a new service and extend the *ResourceService<Product>* class:
   ```typescript
    @Injectable({
    providedIn: 'root'
    })
    export class ProductService extends ResourceService<Product> {
        url!:string;

        constructor(
          http: HttpClient,
          private urls: CreateUrlService) {
            super(http);
            this.setBaseUrl();
        }

        protected getResourceUrl(): string {
            return this.url;
        }

        setBaseUrl() {
            // set base url
            this.url = this.urls?.createUrl('https://example.com/api/products');
        }
    }
   ```
   In this service, we extend the *ResourceService<Product>* class and override the *getResourceUrl()* method to return the URL for the API endpoint. We also inject the *HttpClient* module through the constructor of the *ResourceService<Product>*.
3. Create a method to retrieve a list of products:
   ```typescript
   getProducts(category: string): Observable<Product[]> {
        // Build the URL for the API endpoint
        this.url = this.createUrlService.createUrlWithQueryParameters('products', (queryStringParameters) => {
            queryStringParameters.pushOrReplace('category', category);
        });

        // Call the API endpoint and return the HTTP response
        // getAll will get the url via the method getResourceUrl() that returns this.url
        return this.getAll();
    }
    ```
    In this method, we use the *CreateUrlService* class to build the URL for the API endpoint to set the url, and then call the getAll() method provided by the *ResourceService<Product>* class to retrieve the list of products from the API using the url we set.
4. In the NgRx effect where the API call is made you need to reset the base URL after the call:
   ```typescript

     loadProducts$ = createEffect(() =>
       this.actions$.pipe(
         ofType(loadProducts),
         switchMap((action) =>
           from(this.productsService.getProducts(action.data)).pipe(
             map((data) => loadProductsSuccess({ data })),
             catchError((error) => of(loadProductsFailure({ error }))),
             tap(() =>this.productsService.setBaseUrl())
           )
         )
       ),
     );
   ```


## License
AngularAWTemplate is licensed under the MIT License
